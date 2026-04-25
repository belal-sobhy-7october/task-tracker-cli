import {
  addTask,
  updateTask,
  deleteTask,
  markInProgress,
  markDone,
  listTasks,
} from "./controller.js";
import * as colors from "./colors.js";

/**
 * Formats an ASCII table for displaying tasks.
 * Creates a clean, readable table with proper column alignment.
 *
 * @param {Array} tasks - Array of task objects
 * @returns {string} Formatted table string
 */
function formatTable(tasks) {
  if (tasks.length === 0) {
    return colors.secondary("No tasks found.");
  }

  // Column widths (adjust for content)
  const idWidth = 4;
  const descWidth = 30;
  const statusWidth = 12;
  const updatedWidth = 19;

  // Header
  const header = `${colors.bold("ID")}${" ".repeat(idWidth - 2)} | ${colors.bold("Description")}${" ".repeat(descWidth - 11)} | ${colors.bold("Status")}${" ".repeat(statusWidth - 6)} | ${colors.bold("Updated")}`;
  const separator = "-".repeat(
    idWidth + descWidth + statusWidth + updatedWidth + 8,
  );

  const rows = [header, separator];

  tasks.forEach((task) => {
    const id = String(task.id).padEnd(idWidth);
    const desc = task.description.substring(0, descWidth).padEnd(descWidth);

    // Color status based on value
    let statusStr = task.status;
    if (task.status === "done") {
      statusStr = colors.success(task.status);
    } else if (task.status === "in-progress") {
      statusStr = colors.warning(task.status);
    } else {
      statusStr = colors.info(task.status);
    }
    const status = statusStr.padEnd(statusWidth + 10); // Extra padding for ANSI codes

    const updated = task.updatedAt.substring(0, 19); // ISO date without time zone
    rows.push(`${id} | ${desc} | ${status} | ${updated}`);
  });

  return rows.join("\n");
}

/**
 * Parses CLI arguments and delegates to appropriate controller functions.
 * Handles all user-facing I/O, error handling, and exit codes.
 *
 * @returns {Promise<void>}
 */
async function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  try {
    if (!command) {
      console.log(colors.info("Task Tracker CLI"));
      console.log("\nUsage:");
      console.log("  add <description>          Add a new task");
      console.log("  update <id> <description>  Update task description");
      console.log("  delete <id>                Delete a task");
      console.log("  mark-in-progress <id>      Mark task as in-progress");
      console.log("  mark-done <id>             Mark task as done");
      console.log("  list                       List all tasks");
      console.log(
        "  list <status>              List tasks by status (todo, in-progress, done)",
      );
      process.exit(0);
    }

    switch (command) {
      case "add": {
        const description = args.slice(1).join(" ");
        if (!description) {
          console.error(colors.error("Error: task description is required"));
          process.exit(1);
        }
        const task = await addTask(description);
        console.log(
          colors.success(`✓ Task added successfully (ID: ${task.id})`),
        );
        console.log(colors.secondary(`  "${task.description}"`));
        break;
      }

      case "update": {
        const id = args[1];
        const description = args.slice(2).join(" ");
        if (!id || !description) {
          console.error(
            colors.error("Error: task ID and description are required"),
          );
          process.exit(1);
        }
        const task = await updateTask(id, description);
        console.log(colors.success(`✓ Task ${id} updated successfully`));
        console.log(colors.secondary(`  "${task.description}"`));
        break;
      }

      case "delete": {
        const id = args[1];
        if (!id) {
          console.error(colors.error("Error: task ID is required"));
          process.exit(1);
        }
        const task = await deleteTask(id);
        console.log(colors.success(`✓ Task ${id} deleted successfully`));
        console.log(colors.secondary(`  "${task.description}"`));
        break;
      }

      case "mark-in-progress": {
        const id = args[1];
        if (!id) {
          console.error(colors.error("Error: task ID is required"));
          process.exit(1);
        }
        const task = await markInProgress(id);
        console.log(colors.success(`✓ Task ${id} marked as in-progress`));
        console.log(colors.secondary(`  "${task.description}"`));
        break;
      }

      case "mark-done": {
        const id = args[1];
        if (!id) {
          console.error(colors.error("Error: task ID is required"));
          process.exit(1);
        }
        const task = await markDone(id);
        console.log(colors.success(`✓ Task ${id} marked as done`));
        console.log(colors.secondary(`  "${task.description}"`));
        break;
      }

      case "list": {
        const status = args[1] || null;
        const tasks = await listTasks(status);
        console.log("");
        console.log(formatTable(tasks));
        console.log("");
        break;
      }

      default:
        console.error(colors.error(`Error: unknown command "${command}"`));
        console.error(colors.secondary("Run without arguments for usage info"));
        process.exit(1);
    }

    process.exit(0);
  } catch (err) {
    console.error(colors.error(`Error: ${err.message}`));
    process.exit(1);
  }
}

main();
