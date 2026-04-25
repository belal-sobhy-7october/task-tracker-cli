import { loadTasks, saveTasks } from "./storage.js";

const VALID_STATUSES = ["todo", "in-progress", "done"];

/**
 * Generates a new task ID by finding the maximum existing ID and adding 1.
 * If the array is empty, starts at 1.
 *
 * @param {Array} tasks - Array of existing tasks
 * @returns {number} The new task ID
 */
function generateTaskId(tasks) {
  if (tasks.length === 0) return 1;
  const maxId = Math.max(...tasks.map((task) => task.id));
  return maxId + 1;
}

/**
 * Creates a new task object with current timestamp.
 * Automatically generates createdAt and updatedAt in ISO 8601 format.
 *
 * @param {number} id - Task ID
 * @param {string} description - Task description
 * @param {string} status - Task status (default: 'todo')
 * @returns {Object} Task object
 */
function createTask(id, description, status = "todo") {
  const now = new Date().toISOString();
  return {
    id,
    description,
    status,
    createdAt: now,
    updatedAt: now,
  };
}

/**
 * Validates task description is not empty.
 *
 * @param {string} description - Task description
 * @throws {Error} If description is empty
 */
function validateDescription(description) {
  if (!description || description.trim() === "") {
    throw new Error("Task description cannot be empty");
  }
}

/**
 * Validates task status is one of the accepted values.
 *
 * @param {string} status - Task status
 * @throws {Error} If status is invalid
 */
function validateStatus(status) {
  if (!VALID_STATUSES.includes(status)) {
    throw new Error(
      `Invalid status. Must be one of: ${VALID_STATUSES.join(", ")}`,
    );
  }
}

/**
 * Finds a task by ID.
 *
 * @param {Array} tasks - Array of tasks
 * @param {number} id - Task ID to find
 * @returns {Object|null} Task object or null if not found
 */
function findTaskById(tasks, id) {
  return tasks.find((task) => task.id === parseInt(id, 10)) || null;
}

/**
 * Adds a new task with the given description.
 *
 * @param {string} description - Task description
 * @returns {Promise<Object>} Created task object
 */
export async function addTask(description) {
  validateDescription(description);
  const tasks = await loadTasks();
  const newId = generateTaskId(tasks);
  const newTask = createTask(newId, description);
  tasks.push(newTask);
  await saveTasks(tasks);
  return newTask;
}

/**
 * Updates an existing task's description.
 * Updates the updatedAt timestamp.
 *
 * @param {number} id - Task ID
 * @param {string} description - New description
 * @returns {Promise<Object>} Updated task object
 * @throws {Error} If task not found or description is invalid
 */
export async function updateTask(id, description) {
  validateDescription(description);
  const tasks = await loadTasks();
  const task = findTaskById(tasks, id);

  if (!task) {
    throw new Error(`Task with ID ${id} not found`);
  }

  task.description = description;
  task.updatedAt = new Date().toISOString();

  await saveTasks(tasks);
  return task;
}

/**
 * Deletes a task by ID.
 *
 * @param {number} id - Task ID
 * @returns {Promise<Object>} Deleted task object
 * @throws {Error} If task not found
 */
export async function deleteTask(id) {
  const tasks = await loadTasks();
  const taskIndex = tasks.findIndex((task) => task.id === parseInt(id, 10));

  if (taskIndex === -1) {
    throw new Error(`Task with ID ${id} not found`);
  }

  const [deletedTask] = tasks.splice(taskIndex, 1);
  await saveTasks(tasks);
  return deletedTask;
}

/**
 * Marks a task as "in-progress".
 *
 * @param {number} id - Task ID
 * @returns {Promise<Object>} Updated task object
 * @throws {Error} If task not found
 */
export async function markInProgress(id) {
  const tasks = await loadTasks();
  const task = findTaskById(tasks, id);

  if (!task) {
    throw new Error(`Task with ID ${id} not found`);
  }

  task.status = "in-progress";
  task.updatedAt = new Date().toISOString();

  await saveTasks(tasks);
  return task;
}

/**
 * Marks a task as "done".
 *
 * @param {number} id - Task ID
 * @returns {Promise<Object>} Updated task object
 * @throws {Error} If task not found
 */
export async function markDone(id) {
  const tasks = await loadTasks();
  const task = findTaskById(tasks, id);

  if (!task) {
    throw new Error(`Task with ID ${id} not found`);
  }

  task.status = "done";
  task.updatedAt = new Date().toISOString();

  await saveTasks(tasks);
  return task;
}

/**
 * Lists all tasks or filters by status.
 *
 * @param {string|null} status - Optional status filter ('todo', 'in-progress', 'done')
 * @returns {Promise<Array>} Array of task objects
 * @throws {Error} If invalid status provided
 */
export async function listTasks(status = null) {
  const tasks = await loadTasks();

  if (status) {
    validateStatus(status);
    return tasks.filter((task) => task.status === status);
  }

  return tasks;
}
