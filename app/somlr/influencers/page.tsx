'use client'
import { useState, useMemo } from 'react'
import Link from 'next/link'

type Confidence = 'CONFIRMED' | 'INFERRED' | 'PERSONAL' | 'NOT FOUND'
type Rank = number | '—'

type Influencer = {
  rank: Rank
  name: string
  handle: string
  followers: string
  email: string
  confidence: Confidence
  source: string
}

const INFLUENCERS: Influencer[] = [
  { rank: 9, name: 'Georgia Panagopoulou', handle: '@wine.gini', followers: '129.9K', email: 'winegini@gmail.com', confidence: 'CONFIRMED', source: 'Provided by Christian' },
  { rank: 10, name: 'Lucia Palm-Sommelier', handle: '@lucialoveswine', followers: '123K', email: 'lucialovesfoodla@gmail.com', confidence: 'CONFIRMED', source: 'Provided by Christian' },
  { rank: 11, name: 'Lorena Gutierrez Woods', handle: '@lorenawinediary', followers: '113.5K', email: 'lorena@flavouraffair.com', confidence: 'CONFIRMED', source: 'Provided by Christian' },
  { rank: 13, name: 'Michelle A. Chen', handle: '@legallywined', followers: '105.3K', email: 'michelle@legallywined.com', confidence: 'CONFIRMED', source: 'Provided by Christian' },
  { rank: 16, name: 'Joanie Metivier', handle: '@joaniemetivier', followers: '82.2K', email: 'contact@joaniemetivier.com', confidence: 'CONFIRMED', source: 'Confirmed via joaniemetivier.com media kit' },
  { rank: 17, name: 'Aldo Sohm', handle: '@aldosohm', followers: '81.5K', email: 'office@aldosohm.com', confidence: 'CONFIRMED', source: 'Confirmed on aldosohm.com/pages/contact' },
  { rank: 20, name: 'Cristie Norman', handle: '@cristienorman_somm', followers: '68.1K', email: 'cristie@cristienorman.com', confidence: 'CONFIRMED', source: 'Provided by Christian' },
  { rank: 21, name: 'Laura Villanueva', handle: '@travelandchampagne', followers: '67K', email: 'laura@travelandchampagne.com', confidence: 'CONFIRMED', source: 'Confirmed via travelandchampagne.com' },
  { rank: 22, name: 'Taylor Young', handle: '@thiswaywithtay', followers: '63.9K', email: 'taylor@thiswaywithtay.com', confidence: 'CONFIRMED', source: 'Provided by Christian' },
  { rank: 23, name: 'Jamie Knee', handle: '@petitewinetraveler', followers: '57.5K', email: 'jamieknee@petitewinetraveler.com', confidence: 'CONFIRMED', source: 'Provided by Christian' },
  { rank: 24, name: 'Nicole Muscari', handle: '@grapechic', followers: '55.4K', email: 'grapechicny@gmail.com', confidence: 'CONFIRMED', source: 'Provided by Christian' },
  { rank: 27, name: 'Jessica Altieri', handle: '@winechanneltv', followers: '54.6K', email: 'jess@wctvnetwork.com', confidence: 'CONFIRMED', source: 'Confirmed via web search' },
  { rank: 28, name: 'Lexi Stephens', handle: '@lexiswinelist', followers: '52.7K', email: 'lexi@lexiswinelist.com', confidence: 'CONFIRMED', source: 'Provided by Christian' },
  { rank: 29, name: 'Andrea Silvello', handle: '@topchampagne.it', followers: '50.8K', email: 'andrea.silvello@business-support.it', confidence: 'CONFIRMED', source: 'Confirmed via web search' },
  { rank: 30, name: 'Xingyu Chen', handle: '@winememoir', followers: '47.2K', email: 'winememoir@gmail.com', confidence: 'CONFIRMED', source: 'Provided by Christian' },
  { rank: 31, name: 'Madeline Puckette', handle: '@madelinepuck', followers: '46.6K', email: 'support@winefolly.com', confidence: 'CONFIRMED', source: 'Confirmed: support@winefolly.com' },
  { rank: 32, name: 'Hillary Zio', handle: '@hillaryzio', followers: '40.3K', email: 'hdargenzio@gmail.com', confidence: 'CONFIRMED', source: 'Provided by Christian' },
  { rank: 33, name: 'Paige Comrie', handle: '@winewithpaige', followers: '38.4K', email: 'hello@winewithpaige.com', confidence: 'CONFIRMED', source: 'Found in footer of winewithpaige.com' },
  { rank: 34, name: 'Jon Thorsen', handle: '@reversewinesnob', followers: '37.9K', email: 'jon@reversewinesnob.com', confidence: 'CONFIRMED', source: 'Confirmed on reversewinesnob.com/contact' },
  { rank: 36, name: 'Jeb Dunnuck', handle: '@jebdunnuck', followers: '34.2K', email: 'support@jebdunnuck.com', confidence: 'CONFIRMED', source: 'Confirmed via jebdunnuck.com' },
  { rank: 37, name: 'Lea Gatinois', handle: '@amblewine', followers: '34.2K', email: 'contact@amblewine.com', confidence: 'CONFIRMED', source: 'Confirmed via amblewine.com/pages/contact' },
  { rank: 38, name: 'Hannah', handle: '@winewithhannah', followers: '32.5K', email: 'hannah@winewithhannah.com', confidence: 'CONFIRMED', source: 'Confirmed on winewithhannah.com/contact' },
  { rank: 39, name: 'Mike and Jeff', handle: '@sparklingwinos', followers: '31.6K', email: 'info@sparklingwinos.com', confidence: 'CONFIRMED', source: 'Provided by Christian' },
  { rank: 40, name: 'Ashley Lewis', handle: '@smashleythegrape', followers: '31.3K', email: 'hello@thesocialgrapes.com', confidence: 'CONFIRMED', source: 'Provided by Christian' },
  { rank: 41, name: 'Renee Sferrazza', handle: '@wine.by.renee', followers: '30.9K', email: 'r@reneesferrazza.com', confidence: 'CONFIRMED', source: 'Provided by Christian' },
  { rank: 42, name: 'George Miliotes', handle: '@winebargeorge', followers: '29.7K', email: 'info@winebargeorge.com', confidence: 'CONFIRMED', source: 'Confirmed via web search' },
  { rank: 44, name: 'Elle Rodriguez', handle: '@themodernpour', followers: '28.4K', email: 'themodernpour@gmail.com', confidence: 'CONFIRMED', source: 'Provided by Christian' },
  { rank: 45, name: 'Kristin Wenz', handle: '@kristys_winetravels', followers: '27.9K', email: 'kristy@kristywenz.com', confidence: 'CONFIRMED', source: 'Confirmed on kristywenz.com/contact' },
  { rank: 47, name: 'Alexa Ferra Harvey', handle: '@alexaswinediary', followers: '24.5K', email: 'info@alexaswinediary.com', confidence: 'CONFIRMED', source: 'Confirmed on alexaswinediary.com/about' },
  { rank: 48, name: 'Kathleen Willcox', handle: '@kathleenwillcox', followers: '23.7K', email: 'kathleenwillcox@hotmail.com', confidence: 'CONFIRMED', source: 'Provided by Christian' },
  { rank: 49, name: 'Charlotte Kristensen', handle: '@thelondonwinegirl', followers: '23.2K', email: 'charlotte@thelondonwinegirl.com', confidence: 'CONFIRMED', source: 'Confirmed via thelondonwinegirl.com' },
  { rank: 50, name: 'Katie Perz', handle: '@blushingwino', followers: '22.8K', email: 'blushingwino@gmail.com', confidence: 'CONFIRMED', source: 'Provided by Christian' },
  { rank: 51, name: 'Vivian Rocillo', handle: '@vinfatuation', followers: '22.7K', email: 'vivian@vinfatuation-wines.com', confidence: 'CONFIRMED', source: 'Provided by Christian' },
  { rank: 53, name: 'Nathan & Courtney Marton', handle: '@wineryreflections', followers: '22.5K', email: 'wineryreflections@gmail.com', confidence: 'CONFIRMED', source: 'Provided by Christian' },
  { rank: 54, name: 'Cecily & Natalia', handle: '@youhadmeatbordeaux', followers: '22.2K', email: 'info@wine-sf.com', confidence: 'CONFIRMED', source: 'Provided by Christian' },
  { rank: 55, name: 'Ray Isle', handle: '@rayisle', followers: '21.7K', email: 'ray.isle@foodandwine.com', confidence: 'CONFIRMED', source: 'Confirmed via rayisle.com/contact' },
  { rank: 57, name: 'Melissa & Jeff', handle: '@drinkthebottles', followers: '19.9K', email: 'jeff@drinkthebottles.com', confidence: 'CONFIRMED', source: 'Provided by Christian' },
  { rank: 58, name: 'Mikayla', handle: '@mikayla.winestyle', followers: '19K', email: 'Mikayla@thewinestyle.com', confidence: 'CONFIRMED', source: 'Confirmed on thewinestyle.com/contact' },
  { rank: 59, name: 'Desiree', handle: '@winonoire', followers: '18.7K', email: 'desiree@winonoire.com', confidence: 'CONFIRMED', source: 'Provided by Christian' },
  { rank: 60, name: 'Shakera Jones', handle: '@blackgirlsdinetoo', followers: '18.6K', email: 'Shakera@blackgirlsdinetoo.com', confidence: 'CONFIRMED', source: 'Confirmed on blackgirlsdinetoo.com' },
  { rank: 62, name: 'Lyssa', handle: '@wishesandwine', followers: '16.7K', email: 'wineandwishes18@gmail.com', confidence: 'CONFIRMED', source: 'Provided by Christian' },
  { rank: 64, name: 'Ami Gangemella', handle: '@ami_oncloudwine', followers: '16.2K', email: 'amioncloudwine@gmail.com', confidence: 'CONFIRMED', source: 'Provided by Christian' },
  { rank: 65, name: 'Hannah (Vino for Breakfast)', handle: '@vinoforbreakfast', followers: '16.1K', email: 'vinoforbreakfast@gmail.com', confidence: 'CONFIRMED', source: 'Provided by Christian' },
  { rank: 66, name: 'Justin Ferguson', handle: '@theblacksommrva', followers: '16.1K', email: 'Justin@justin-ferguson.com', confidence: 'CONFIRMED', source: 'Confirmed via justin-ferguson.com' },
  { rank: 67, name: 'Mindy Spencer', handle: '@caliwinegal', followers: '15.8K', email: 'mindy@caliwinegal.co', confidence: 'CONFIRMED', source: 'Provided by Christian' },
  { rank: 68, name: 'Audra Tavelli', handle: '@audratavelli', followers: '13.5K', email: 'audratav@gmail.com', confidence: 'CONFIRMED', source: 'Provided by Christian' },
  { rank: 69, name: 'Paul Laurie', handle: '@essexwineman', followers: '11.8K', email: 'info@theburntchefproject.com', confidence: 'CONFIRMED', source: 'Confirmed on theburntchefproject.com/contact' },
  { rank: 70, name: 'Nikki D.', handle: '@sipwithnik', followers: '11.7K', email: 'sipwithnikki@gmail.com', confidence: 'CONFIRMED', source: 'Provided by Christian' },
  { rank: 71, name: 'Susie Barrie & Peter Richards', handle: '@susieandpeter', followers: '11.6K', email: 'sam@themistressofwine.com', confidence: 'CONFIRMED', source: 'Confirmed on themistressofwine.com footer' },
  { rank: 72, name: 'Noppakit Sangsurane', handle: '@noppakit__101', followers: '11.2K', email: '', confidence: 'NOT FOUND', source: 'No email found publicly' },
  { rank: 73, name: 'Rebecca Rose Phillips', handle: '@letstacoboutwine', followers: '9.8K', email: 'letstacoboutwine@gmail.com', confidence: 'CONFIRMED', source: 'Provided by Christian' },
  { rank: 82, name: 'Alanna & Ray', handle: '@terroir_twosome', followers: '7.4K', email: '', confidence: 'PERSONAL', source: 'Gmail domain — personal email not publicly confirmable' },
  { rank: 84, name: 'Nadia Pugh Mincey', handle: '@nadwines', followers: '6.6K', email: 'nadia@everafterwine.com', confidence: 'INFERRED', source: 'Inferred from everafterwine domain in bio' },
  { rank: 85, name: 'The Drunken Cyclist', handle: '@thedrunkencyclist', followers: '6.6K', email: 'jeff@thedrunkencyclist.com', confidence: 'CONFIRMED', source: 'Confirmed on thedrunkencyclist.com/contact-me' },
  { rank: 95, name: 'Candice Mathis Tseng', handle: '@candicemathist', followers: '158.9K', email: 'Candice@thevinereport.com', confidence: 'CONFIRMED', source: 'Confirmed on collectivelycandice.com/contact' },
  { rank: 96, name: 'Brooke Martin', handle: '@thebrookeblend', followers: '118.4K', email: 'btmartin1012@gmail.com', confidence: 'CONFIRMED', source: 'Provided by Christian' },
  { rank: 98, name: 'Chrishon Lampley', handle: '@lovecorkscrew', followers: '35.4K', email: 'info@lovecorkscrew.com', confidence: 'CONFIRMED', source: 'Provided by Christian' },
  { rank: 99, name: 'Amanda', handle: '@redlips_and_vinosips', followers: '35.1K', email: 'amandacarolk@gmail.com', confidence: 'CONFIRMED', source: 'Provided by Christian' },
  { rank: 0, name: 'Simone Nocera', handle: '@simonenocera', followers: '—', email: 'simonenocera3@gmail.com', confidence: 'CONFIRMED', source: 'Provided by Christian' },
]

const CONFIDENCE_STYLES: Record<Confidence, string> = {
  CONFIRMED: 'bg-green-100 text-green-700',
  INFERRED: 'bg-yellow-100 text-yellow-700',
  PERSONAL: 'bg-gray-100 text-gray-500',
  'NOT FOUND': 'bg-red-100 text-red-500',
}

const CONFIDENCE_FILTERS: (Confidence | 'ALL')[] = ['ALL', 'CONFIRMED', 'INFERRED', 'PERSONAL', 'NOT FOUND']

export default function InfluencersPage() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<Confidence | 'ALL'>('ALL')
  const [expandedRow, setExpandedRow] = useState<Rank | null>(null)

  const filtered = useMemo(() => {
    return INFLUENCERS.filter(inf => {
      const matchesSearch =
        inf.name.toLowerCase().includes(search.toLowerCase()) ||
        inf.handle.toLowerCase().includes(search.toLowerCase()) ||
        inf.email.toLowerCase().includes(search.toLowerCase())
      const matchesFilter = filter === 'ALL' || inf.confidence === filter
      return matchesSearch && matchesFilter
    })
  }, [search, filter])

  const counts = useMemo(() => ({
    CONFIRMED: INFLUENCERS.filter(i => i.confidence === 'CONFIRMED').length,
    INFERRED: INFLUENCERS.filter(i => i.confidence === 'INFERRED').length,
    PERSONAL: INFLUENCERS.filter(i => i.confidence === 'PERSONAL').length,
    'NOT FOUND': INFLUENCERS.filter(i => i.confidence === 'NOT FOUND').length,
  }), [])

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans">
      <header className="bg-white border-b border-gray-200 px-8 py-5">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-1">
              <Link href="/" className="hover:text-gray-600">candressen.com</Link>
              <span>/</span>
              <span className="text-gray-600">Somlr Influencers</span>
            </div>
            <h1 className="text-xl font-bold text-gray-900">🍷 Wine Influencer Outreach</h1>
            <p className="text-sm text-gray-500">Feedspot Top 100 Wine Instagram Influencers — email research Aug 2026</p>
          </div>
        </div>
      </header>

      <main className="max-w-[1200px] mx-auto px-8 py-8 space-y-6">

        {/* Stats — clickable filters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {([
            { label: 'Confirmed', key: 'CONFIRMED' as Confidence, color: 'text-green-600' },
            { label: 'Inferred', key: 'INFERRED' as Confidence, color: 'text-yellow-600' },
            { label: 'Personal', key: 'PERSONAL' as Confidence, color: 'text-gray-500' },
            { label: 'Not Found', key: 'NOT FOUND' as Confidence, color: 'text-red-500' },
          ]).map(s => (
            <button
              key={s.key}
              onClick={() => setFilter(filter === s.key ? 'ALL' : s.key)}
              className={`bg-white rounded-xl border p-4 text-left transition-all cursor-pointer ${filter === s.key ? 'border-gray-400 shadow-md' : 'border-gray-200 hover:shadow-sm'}`}
            >
              <p className="text-xs text-gray-500 mb-1">{s.label}</p>
              <p className={`text-3xl font-bold ${s.color}`}>{counts[s.key]}</p>
            </button>
          ))}
        </div>

        {/* Search + Filter bar */}
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Search name, handle, or email…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="flex-1 bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
          />
          <div className="flex gap-2 flex-wrap">
            {CONFIDENCE_FILTERS.map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`text-xs font-semibold px-3 py-2 rounded-lg transition-colors ${filter === f ? 'bg-gray-900 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-400'}`}
              >
                {f === 'ALL' ? `All (${INFLUENCERS.length})` : f}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 w-12">#</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Name</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Handle</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Followers</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Email</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(inf => (
                  <>
                    <tr
                      key={inf.rank}
                      onClick={() => setExpandedRow(expandedRow === inf.rank ? null : inf.rank)}
                      className="border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      <td className="px-4 py-3 text-gray-400 font-mono text-xs">{inf.rank}</td>
                      <td className="px-4 py-3 font-medium text-gray-900">{inf.name}</td>
                      <td className="px-4 py-3">
                        <a
                          href={`https://instagram.com/${inf.handle.replace('@', '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={e => e.stopPropagation()}
                          className="text-pink-500 hover:underline font-mono text-xs"
                        >
                          {inf.handle}
                        </a>
                      </td>
                      <td className="px-4 py-3 text-gray-600 font-mono text-xs">{inf.followers}</td>
                      <td className="px-4 py-3">
                        {inf.email ? (
                          <a
                            href={`mailto:${inf.email}`}
                            onClick={e => e.stopPropagation()}
                            className="text-blue-600 hover:underline text-xs"
                          >
                            {inf.email}
                          </a>
                        ) : (
                          <span className="text-gray-300 text-xs italic">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${CONFIDENCE_STYLES[inf.confidence]}`}>
                          {inf.confidence}
                        </span>
                      </td>
                    </tr>
                    {expandedRow === inf.rank && (
                      <tr key={`${inf.rank}-detail`} className="bg-blue-50 border-b border-gray-100">
                        <td colSpan={6} className="px-8 py-3 text-xs text-gray-600">
                          <span className="font-semibold">Source: </span>{inf.source}
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-12 text-gray-400 text-sm">No results for &quot;{search}&quot;</div>
          )}
          <div className="px-6 py-3 border-t border-gray-100 text-xs text-gray-400">
            Showing {filtered.length} of {INFLUENCERS.length} influencers · Source: Feedspot Top 100 Wine Instagram · Emails researched Aug 2026
          </div>
        </div>
      </main>
    </div>
  )
}
