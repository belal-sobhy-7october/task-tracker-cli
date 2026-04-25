📋 Commands List

Show help
node app.js
Update task
node app.js update <id> <description>
node app.js update 1 "Buy vegetables and fruits"
Delete task
node app.js delete <id>
node app.js delete 1
Mark task as in progress
node app.js mark-in-progress <id>
node app.js mark-in-progress 2
Mark task as done
node app.js mark-done <id>
node app.js mark-done 3
Show all tasks
node app.js list
Show tasks by status
node app.js list todo          # pending tasks
node app.js list in-progress   # tasks in progress
node app.js list done          # completed tasks

=====================================================================================================================
🧪 Practical Examples

Update task number 2
node app.js update 2 "Learn Node.js and more"
Mark task number 2 as in progress
node app.js mark-in-progress 2
Show all tasks
node app.js list
Show only tasks in progress
node app.js list in-progress
Delete a task
node app.js delete 1
Show completed tasks
node app.js list done