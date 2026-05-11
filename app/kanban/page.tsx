"use client";

import { useMemo, useState } from "react";
import { AGENTS, PROJECTS, TASKS, type Task } from "@/data/index";

const columns = [
  { key: "backlog", label: "Backlog" },
  { key: "todo", label: "To Do" },
  { key: "in_progress", label: "In Progress" },
  { key: "review", label: "Review" },
  { key: "blocked", label: "Blocked" },
  { key: "testing", label: "Testing" },
  { key: "deployment", label: "Deployment" },
  { key: "done", label: "Done" },
] as const;

type ColumnKey = (typeof columns)[number]["key"];

const projectById = new Map(PROJECTS.map((project: any) => [project.id, project]));
const agentByName = new Map(AGENTS.map((agent: any) => [agent.name, agent]));

const priorityStyles: Record<string, string> = {
  urgent: "bg-red-500/20 text-red-400",
  high: "bg-amber-500/20 text-amber-400",
  medium: "bg-blue-500/20 text-blue-400",
  low: "bg-zinc-500/20 text-zinc-400",
};

export default function KanbanPage() {
  const [selectedProjectId, setSelectedProjectId] = useState<string>("all");
  const [activeTeam, setActiveTeam] = useState<"dev" | "marketing">("dev");

  const teamTasks = useMemo(
    () => (TASKS as any[]).filter((task) => task.team === activeTeam),
    [activeTeam],
  );

  const filteredTasks = useMemo(() => {
    if (selectedProjectId === "all") {
      return teamTasks;
    }

    return teamTasks.filter((task) => task.projectId === selectedProjectId);
  }, [selectedProjectId, teamTasks]);

  const tasksByColumn = useMemo(() => {
    return columns.reduce(
      (acc, column) => {
        acc[column.key] = filteredTasks.filter(
          (task) => task.status === column.key,
        );
        return acc;
      },
      {} as Record<ColumnKey, Task[]>,
    );
  }, [filteredTasks]);

  const totalTasks = teamTasks.length;
  const inProgressCount = teamTasks.filter(
    (task) => task.status === "in_progress",
  ).length;
  const doneCount = teamTasks.filter((task) => task.status === "done").length;
  const overallCompletion = totalTasks
    ? Math.round(
        teamTasks.reduce((sum, task) => sum + task.progress, 0) / totalTasks,
      )
    : 0;

  return (
    <main className="min-h-screen p-8 text-white">
      <header className="space-y-6">
        <div className="space-y-2">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setActiveTeam("dev")}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                activeTeam === "dev"
                  ? "bg-[#2563EB] text-white"
                  : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
              }`}
            >
              Dev Sprint
            </button>
            <button
              type="button"
              onClick={() => setActiveTeam("marketing")}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                activeTeam === "marketing"
                  ? "bg-[#2563EB] text-white"
                  : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
              }`}
            >
              Marketing Sprint
            </button>
          </div>
          <h1 className="text-4xl font-semibold">Sprint Board</h1>
          <div className="flex flex-wrap items-center gap-3 text-sm text-white/60">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
              Total tasks: {totalTasks}
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
              In progress: {inProgressCount}
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
              Done: {doneCount}
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
              Completion: {overallCompletion}%
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setSelectedProjectId("all")}
            className={`rounded-full border px-3 py-1 text-sm transition ${
              selectedProjectId === "all"
                ? "border-white/30 bg-white/15 text-white"
                : "border-white/10 bg-white/5 text-white/60 hover:bg-white/10"
            }`}
          >
            All
          </button>
          {PROJECTS.map((project: any) => {
            const active = selectedProjectId === project.id;

            return (
              <button
                key={project.id}
                type="button"
                onClick={() => setSelectedProjectId(project.id)}
                className={`rounded-full border px-3 py-1 text-sm transition ${
                  active
                    ? "border-white/30 bg-white/15 text-white"
                    : "border-white/10 bg-white/5 text-white/60 hover:bg-white/10"
                }`}
                style={{
                  boxShadow: active ? `inset 0 0 0 1px ${project.color}` : undefined,
                }}
              >
                <span
                  className="mr-2 inline-block h-2.5 w-2.5 rounded-full align-middle"
                  style={{ background: project.color }}
                />
                {project.name}
              </button>
            );
          })}
        </div>
      </header>

      <section className="mt-8">
        {teamTasks.length === 0 ? (
          <div className="flex min-h-[60vh] items-center justify-center rounded-3xl border border-white/10 bg-white/[0.02] text-sm text-white/40">
            Sprint board is empty. Add tasks to begin.
          </div>
        ) : (
          <div className="flex flex-row gap-4 overflow-x-auto pb-4">
            {columns.map((column) => {
              const tasks = tasksByColumn[column.key];

              return (
                <section
                  key={column.key}
                  className="flex w-[280px] shrink-0 flex-col rounded-2xl bg-[rgba(255,255,255,0.03)]"
                >
                  <header className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
                    <h2 className="text-sm font-medium text-white/80">
                      {column.label}
                    </h2>
                    <span className="rounded-full bg-white/10 px-2.5 py-1 text-xs font-medium text-white/80">
                      {tasks.length}
                    </span>
                  </header>

                  <div className="flex-1 max-h-[70vh] space-y-3 overflow-y-auto p-3">
                    {tasks.length === 0 ? (
                      <div className="py-8 text-center text-xs text-white/20">
                        No tasks
                      </div>
                    ) : (
                      tasks.map((task: any) => {
                        const project = projectById.get(task.projectId as never);
                        const agent = agentByName.get(task.assignee as never);

                        return (
                          <article
                            key={task.id}
                            className="rounded-xl border border-white/10 bg-[rgba(255,255,255,0.05)] p-4"
                          >
                            <div className="flex items-center justify-between gap-3">
                              <div className="flex min-w-0 items-center gap-2">
                                <span
                                  className="h-2.5 w-2.5 shrink-0 rounded-full"
                                  style={{
                                    background: project?.color ?? "#ffffff",
                                  }}
                                />
                                <span className="truncate text-xs text-white/50">
                                  {project?.name ?? "Unknown Project"}
                                </span>
                              </div>
                              <span
                                className={`rounded-full px-2 py-1 text-[11px] font-medium capitalize ${
                                  priorityStyles[task.priority] ??
                                  "bg-zinc-500/20 text-zinc-400"
                                }`}
                              >
                                {task.priority}
                              </span>
                            </div>

                            <p className="mt-2 text-sm font-semibold text-white">
                              {task.title}
                            </p>

                            <div className="mt-3">
                              <div className="flex items-center justify-between text-xs text-white/40">
                                <span>Progress</span>
                                <span>{task.progress}%</span>
                              </div>
                              <div className="mt-1 h-1.5 w-full rounded-full bg-white/10">
                                <div
                                  className="h-1.5 rounded-full bg-[#5865F2]"
                                  style={{ width: `${task.progress}%` }}
                                />
                              </div>
                            </div>

                            <div className="mt-3 flex items-center justify-between gap-3">
                              <div className="flex min-w-0 items-center gap-2 text-xs text-white/60">
                                <span>{agent?.emoji ?? "👤"}</span>
                                <span className="truncate">{task.assignee}</span>
                              </div>
                              {task.eta ? (
                                <div className="flex items-center gap-1 text-xs text-white/40">
                                  <span>🕒</span>
                                  <span>{task.eta}</span>
                                </div>
                              ) : null}
                            </div>

                            {task.statusNote ? (
                              <p className="mt-2 text-xs italic text-white/40">
                                {task.statusNote}
                              </p>
                            ) : null}
                          </article>
                        );
                      })
                    )}
                  </div>
                </section>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
