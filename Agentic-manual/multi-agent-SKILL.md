---
name: todo-multi-agent-manager
description: Create or revise a multi-agent workflow contract for a ToDo planning app where specialist agents clean raw task input, assign priorities, schedule tasks, review the draft plan, and a coordinator returns the final prioritized task board. Use when Codex needs to define the roles, threads, handoffs, outputs, or success criteria for a multi-agent ToDo workflow.
---

# ToDo Multi-Agent Manager

Use this skill to define or update a multi-agent ToDo planning workflow in `Agentic-manual`.

This workflow contract should describe a team of specialist agents that turn raw task input into a final prioritized task board through visible handoffs.

## Workflow Type

Use a multi-agent workflow.

- Define multiple roles with clear responsibilities.
- Define one named thread per specialist or major handoff.
- Make every handoff visible.
- Ensure only one final coordinator publishes the completed answer.

## Skill Set Name

Use `todo-multi-agent-manager` unless the project requires a different specific name.

## Description

Describe the workflow as a specialist-team ToDo planning process where different agents intake raw tasks, prioritize them, schedule them, review the plan, and coordinate the final output.

## Roles

Recommended roles:

- `Intake Agent`: cleans the raw to-do text and turns it into structured task items
- `Priority Agent`: decides urgency and assigns priority levels
- `Scheduling Agent`: decides whether each task belongs in `today`, `thisWeek`, or `later`
- `Review Agent`: checks the draft plan for conflicts, missing tasks, or weak decisions
- `Coordinator Agent`: merges all handoffs and publishes the final prioritized task board

## Threads

Use these threads:

- `intakeThread`
- `priorityThread`
- `schedulingThread`
- `reviewThread`
- `coordinatorThread`

Each thread should explain:

- the input it receives
- the decision it makes
- the output it creates
- the next agent or thread that receives the handoff

## Inputs

Include:

- raw to-do text from the user
- any due-date hints such as `today`, `tomorrow`, or named weekdays
- any user instructions about urgency, format, or planning focus

## Instructions

Write the workflow as ordered steps. The multi-agent team should:

1. Have the Intake Agent read the raw to-do input and produce a clean task list.
2. Have the Priority Agent assign priority suggestions and reasoning notes.
3. Have the Scheduling Agent assign each task to `today`, `thisWeek`, or `later`.
4. Have the Review Agent compare the priority and scheduling outputs, identify issues, and prepare a reviewed draft board.
5. Have the Coordinator Agent merge the reviewed outputs and publish the final prioritized task board.

## Outputs

The final answer should include:

- a cleaned set of tasks
- visible specialist contributions
- a prioritized task board
- buckets for `today`, `thisWeek`, and `later`
- notes that explain important urgency, scheduling, or review decisions

## Success Criteria

Confirm all of the following:

- Multiple agents are used and each has one clear responsibility.
- Every agent has a matching thread.
- Every thread defines input, decision, output, and next handoff.
- Only the Coordinator Agent publishes the final answer.
- The final answer includes a prioritized task board grouped into `today`, `thisWeek`, and `later`.
- The workflow is easy to compare with the app implementation that uses it.

## Alignment Rule

After editing this skill, update any prompt, backend metadata, or workflow configuration so it uses the same:

- skill name
- role names
- thread names
- handoff fields
- output format

If the implementation and this skill file do not match, the workflow is out of sync.
