# Student Guide: Creating Skill-Based Agentic Workflows

This guide explains how to edit `.github/skills/SKILL.md` and what to do after the skill file has been changed.

A skill file is a reusable workflow contract for an agent. It tells the agent what work it owns, what steps it follows, what threads are used, what handoffs are expected, and what counts as a good result.

## Files Used In This Exercise

Edit this file:

```text
.github/skills/SKILL.md
```

Use this README as the student guide:

```text
.github/skills/README.md
```

This repo also includes a worked single-agent example:

```text
Agentic-manual/SKILL.md
Agentic-manual/singleAgentThread
Agentic-manual/single-agent-workflow.md
```

Do not replace the whole `SKILL.md` file at once. Change one section, check whether the workflow still makes sense, and then make the next change.

## What A Skill File Should Include

A complete skill should define:

- **Skill name**: a short, specific name for the workflow.
- **Description**: what problem the skill solves.
- **Role or roles**: who performs each part of the work.
- **Thread model**: whether the workflow uses one thread or multiple handoff threads.
- **Inputs**: what information the agent receives at the start.
- **Instructions**: the ordered steps the agent or agents must follow.
- **Outputs**: what the final answer must contain.
- **Success criteria**: how students know the workflow was completed correctly.

## How To Make A Skill

1. Open `.github/skills/SKILL.md`.
2. Choose the workflow type: single-agent or multi-agent.
3. Give the skill a clear name.
4. Write a short description of the work.
5. Define the role or roles.
6. Define the thread or threads.
7. Write the workflow instructions as numbered steps.
8. Add success criteria so the result can be checked.
9. Save the file.
10. Use the modified skill instructions in the agent prompt or application workflow.

The important idea is that editing `SKILL.md` changes the workflow design. After editing it, students must connect that design to the agent or app that will use it.

## How To Make Threads

A thread is the visible path of work for an agent or stage.

For a single-agent workflow, use one thread because the same agent owns the full process.

Example:

```md
### Thread

- `singleAgentThread`: receives the input, plans the work, completes the task, reviews the result, and returns the final answer.
```

For a multi-agent workflow, create one thread for each specialist or major handoff.

Example:

```md
### Threads

- `intakeThread`: receives the raw input and turns it into clean task data.
- `analysisThread`: studies the clean data and identifies important decisions.
- `reviewThread`: checks the draft result for missing information or risks.
- `coordinatorThread`: combines all handoffs and returns the final answer.
```

Each thread should explain:

- what input it receives
- what decision it makes
- what output it creates
- which agent or thread receives the next handoff

## Single-Agent Workflow

Use a single-agent workflow when one agent should own the full process from start to finish.

In this pattern:

- one agent performs all stages
- one thread contains the full work history
- there are no specialist handoffs
- the same agent plans, executes, reviews, adjusts, and completes the work

Example structure:

```md
## Single-Agent Workflow

Skill set name: `document-single-agent-summarizer`

### Description

One agent reads a document and produces a clear summary with key points and action items.

### Role

You are the Document Summary Agent. You own the full workflow from input document to final response.

### Thread

- `singleAgentThread`: the complete workflow from reading to final summary.

### Instructions

1. Read the document.
2. Identify the main topic.
3. Extract the most important points.
4. Identify action items or decisions.
5. Review the summary for missing context.
6. Return the final summary.

### Success Criteria

- Only one agent is used.
- Only one thread is used.
- The final answer includes the summary, key points, and action items.
- The response is easy to compare with the original document.
```

## After Modifying `SKILL.md` For A Single Agent

After students modify the single-agent skill, they should:

1. Check that the skill has exactly one role.
2. Check that the skill has exactly one thread.
3. Make sure the instructions describe the full workflow from input to final answer.
4. Make sure the success criteria match the new instructions.
5. Update the agent prompt or backend workflow metadata so it uses the new skill name, role, thread name, and output format.
6. Call the workflow that uses the skill.
7. Review the output and confirm that it follows the single-agent instructions.

If the result does not match the modified `SKILL.md`, the skill file and implementation are out of sync. Update the prompt, workflow handler, backend metadata, or workflow configuration so the application uses the modified skill contract.

## Multi-Agent Workflow

Use a multi-agent workflow when different specialists should own different parts of the work.

In this pattern:

- each agent has a focused responsibility
- each agent has a named thread
- each handoff passes a clear output to the next agent
- one coordinator or final agent publishes the completed result

Example structure:

```md
## Multi-Agent Workflow

Skill set name: `document-multi-agent-summary-team`

### Description

A team of specialist agents reads a document, extracts important information, reviews it, and produces a final summary.

### Roles

- `Intake Agent`: reads the document and identifies the topic.
- `Key Points Agent`: extracts the most important points.
- `Action Items Agent`: finds tasks, owners, dates, and decisions.
- `Review Agent`: checks the draft for missing or unclear information.
- `Coordinator Agent`: combines all handoffs into the final response.

### Threads

- `intakeThread`: document input to topic and context.
- `keyPointsThread`: topic and document to key points.
- `actionItemsThread`: document to action items and decisions.
- `reviewThread`: draft summary to review notes.
- `coordinatorThread`: all handoffs to final response.

### Instructions

1. Intake Agent receives the document and returns the topic and context.
2. Key Points Agent receives the document and topic, then returns key points.
3. Action Items Agent receives the document and returns action items or decisions.
4. Review Agent receives the draft information and returns corrections or warnings.
5. Coordinator Agent receives all handoffs and returns the final summary.

### Success Criteria

- Each specialist has a visible thread.
- Every thread includes input, decision, output, and next handoff.
- The Coordinator Agent is the only agent that publishes the final answer.
- The final answer combines the work from all specialist agents.
```

## After Modifying `SKILL.md` For Multiple Agents

After students modify the multi-agent skill, they should:

1. Check that every role has one clear responsibility.
2. Check that every role has a matching thread.
3. Check that each thread names its input, decision, output, and next handoff.
4. Confirm that only one final agent publishes the completed answer.
5. Update the agent prompt or backend workflow metadata so it uses the new agent names, thread names, handoff fields, and final output format.
6. Make sure the workflow passes each agent output to the next correct agent.
7. Call the workflow that uses the skill.
8. Review the final response and confirm that every specialist contribution appears in the result.

If a new agent is added to `SKILL.md`, a matching thread and handoff must also be added. If an agent is removed, remove or update the thread and handoff that depended on it.

## Skill And Thread Checklist

Before finishing, students should check:

- The skill name is specific and matches the workflow.
- The description explains the goal in one or two sentences.
- Single-agent workflows have one role and one thread.
- Multi-agent workflows have multiple roles and matching threads.
- Every thread has a clear input and output.
- Handoffs are named clearly.
- The final output format is described.
- Success criteria match the actual workflow.
- The application prompt, backend metadata, or workflow configuration has been updated to match `SKILL.md`.

## Common Mistakes

- Changing `SKILL.md` but not updating the prompt or backend workflow that uses it.
- Adding a new agent without adding a matching thread.
- Adding a new thread without explaining its input and output.
- Letting multiple agents publish different final answers.
- Using vague role names such as `Helper Agent` or `Worker Agent`.
- Writing instructions that skip the review step.
- Writing success criteria that no longer match the workflow.

## Final Rule

`SKILL.md` defines the workflow contract. The agent prompt, backend metadata, or workflow configuration must then follow that contract. A modified skill is complete only when the skill file, the thread design, and the actual workflow all describe the same process.
