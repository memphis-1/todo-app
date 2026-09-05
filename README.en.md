# Todo List

A simple todo list web page built with plain HTML, CSS, and JavaScript. You can add tasks, mark them as complete, and delete them. Data is stored in the browser.

[中文说明](README.md)

## Features

- Type a task and click **Add** (or press Enter) to create it
- Check the box on the left to mark a task as complete (strikethrough)
- Click **×** on the right to delete a task
- The header shows how many tasks remain and the total count
- An empty-state message appears when there are no tasks
- Tasks are saved to `localStorage`, so they remain after a refresh

## How to use

Open `index.html` in a browser. No install or server is required.

Tasks can be up to 120 characters. Empty input is ignored.

Data is stored in this browser’s local storage (key: `todo-app-tasks`). Switching browsers, clearing site data, or using a private window may remove the list.

## Project structure

```
todo-app/
├── index.html    # Page structure
├── style.css     # Styles
├── script.js     # Interaction logic
├── README.md     # Chinese readme
└── README.en.md  # English readme
```

## Technical notes

This is a static front-end page with no framework or build step. Form submit, checkbox change, and delete clicks update the list. The UI is rendered from the tasks saved in local storage.
