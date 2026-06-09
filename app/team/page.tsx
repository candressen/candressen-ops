import { AGENTS } from "@/data/index";

const statusStyles = {
  online: "bg-emerald-500",
  busy: "bg-amber-500",
  idle: "bg-zinc-500",
} as const;

export default function TeamPage() {
  const devAgents = AGENTS.filter((agent) => agent.team === "dev");
  const marketingAgents = AGENTS.filter((agent) => agent.team === "marketing");
  const specialistAgents = AGENTS.filter((agent) => agent.team === "specialist");
  const councilAgents = AGENTS.filter((agent) => agent.team === "council");
  const polAgents = AGENTS.filter((agent) => agent.team === "pol");

  return (
    <div className="p-8 text-white">
      <h1 className="mb-6 text-4xl font-semibold">Team</h1>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Dev Team</h2>
        <div className="grid grid-cols-3 gap-4">
          {devAgents.map((agent) => (
            <article
              key={agent.id}
              className="rounded-xl border border-white/10 p-5"
              style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{agent.emoji}</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-lg font-semibold">{agent.name}</h2>
                      <span
                        className={`h-2.5 w-2.5 rounded-full ${statusStyles[agent.status]}`}
                      />
                    </div>
                    <p className="mt-1 text-sm text-white/60">{agent.role}</p>
                  </div>
                </div>
              </div>

              <span className="mt-2 inline-block rounded-full bg-white/10 px-2 py-0.5 text-xs">
                {agent.model}
              </span>
              <p className="mt-3 text-sm italic text-white/50">
                {agent.currentTask}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-10 space-y-4">
        <h2 className="text-2xl font-semibold">Marketing Team</h2>
        <div className="grid grid-cols-3 gap-4">
          {marketingAgents.map((agent) => (
            <article
              key={agent.id}
              className="rounded-xl border border-white/10 p-5"
              style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{agent.emoji}</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-lg font-semibold">{agent.name}</h2>
                      <span
                        className={`h-2.5 w-2.5 rounded-full ${statusStyles[agent.status]}`}
                      />
                    </div>
                    <p className="mt-1 text-sm text-white/60">{agent.role}</p>
                  </div>
                </div>
              </div>

              <span className="mt-2 inline-block rounded-full bg-white/10 px-2 py-0.5 text-xs">
                {agent.model}
              </span>
              <p className="mt-3 text-sm italic text-white/50">
                {agent.currentTask}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Specialist Agents</h2>
        <div className="grid grid-cols-3 gap-4">
          {specialistAgents.map((agent) => (
            <article
              key={agent.id}
              className="rounded-xl border border-white/10 p-5"
              style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{agent.emoji}</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-lg font-semibold">{agent.name}</h2>
                      <span
                        className={`h-2.5 w-2.5 rounded-full ${statusStyles[agent.status]}`}
                      />
                    </div>
                    <p className="mt-1 text-sm text-white/60">{agent.role}</p>
                  </div>
                </div>
              </div>

              <span className="mt-2 inline-block rounded-full bg-white/10 px-2 py-0.5 text-xs">
                {agent.model}
              </span>
              <p className="mt-3 text-sm italic text-white/50">
                {agent.currentTask}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-8 space-y-4">
        <h2 className="text-2xl font-semibold">R&D Council</h2>
        <div className="grid grid-cols-3 gap-4">
          {councilAgents.map((agent) => (
            <article
              key={agent.id}
              className="rounded-xl border border-white/10 p-5"
              style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{agent.emoji}</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-lg font-semibold">{agent.name}</h2>
                      <span
                        className={`h-2.5 w-2.5 rounded-full ${statusStyles[agent.status]}`}
                      />
                    </div>
                    <p className="mt-1 text-sm text-white/60">{agent.role}</p>
                  </div>
                </div>
              </div>

              <span className="mt-2 inline-block rounded-full bg-white/10 px-2 py-0.5 text-xs">
                {agent.model}
              </span>
              <p className="mt-3 text-sm italic text-white/50">
                {agent.currentTask}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Pol's Team</h2>
        <div className="grid grid-cols-3 gap-4">
          {polAgents.map((agent) => (
            <article
              key={agent.id}
              className="rounded-xl border border-white/10 p-5"
              style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{agent.emoji}</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-lg font-semibold">{agent.name}</h2>
                      <span
                        className={`h-2.5 w-2.5 rounded-full ${statusStyles[agent.status]}`}
                      />
                    </div>
                    <p className="mt-1 text-sm text-white/60">{agent.role}</p>
                  </div>
                </div>
              </div>

              <span className="mt-2 inline-block rounded-full bg-white/10 px-2 py-0.5 text-xs">
                {agent.model}
              </span>
              <p className="mt-3 text-sm italic text-white/50">
                {agent.currentTask}
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
