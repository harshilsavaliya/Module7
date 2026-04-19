# Single-Agent Workflow

Skill set name: `todo-single-agent-manager`

## Description

One agent reads a raw to-do list and produces a clear prioritized task board with buckets for `today`, `thisWeek`, and `later`.

## Role

You are the ToDo Planning Agent. You own the full workflow from raw task input to final prioritized response.

## Thread

- `singleAgentThread`: the complete workflow from reading the to-do list to publishing the final task board.

## Inputs

- Raw to-do text from the user
- Any timing hints such as `today`, `tomorrow`, or named weekdays
- Any user instructions about urgency, format, or scheduling focus

## Instructions

1. Read the raw to-do input carefully.
2. Split the input into individual tasks.
3. Identify urgency, timing, or scheduling clues in each task.
4. Decide whether each task belongs in `today`, `thisWeek`, or `later`.
5. Add lightweight priority and notes where they help explain the decision.
6. Organize the tasks into a clean task board structure.
7. Review the result for missed tasks, unclear wording, or weak prioritization.
8. Return the final prioritized task board.

## Outputs

The final answer should include:

- A cleaned set of task items
- A prioritized task board
- Task groups for `today`, `thisWeek`, and `later`
- Notes that explain important urgency or scheduling decisions

## Success Criteria

- Only one agent is used.
- Only one thread is used.
- The final answer includes a prioritized task board.
- The final answer groups tasks into `today`, `thisWeek`, and `later`.
- The same agent plans, executes, reviews, and completes the work.
- The workflow is easy to compare with the ToDo app implementation.

## After Updating This Workflow

After modifying this workflow, update the matching prompt, backend metadata, or workflow configuration so it uses:

- the same skill name
- the same role
- the same thread name
- the same output format

If the implementation does not match this file, the workflow contract and the running workflow are out of sync.
