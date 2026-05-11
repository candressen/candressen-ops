import { TOKEN_DATA } from '@/data/index'

const sortedTokenData = [...TOKEN_DATA].sort(
  (a, b) => b.dailyTokens - a.dailyTokens,
)

const totalTokensToday = TOKEN_DATA.reduce(
  (sum, entry) => sum + entry.dailyTokens,
  0,
)

const totalCostToday = TOKEN_DATA.reduce(
  (sum, entry) => sum + entry.dailyCost,
  0,
)

const averageCacheHit =
  TOKEN_DATA.reduce((sum, entry) => sum + entry.cacheHitRate, 0) /
  TOKEN_DATA.length

function getCacheHitColor(cacheHitRate: number) {
  const percentage = cacheHitRate * 100
  if (percentage >= 80) return 'text-emerald-400'
  if (percentage >= 60) return 'text-amber-400'
  return 'text-red-400'
}

export default function TokensPage() {
  return (
    <div className="p-8 text-white">
      <h1 className="mb-6 text-4xl font-semibold">Token Tracker</h1>

      <div className="mb-8 grid grid-cols-3 gap-4">
        <div
          className="rounded-xl border border-white/10 p-4"
          style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
        >
          <div className="text-xs text-white/40">Total tokens today</div>
          <div className="text-2xl font-bold">
            {totalTokensToday.toLocaleString()}
          </div>
        </div>
        <div
          className="rounded-xl border border-white/10 p-4"
          style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
        >
          <div className="text-xs text-white/40">Total cost today</div>
          <div className="text-2xl font-bold">${totalCostToday.toFixed(2)}</div>
        </div>
        <div
          className="rounded-xl border border-white/10 p-4"
          style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
        >
          <div className="text-xs text-white/40">Avg cache hit</div>
          <div className="text-2xl font-bold">
            {(averageCacheHit * 100).toFixed(0)}%
          </div>
        </div>
      </div>

      <table className="w-full border-collapse mt-6">
        <thead>
          <tr className="border-b border-white/10">
            <th className="pb-3 text-left text-xs uppercase tracking-wider text-white/40">
              Agent
            </th>
            <th className="pb-3 text-left text-xs uppercase tracking-wider text-white/40">
              Model
            </th>
            <th className="pb-3 text-left text-xs uppercase tracking-wider text-white/40">
              Daily Tokens
            </th>
            <th className="pb-3 text-left text-xs uppercase tracking-wider text-white/40">
              Daily Cost
            </th>
            <th className="pb-3 text-left text-xs uppercase tracking-wider text-white/40">
              Cache Hit Rate
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedTokenData.map((entry) => (
            <tr key={entry.agent} className="border-b border-white/5">
              <td className="py-4 font-medium">{entry.agent}</td>
              <td className="py-4 text-sm text-white/60">{entry.model}</td>
              <td className="py-4">{entry.dailyTokens.toLocaleString()}</td>
              <td className="py-4">${entry.dailyCost.toFixed(2)}</td>
              <td className={`py-4 ${getCacheHitColor(entry.cacheHitRate)}`}>
                {(entry.cacheHitRate * 100).toFixed(0)}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
