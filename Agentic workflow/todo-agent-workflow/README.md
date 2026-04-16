# To-Do Agentic Workflow Demo

This demo shows agentic workflows with a small to-do planner. 

Students can compare:

- **Single-agent workflow**: one agent reads, plans, executes, reviews, adjusts, and completes the task plan in one continuous thread.
- **Multi-agent workflow**: specialized agents create separate handoff threads, then a coordinator merges the work.

## Structure

- `backend/` - Express API with simulated workflow endpoints.
- `frontend/` - Vite + React app with `/single-agent` and `/multi-agent` routes.

## Running The Demo

1. Backend
   ```powershell
   cd "Agentic workflow/todo-agent-workflow/backend"
   npm install
   npm run start
   ```
   The API listens on `http://localhost:4010`.

2. Frontend
   ```powershell
   cd "Agentic workflow/todo-agent-workflow/frontend"
   npm install
   npm run dev
   ```
   Open `http://localhost:5174/single-agent` or `http://localhost:5174/multi-agent`.

## Instructor Script

1. Start at `/single-agent`.
2. Paste or load the sample to-do list.
3. Run the workflow and point out the single `singleAgentThread`.
4. Move to `/multi-agent`.
5. Run the same input and compare the separate agent lanes.
6. Open `.github/skills/SKILL.md` and show how changing agent roles, scoring rules, thread names, or review criteria changes what programmers should implement in the workflow metadata.

## API

- `POST /api/single-agent/todos`
- `POST /api/multi-agent/todos`

Both endpoints accept:

```json
{
  "text": "Prepare slides tomorrow\nEmail mentor\nBuy snacks"
}
```

Both endpoints return workflow stages, thread records, and a final task board grouped into `today`, `thisWeek`, and `later`.
