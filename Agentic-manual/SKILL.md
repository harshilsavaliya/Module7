---
name: todo-single-agent-manager
description: Create or revise a single-agent workflow contract for a ToDo planning app where one agent reads raw task input, organizes tasks, reviews the plan, and returns a final prioritized task board. Use when Codex needs to define the role, single thread, workflow steps, outputs, or success criteria for a single-agent ToDo workflow.
---

# ToDo Single-Agent Manager

Use this skill to define or update a single-agent ToDo planning workflow in `Agentic-manual`.

This workflow contract should describe one agent that owns the complete process from raw task input to final prioritized output.

## Workflow Type

Use a single-agent workflow.

- Define exactly one role.
- Define exactly one thread.
- Do not add specialist handoffs.
- Ensure the same agent plans, executes, reviews, adjusts, and publishes the final answer.

## Skill Set Name

Use `todo-single-agent-manager` unless the project requires a different specific name.

## Description

Describe the workflow as a ToDo planning process where one agent reads raw tasks and turns them into a clear prioritized plan.

## Role

Use one role with full ownership of the workflow.

Recommended role:

- `ToDo Planning Agent`: owns the complete workflow from raw task input to final prioritized task board.

## Thread

Use one thread named `singleAgentThread`.

The thread should explain:

- the raw input it receives
- how the agent interprets and organizes the tasks
- how the agent reviews the result
- that there is no next handoff because the same agent returns the final answer

## Inputs

Include:

- raw to-do text from the user
- any due-date hints such as `today`, `tomorrow`, or named weekdays
- any user instructions about urgency, format, or focus

## Instructions

Write the workflow as ordered steps. The single agent should:

1. Read the raw to-do input carefully.
2. Identify each individual task.
3. Interpret urgency or timing clues in the task text.
4. Assign each task to a planning bucket such as `today`, `thisWeek`, or `later`.
5. Add simple prioritization and notes when useful.
6. Review the organized plan for missing tasks, unclear wording, or weak categorization.
7. Return the final prioritized task board.

## Outputs

The final answer should include:

- a cleaned list of tasks
- a prioritized task board
- buckets for `today`, `thisWeek`, and `later`
- any useful notes that explain urgency or scheduling decisions

## Success Criteria

Confirm all of the following:

- Only one agent is used.
- Only one thread is used.
- The final answer includes a prioritized task board.
- The final answer groups tasks into `today`, `thisWeek`, and `later`.
- The same agent performs planning, execution, review, and completion.
- The workflow is easy to compare with the app implementation that uses it.

## Alignment Rule

After editing this skill, update any prompt, backend metadata, or workflow configuration so it uses the same:

- skill name
- role name
- thread name
- output format

If the implementation and this skill file do not match, the workflow is out of sync.
