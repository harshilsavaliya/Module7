import React, { startTransition, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const SAMPLE_TODOS = `Submit project update today
Email mentor about review notes
Prepare slides for Friday demo
Buy snacks for study group
Read agentic workflow chapter
Plan something for later`;

const DAY_KEYWORDS = ["monday", "tuesday", "wednesday", "thursday", "friday"];
const TODAY_KEYWORDS = ["today", "asap", "urgent", "now"];
const WEEK_KEYWORDS = ["tomorrow", "this week", "soon"];
const LATER_KEYWORDS = ["later", "someday", "next month"];

const MODES = {
  single: {
    title: "Single-Agent ToDo Planner",
    subtitle:
      "One planning agent reads raw tasks, interprets urgency, reviews the list, and publishes a clean task board.",
    contract: "singleAgentThread",
    agentLabel: "ToDo Planning Agent",
    runLabel: "Run single-agent workflow"
  },
  multi: {
    title: "Multi-Agent ToDo Planner",
    subtitle:
      "Specialist agents intake the list, assign priority, schedule work, review conflicts, and a coordinator publishes the final board.",
    contract: "multiAgentThread",
    agentLabel: "Specialist team",
    runLabel: "Run multi-agent workflow"
  }
};

function App() {
  const [mode, setMode] = useState("single");
  const [text, setText] = useState(SAMPLE_TODOS);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [isRunning, setIsRunning] = useState(false);

  function runWorkflow(event) {
    event.preventDefault();

    if (!text.trim()) {
      setError("Add at least one task before running the planner.");
      return;
    }

    setError("");
    setIsRunning(true);

    startTransition(() => {
      setResult(mode === "single" ? buildSingleWorkflow(text) : buildMultiWorkflow(text));
      setIsRunning(false);
    });
  }

  const summary = useMemo(() => summarizeBoard(result?.board), [result]);
  const config = MODES[mode];

  return (
    <main className="app-shell">
      <section className="hero">
        <div className="hero-copy">
          <p className="kicker">Agentic Manual</p>
          <h1>{config.title}</h1>
          <p className="lead">{config.subtitle}</p>
        </div>
        <div className="hero-card">
          <p className="eyebrow">Workflow Contract</p>
          <h2>{config.contract}</h2>
          <p>{mode === "single" ? "Input, plan, organize, review, return final board." : "Specialist handoffs, reviewed merge, coordinator final board."}</p>
        </div>
      </section>

      <section className="workspace">
        <form className="panel composer" onSubmit={runWorkflow}>
          <div className="panel-top">
            <div>
              <p className="eyebrow">Raw Input</p>
              <h2>ToDo list</h2>
            </div>
            <button className="ghost" type="button" onClick={() => setText(SAMPLE_TODOS)}>
              Load sample
            </button>
          </div>

          <div className="mode-switch" aria-label="Workflow mode">
            <button
              className={mode === "single" ? "mode-pill active" : "mode-pill"}
              type="button"
              onClick={() => {
                setMode("single");
                setResult(null);
              }}
            >
              Single agent
            </button>
            <button
              className={mode === "multi" ? "mode-pill active" : "mode-pill"}
              type="button"
              onClick={() => {
                setMode("multi");
                setResult(null);
              }}
            >
              Multi thread
            </button>
          </div>

          <textarea
            aria-label="Raw to-do text"
            rows={14}
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder="Enter one task per line"
          />

          {error ? <p className="error">{error}</p> : null}

          <button className="primary" type="submit" disabled={isRunning}>
            {isRunning ? "Planning..." : config.runLabel}
          </button>
        </form>

        <section className="results">
          <article className="panel thread-panel">
            <div className="panel-top">
              <div>
                <p className="eyebrow">{mode === "single" ? "Thread" : "Threads"}</p>
                <h2>{config.contract}</h2>
              </div>
              <span className="agent-chip">{config.agentLabel}</span>
            </div>

            {result ? (
              <div className={mode === "multi" ? "thread-grid" : "stage-list"}>
                {mode === "single" ? (
                  result.threads.map((thread) => <ThreadCard key={thread.id} thread={thread} />)
                ) : (
                  result.threads.map((thread) => <ThreadCard key={thread.id} thread={thread} compact />)
                )}
              </div>
            ) : (
              <p className="empty">
                Run the workflow to reveal how {mode === "single" ? "the single agent" : "the specialist threads"} process the task list.
              </p>
            )}
          </article>

          <article className="panel summary-panel">
            <p className="eyebrow">Review</p>
            <h2>Board summary</h2>
            <p className="summary-copy">
              {result
                ? `${summary.total} tasks organized with ${summary.today} for today, ${summary.thisWeek} for this week, and ${summary.later} for later.`
                : "The review step will summarize the board after the workflow runs."}
            </p>
            <div className="summary-grid">
              <SummaryBox label="Today" value={summary.today} accent="warm" />
              <SummaryBox label="This Week" value={summary.thisWeek} accent="cool" />
              <SummaryBox label="Later" value={summary.later} accent="calm" />
            </div>
          </article>
        </section>
      </section>

      <section className="board">
        <div className="board-head">
          <p className="eyebrow">Final Output</p>
          <h2>Prioritized task board</h2>
        </div>
        <div className="lane-grid">
          <Lane title="Today" items={result?.board.today || []} tone="warm" />
          <Lane title="This Week" items={result?.board.thisWeek || []} tone="cool" />
          <Lane title="Later" items={result?.board.later || []} tone="calm" />
        </div>
      </section>
    </main>
  );
}

function ThreadCard({ thread, compact = false }) {
  return (
    <article className={compact ? "thread-card compact" : "thread-card"}>
      <div className="thread-top">
        <span className="thread-agent">{thread.agent}</span>
        <h3>{thread.title}</h3>
      </div>
      <div className="stage-list">
        {thread.stages.map((stage) => (
          <article className="stage-card" key={stage.id}>
            <div className="stage-head">
              <span className={`badge ${stage.status}`}>{stage.status}</span>
              <h4>{stage.title}</h4>
            </div>
            <p>{stage.message}</p>
            <dl>
              <Meta label="Input" value={stage.details.input} />
              <Meta label="Decision" value={stage.details.decision} />
              <Meta label={stage.details.handoff ? "Handoff" : "Output"} value={stage.details.handoff || stage.details.output} />
            </dl>
          </article>
        ))}
      </div>
    </article>
  );
}

function Meta({ label, value }) {
  return (
    <div>
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}

function SummaryBox({ label, value, accent }) {
  return (
    <article className={`summary-box ${accent}`}>
      <span>{label}</span>
      <strong>{value}</strong>
    </article>
  );
}

function Lane({ title, items, tone }) {
  return (
    <article className={`lane ${tone}`}>
      <div className="lane-head">
        <h3>{title}</h3>
        <span>{items.length} tasks</span>
      </div>
      {items.length ? (
        <ul>
          {items.map((task) => (
            <li key={task.id}>
              <strong>{task.title}</strong>
              <span>Priority {task.priority}</span>
              {task.notes ? <p>{task.notes}</p> : null}
            </li>
          ))}
        </ul>
      ) : (
        <p className="empty">No tasks in this lane yet.</p>
      )}
    </article>
  );
}

function buildSingleWorkflow(text) {
  const tasks = parseTasks(text);
  const board = groupBoard(tasks);

  return {
    threads: [
      {
        id: "singleAgentThread",
        title: "singleAgentThread",
        agent: "ToDo Planning Agent",
        stages: [
          {
            id: "read-input",
            title: "Read Raw Input",
            status: "done",
            message: "The agent collected each line and treated it as an individual planning candidate.",
            details: {
              input: `${tasks.length} raw task lines`,
              decision: "Keep one task per line and remove blank entries.",
              output: `${tasks.length} clean task items`
            }
          },
          {
            id: "interpret-urgency",
            title: "Interpret Timing Signals",
            status: "done",
            message: "The agent scanned each task for urgency words, weekday hints, and later-language.",
            details: {
              input: "Clean task items",
              decision: "Use keyword-based urgency rules to detect timing intent.",
              output: describeCounts(board)
            }
          },
          {
            id: "build-board",
            title: "Build Prioritized Board",
            status: "done",
            message: "The agent assigned every task to a single lane and added compact notes to explain the choice.",
            details: {
              input: "Classified tasks with urgency hints",
              decision: "Map tasks to today, thisWeek, or later with simple priorities.",
              output: "Final board with priorities and notes"
            }
          },
          {
            id: "review-plan",
            title: "Review Final Plan",
            status: "done",
            message: "The agent reviewed the board for missing tasks and made sure every item landed in exactly one lane.",
            details: {
              input: "Draft task board",
              decision: "Check lane coverage, task clarity, and note usefulness.",
              output: "Validated single-agent final response"
            }
          }
        ]
      }
    ],
    board
  };
}

function buildMultiWorkflow(text) {
  const intakeTasks = parseTasks(text);
  const priorityTasks = intakeTasks.map((task) => ({
    ...task,
    priorityReason: task.priority === 1 ? "Immediate timing or urgency language." : task.priority === 2 ? "Short-range planning signal." : "Deferred or low-pressure work."
  }));
  const scheduledTasks = priorityTasks.map((task) => ({
    ...task,
    scheduleReason:
      task.bucket === "today"
        ? "Placed in today because the task reads as immediate."
        : task.bucket === "thisWeek"
          ? "Placed in this week because the task has a near-term cue."
          : "Placed in later because the task appears deferrable."
  }));
  const board = groupBoard(scheduledTasks);

  return {
    threads: [
      {
        id: "intakeThread",
        title: "intakeThread",
        agent: "Intake Agent",
        stages: [
          {
            id: "intake-clean",
            title: "Normalize Raw Tasks",
            status: "done",
            message: "The intake agent cleaned the raw text and turned each line into one structured task item.",
            details: {
              input: `${intakeTasks.length} raw task lines`,
              decision: "Drop blank lines and preserve each task as one planning unit.",
              handoff: `${intakeTasks.length} clean tasks sent to priorityThread and schedulingThread`
            }
          }
        ]
      },
      {
        id: "priorityThread",
        title: "priorityThread",
        agent: "Priority Agent",
        stages: [
          {
            id: "priority-score",
            title: "Assign Priority",
            status: "done",
            message: "The priority agent scored each task based on urgency language and implied time pressure.",
            details: {
              input: "Clean tasks from intakeThread",
              decision: "Assign P1, P2, or P3 using urgency clues and due-date language.",
              handoff: "Priority suggestions sent to reviewThread"
            }
          }
        ]
      },
      {
        id: "schedulingThread",
        title: "schedulingThread",
        agent: "Scheduling Agent",
        stages: [
          {
            id: "schedule-lanes",
            title: "Assign Time Buckets",
            status: "done",
            message: "The scheduling agent placed each task into today, thisWeek, or later.",
            details: {
              input: "Clean tasks from intakeThread",
              decision: "Use weekday and urgency hints to choose a single bucket.",
              handoff: "Scheduling suggestions sent to reviewThread"
            }
          }
        ]
      },
      {
        id: "reviewThread",
        title: "reviewThread",
        agent: "Review Agent",
        stages: [
          {
            id: "review-merge",
            title: "Check Draft Board",
            status: "done",
            message: "The review agent compared the priority and scheduling outputs and checked for conflicts or missing tasks.",
            details: {
              input: "Priority and scheduling handoffs",
              decision: "Confirm every task has one priority and one lane with usable notes.",
              handoff: "Reviewed draft board sent to coordinatorThread"
            }
          }
        ]
      },
      {
        id: "coordinatorThread",
        title: "coordinatorThread",
        agent: "Coordinator Agent",
        stages: [
          {
            id: "coordinator-publish",
            title: "Publish Final Board",
            status: "done",
            message: "The coordinator merged the reviewed outputs and published the final prioritized task board.",
            details: {
              input: "Reviewed draft board from reviewThread",
              decision: "Resolve remaining inconsistencies and finalize grouped output.",
              output: describeCounts(board)
            }
          }
        ]
      }
    ],
    board
  };
}

function parseTasks(text) {
  return text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((title, index) => classifyTask(title, index));
}

function groupBoard(tasks) {
  return {
    today: tasks.filter((task) => task.bucket === "today"),
    thisWeek: tasks.filter((task) => task.bucket === "thisWeek"),
    later: tasks.filter((task) => task.bucket === "later")
  };
}

function classifyTask(title, index) {
  const lower = title.toLowerCase();
  let bucket = "thisWeek";
  let priority = 2;
  let notes = "Scheduled as a near-term task.";

  if (matchesAny(lower, TODAY_KEYWORDS)) {
    bucket = "today";
    priority = 1;
    notes = "Contains immediate timing language.";
  } else if (matchesAny(lower, DAY_KEYWORDS) || matchesAny(lower, WEEK_KEYWORDS)) {
    bucket = "thisWeek";
    priority = 2;
    notes = "Includes a short-range scheduling hint.";
  } else if (matchesAny(lower, LATER_KEYWORDS)) {
    bucket = "later";
    priority = 3;
    notes = "Marked as lower urgency or intentionally deferred.";
  } else if (lower.startsWith("read") || lower.startsWith("plan")) {
    bucket = "later";
    priority = 3;
    notes = "Looks like background or exploratory work.";
  }

  return {
    id: `task-${index + 1}`,
    title,
    bucket,
    priority,
    notes
  };
}

function matchesAny(text, keywords) {
  return keywords.some((keyword) => text.includes(keyword));
}

function describeCounts(board) {
  return `Today: ${board.today.length}, This Week: ${board.thisWeek.length}, Later: ${board.later.length}`;
}

function summarizeBoard(board) {
  if (!board) {
    return { total: 0, today: 0, thisWeek: 0, later: 0 };
  }

  return {
    total: board.today.length + board.thisWeek.length + board.later.length,
    today: board.today.length,
    thisWeek: board.thisWeek.length,
    later: board.later.length
  };
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
