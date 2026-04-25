import { readFile, writeFile } from "fs/promises";
import { resolve } from "path";

const TASKS_FILE = resolve(process.cwd(), "tasks.json");

/**
 * Loads tasks from the JSON file.
 * Returns an empty array if the file doesn't exist.
 * Gracefully handles ENOENT errors so the app doesn't crash on first run.
 *
 * @returns {Promise<Array>} Array of task objects
 */
export async function loadTasks() {
  try {
    const data = await readFile(TASKS_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    if (error.code === "ENOENT") {
      return [];
    }
    throw error;
  }
}

/**
 * Saves tasks to the JSON file.
 * Writes formatted JSON for readability.
 *
 * @param {Array} tasks - Array of task objects to persist
 * @returns {Promise<void>}
 */
export async function saveTasks(tasks) {
  await writeFile(TASKS_FILE, JSON.stringify(tasks, null, 2), "utf-8");
}
