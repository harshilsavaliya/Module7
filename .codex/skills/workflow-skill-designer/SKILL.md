---
name: workflow-skill-designer
description: Create or revise a skill-based agentic workflow contract for student exercises about single-agent and multi-agent workflows. Use when Codex needs to define or update the skill name, description, roles, thread model, instructions, outputs, handoffs, success criteria, or the follow-up alignment work needed in prompts, backend metadata, or workflow configuration.
---

# Workflow Skill Designer

Use this skill to write or update a workflow contract for an agentic workflow exercise.

`SKILL.md` is the workflow contract. It should clearly define who does the work, how work moves through the workflow, and what a correct result must include.

## Read First

- Read the project guidance in `.github/skills/README.md` before editing workflow-contract files in this repo.
- Use `Agentic-manual/SKILL.md` and the related manual workflow files as reference examples when the repo needs a worked single-agent pattern.
- Edit section by section rather than replacing the whole file blindly. Keep the workflow internally consistent after each change.

## Required Contents

Make sure the finished skill defines all of the following:

- Skill name
- Short description of the problem the workflow solves
- Role or roles
- Thread model
- Inputs
- Ordered instructions
- Outputs
- Success criteria

If the workflow is multi-agent, also define the handoffs between threads.

## Single-Agent Workflow

Use this pattern when one agent owns the full process from input to final answer.

### Structure

- Define exactly one role.
- Define exactly one thread.
- Write instructions that cover planning, execution, review, and final response.
- Make the final output easy to compare to the original input or task.

### What To Include

- A short skill name
- A clear description of the workflow goal
- One role with full ownership
- One thread that carries the entire workflow
- Ordered instructions from intake to final output
- Success criteria that confirm one agent and one thread handled the work

### Thread Rule

Treat the single thread as the complete visible path of work. It should show what input starts the task, what the agent does with it, how the result is reviewed, and what final output is returned.

## Multi-Agent Workflow

Use this pattern when different specialists should own different parts of the work.

### Structure

- Give each agent one focused responsibility.
- Create one named thread per specialist or major handoff.
- Define each handoff clearly.
- Ensure only one final coordinator or publishing agent returns the completed answer.

### What To Include

- A short skill name
- A clear description of the workflow goal
- Multiple roles with distinct responsibilities
- Matching threads for each specialist or major handoff
- Ordered instructions that show work moving from one role to the next
- Success criteria that confirm the final answer combines all specialist contributions

### Thread Rule

For each thread, describe:

- input received
- decision made
- output produced
- next agent or thread that receives the handoff

Each thread should make the handoff path easy to follow from intake through final publication.

## Writing Instructions

When you write or revise the workflow:

1. Open the target `SKILL.md`.
2. Decide whether the workflow is single-agent or multi-agent.
3. Give the skill a short, specific name.
4. Write a brief description of the work the workflow performs.
5. Define the role or roles in clear, non-generic terms.
6. Define the thread or threads with explicit ownership.
7. Write numbered workflow steps in execution order.
8. Describe the final output format.
9. Add success criteria that can be checked against the workflow.
10. Save the file and verify the contract is internally consistent.

Prefer concrete role names such as `Intake Agent` or `Coordinator Agent` over vague names such as `Helper Agent`.

## Thread Design Rules

Treat a thread as the visible path of work for one agent or one stage.

For every thread, explain:

- what starts the thread
- what information it receives
- what work or decision happens there
- what artifact or structured output it produces
- where that output goes next

Use one thread for a single-agent workflow. Use multiple named threads for multi-agent workflows with specialist handoffs.

## Output Expectations

The completed workflow contract should make it obvious:

- who publishes the final answer
- what intermediate handoffs exist
- what the final response must contain
- how a student can tell whether the workflow was executed correctly

## After Editing The Skill

After changing a workflow contract, align the implementation that uses it.

Check the matching prompt, backend workflow metadata, or workflow configuration and update them so they use the same:

- skill name
- role names
- thread names
- handoff fields
- final output shape

If the workflow contract changes but the implementation does not, the contract and the running system are out of sync.

## Validation Checklist

Before considering the skill complete, confirm:

- The skill name is specific and matches the workflow.
- The description explains the goal clearly.
- A single-agent workflow has one role and one thread.
- A multi-agent workflow has multiple roles and matching threads.
- Every thread has a clear input and output.
- Handoffs are explicitly named when multiple agents are involved.
- The final output format is described.
- Success criteria match the written instructions.
- The prompt, backend metadata, or workflow configuration has been updated to match the new contract.

## Common Failure Modes

Watch for these problems while editing:

- changing the workflow contract without updating the workflow implementation
- adding a new agent without adding a matching thread
- adding a thread without defining its input or output
- allowing multiple agents to publish different final answers
- using vague role names
- skipping review or validation steps
- leaving success criteria inconsistent with the actual workflow

## Project References

Read these files when you need the repo's example material:

- `.github/skills/README.md`
- `Agentic-manual/singleAgentThread`
- `Agentic-manual/single-agent-workflow.md`

## Final Rule

Treat the workflow skill file as the authoritative contract. A change is only complete when the skill file, thread design, and implementation all describe the same process.
