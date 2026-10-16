/**
 * Reading every file from a dropped folder (spec §11.4: "The player drops in a music
 * folder"). Browsers hand over a dropped folder as an entry to walk through, a batch of
 * files at a time, so this gathers them all, folders inside folders included.
 */

function readBatch(reader: FileSystemDirectoryReader): Promise<FileSystemEntry[]> {
  return new Promise((resolve, reject) => reader.readEntries(resolve, reject))
}

function fileOf(entry: FileSystemFileEntry): Promise<File> {
  return new Promise((resolve, reject) => entry.file(resolve, reject))
}

async function walk(entry: FileSystemEntry, into: File[]): Promise<void> {
  if (entry.isFile) {
    into.push(await fileOf(entry as FileSystemFileEntry))
    return
  }
  if (!entry.isDirectory) return
  const reader = (entry as FileSystemDirectoryEntry).createReader()
  // A folder is read in batches, until an empty one.
  for (let batch = await readBatch(reader); batch.length > 0; batch = await readBatch(reader)) {
    for (const child of batch) await walk(child, into)
  }
}

/** Every file in what was dropped: loose files, and everything inside dropped folders. */
export async function filesFromDrop(data: DataTransfer): Promise<File[]> {
  const entries = [...data.items].map((item) => item.webkitGetAsEntry?.()).filter((entry): entry is FileSystemEntry => !!entry)
  if (entries.length === 0) return [...data.files]
  const files: File[] = []
  for (const entry of entries) await walk(entry, files)
  return files
}
