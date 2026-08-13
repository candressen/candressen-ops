'use client'
import { useState, useMemo } from 'react'
import Link from 'next/link'

type Confidence = 'CONFIRMED' | 'INFERRED' | 'PERSONAL' | 'NOT FOUND'

type Influencer = {
  rank: number
  name: string
  handle: string
  followers: string
  email: string
  confidence: Confidence
  source: string
}

const INFLUENCERS: Influencer[] = [
  { rank: 2, name: 'Maxi Riedel', handle: '@maxiriedel', followers: '644.8K', email: 'maxi@riedel.com', confidence: 'INFERRED', source: 'Riedel.com family domain; inferred from first-name@domain pattern' },
  { rank: 3, name: 'James Suckling', handle: '@james.suckling', followers: '467.8K', email: 'samples@jamessuckling.com', confidence: 'CONFIRMED', source: 'Confirmed on jamessuckling.com/faqs-2' },
  { rank: 4, name: 'Samantha Capaldi', handle: '@samanthasommelier', followers: '338.1K', email: 'samantha@samanthasommelier.com', confidence: 'INFERRED', source: 'Contact form only; inferred from domain pattern' },
  { rank: 5, name: 'Francesco Saverio Russo', handle: '@italianwinelover', followers: '193.1K', email: '', confidence: 'PERSONAL', source: 'Gmail domain — personal email not publicly confirmable' },
  { rank: 6, name: 'Helen McGinn', handle: '@knackeredmother', followers: '144.6K', email: 'helen@dopaminestudios.co.uk', confidence: 'INFERRED', source: 'Dopamine Studios is her talent management; inferred from agency domain' },
  { rank: 7, name: 'Jancis Robinson', handle: '@jancisrobinson', followers: '140.8K', email: 'contact@jancisrobinson.com', confidence: 'INFERRED', source: 'Site blocked by Cloudflare; standard contact@ inferred from domain' },
  { rank: 8, name: 'Warner Boin', handle: '@confidenceuncorked', followers: '134.4K', email: '', confidence: 'NOT FOUND', source: 'Contact form but no public email listed' },
  { rank: 9, name: 'Georgia Panagopoulou', handle: '@wine.gini', followers: '129.9K', email: '', confidence: 'PERSONAL', source: 'Gmail domain — personal email not publicly confirmable' },
  { rank: 10, name: 'Lucia Palm-Sommelier', handle: '@lucialoveswine', followers: '123K', email: '', confidence: 'PERSONAL', source: 'Gmail domain — personal email not publicly confirmable' },
  { rank: 11, name: 'Lorena Gutierrez Woods', handle: '@lorenawinediary', followers: '113.5K', email: 'lorena@flavouraffair.com', confidence: 'INFERRED', source: 'flavouraffair.com coming-soon; inferred from domain pattern' },
  { rank: 12, name: 'Laura Catena', handle: '@lauracatenamd', followers: '106.7K', email: 'press@catenazapata.com', confidence: 'INFERRED', source: 'catenazapata.com tour inquiry form only; press contact inferred' },
  { rank: 13, name: 'Michelle A. Chen', handle: '@legallywined', followers: '105.3K', email: 'michelle@legallywined.com', confidence: 'INFERRED', source: 'About page but no email shown; inferred from domain pattern' },
  { rank: 14, name: 'Goswijn Simons', handle: '@thestoryofmywine', followers: '94.3K', email: 'info@gosidesign.nl', confidence: 'INFERRED', source: 'gosidesign.nl is his web design firm; inferred info@ contact' },
  { rank: 15, name: 'Pascaline Lepeltier', handle: '@pascalinelepeltier', followers: '85.2K', email: 'pascaline@pascalinelepeltier.com', confidence: 'INFERRED', source: 'Contact form only; inferred from domain' },
  { rank: 16, name: 'Joanie Metivier', handle: '@joaniemetivier', followers: '82.2K', email: 'contact@joaniemetivier.com', confidence: 'CONFIRMED', source: 'Confirmed via joaniemetivier.com media kit' },
  { rank: 17, name: 'Aldo Sohm', handle: '@aldosohm', followers: '81.5K', email: 'office@aldosohm.com', confidence: 'CONFIRMED', source: 'Confirmed on aldosohm.com/pages/contact' },
  { rank: 18, name: 'Giulia Sattin', handle: '@giulia_sattin', followers: '79.4K', email: '', confidence: 'PERSONAL', source: 'Gmail domain — personal email not publicly confirmable' },
  { rank: 19, name: 'Gwilherm de Cerval', handle: '@gwilherm_de_cerval', followers: '73.2K', email: '', confidence: 'NOT FOUND', source: 'No website or email domain provided' },
  { rank: 20, name: 'Cristie Norman', handle: '@cristienorman_somm', followers: '68.1K', email: '', confidence: 'PERSONAL', source: 'att.net is a personal ISP email — not publicly confirmable' },
  { rank: 21, name: 'Laura Villanueva', handle: '@travelandchampagne', followers: '67K', email: 'laura@travelandchampagne.com', confidence: 'CONFIRMED', source: 'Confirmed via travelandchampagne.com' },
  { rank: 22, name: 'Taylor Young', handle: '@thiswaywithtay', followers: '63.9K', email: 'taylor@thiswaywithtay.com', confidence: 'INFERRED', source: 'Website DNS error; inferred from domain pattern' },
  { rank: 23, name: 'Jamie Knee', handle: '@petitewinetraveler', followers: '57.5K', email: '', confidence: 'PERSONAL', source: 'bellsouth.net is a personal ISP email — not publicly confirmable' },
  { rank: 24, name: 'Nicole Muscari', handle: '@grapechic', followers: '55.4K', email: '', confidence: 'PERSONAL', source: 'Gmail domain — personal email not publicly confirmable' },
  { rank: 25, name: 'The Wine Guys', handle: '@thewineguys', followers: '55.4K', email: '', confidence: 'NOT FOUND', source: 'thewineguys.us redirects to Instagram; no public email' },
  { rank: 26, name: 'Laura Donadoni', handle: '@theitalianwinegirl', followers: '54.8K', email: '', confidence: 'PERSONAL', source: 'Gmail domain — personal email not publicly confirmable' },
  { rank: 27, name: 'Jessica Altieri', handle: '@winechanneltv', followers: '54.6K', email: 'jess@wctvnetwork.com', confidence: 'CONFIRMED', source: 'Confirmed via web search: jess@wctvnetwork.com' },
  { rank: 28, name: 'Lexi Stephens', handle: '@lexiswinelist', followers: '52.7K', email: '', confidence: 'PERSONAL', source: 'Gmail domain — personal email not publicly confirmable' },
  { rank: 29, name: 'Andrea Silvello', handle: '@topchampagne.it', followers: '50.8K', email: 'andrea.silvello@business-support.it', confidence: 'CONFIRMED', source: 'Confirmed via web search (also info@topchampagne.it)' },
  { rank: 30, name: 'Xingyu Chen', handle: '@winememoir', followers: '47.2K', email: 'xingyu@wine-memoir.com', confidence: 'INFERRED', source: 'Contact page has no email; inferred from domain' },
  { rank: 31, name: 'Madeline Puckette', handle: '@madelinepuck', followers: '46.6K', email: 'support@winefolly.com', confidence: 'CONFIRMED', source: 'Confirmed: support@winefolly.com (Wine Folly public contact)' },
  { rank: 32, name: 'Hillary Zio', handle: '@hillaryzio', followers: '40.3K', email: '', confidence: 'PERSONAL', source: 'Gmail domain — personal email not publicly confirmable' },
  { rank: 33, name: 'Paige Comrie', handle: '@winewithpaige', followers: '38.4K', email: 'hello@winewithpaige.com', confidence: 'CONFIRMED', source: 'Found in footer of winewithpaige.com' },
  { rank: 34, name: 'Jon Thorsen', handle: '@reversewinesnob', followers: '37.9K', email: 'jon@reversewinesnob.com', confidence: 'CONFIRMED', source: 'Confirmed on reversewinesnob.com/contact' },
  { rank: 35, name: 'Rupal Shankar', handle: '@syrah_queen', followers: '35.4K', email: 'rupal@syrahqueen.com', confidence: 'INFERRED', source: 'syrahqueen.com has no contact page; inferred from domain' },
  { rank: 36, name: 'Jeb Dunnuck', handle: '@jebdunnuck', followers: '34.2K', email: 'support@jebdunnuck.com', confidence: 'CONFIRMED', source: 'Confirmed via jebdunnuck.com' },
  { rank: 37, name: 'Lea Gatinois', handle: '@amblewine', followers: '34.2K', email: 'contact@amblewine.com', confidence: 'CONFIRMED', source: 'Confirmed via amblewine.com/pages/contact' },
  { rank: 38, name: 'Hannah', handle: '@winewithhannah', followers: '32.5K', email: 'hannah@winewithhannah.com', confidence: 'CONFIRMED', source: 'Confirmed on winewithhannah.com/contact' },
  { rank: 39, name: 'Mike and Jeff', handle: '@sparklingwinos', followers: '31.6K', email: '', confidence: 'NOT FOUND', source: 'sparklingwinos.com contact form only; no public email' },
  { rank: 40, name: 'Ashley Lewis', handle: '@smashleythegrape', followers: '31.3K', email: '', confidence: 'PERSONAL', source: 'Gmail domain — personal email not publicly confirmable' },
  { rank: 41, name: 'Renee Sferrazza', handle: '@wine.by.renee', followers: '30.9K', email: 'renee@reneesferrazza.com', confidence: 'INFERRED', source: 'Contact form only; inferred from domain pattern' },
  { rank: 42, name: 'George Miliotes', handle: '@winebargeorge', followers: '29.7K', email: 'info@winebargeorge.com', confidence: 'CONFIRMED', source: 'Confirmed via web search: info@winebargeorge.com' },
  { rank: 43, name: 'Patricia Davidson', handle: '@patriciahdavidson', followers: '29.1K', email: 'patricia@thesiteguide.com', confidence: 'INFERRED', source: 'thesiteguide.com DNS not resolving; inferred from domain' },
  { rank: 44, name: 'Elle Rodriguez', handle: '@themodernpour', followers: '28.4K', email: '', confidence: 'PERSONAL', source: 'Gmail domain — personal email not publicly confirmable' },
  { rank: 45, name: 'Kristin Wenz', handle: '@kristys_winetravels', followers: '27.9K', email: 'kristy@kristywenz.com', confidence: 'CONFIRMED', source: 'Confirmed on kristywenz.com/contact' },
  { rank: 46, name: 'Lukasz Jan Kolodziejczyk', handle: '@ljk.wine', followers: '27.1K', email: 'lukasz@h2vin.co.uk', confidence: 'INFERRED', source: 'h2vin.co.uk acquired by Alliance Wine; inferred personal contact' },
  { rank: 47, name: 'Alexa Ferra Harvey', handle: '@alexaswinediary', followers: '24.5K', email: 'info@alexaswinediary.com', confidence: 'CONFIRMED', source: 'Confirmed on alexaswinediary.com/about' },
  { rank: 48, name: 'Kathleen Willcox', handle: '@kathleenwillcox', followers: '23.7K', email: '', confidence: 'PERSONAL', source: 'Hotmail domain — personal email not publicly confirmable' },
  { rank: 49, name: 'Charlotte Kristensen', handle: '@thelondonwinegirl', followers: '23.2K', email: 'charlotte@thelondonwinegirl.com', confidence: 'CONFIRMED', source: 'Confirmed via thelondonwinegirl.com' },
  { rank: 50, name: 'Katie Perz', handle: '@blushingwino', followers: '22.8K', email: '', confidence: 'PERSONAL', source: 'Gmail domain — personal email not publicly confirmable' },
  { rank: 51, name: 'Vivian Rocillo', handle: '@vinfatuation', followers: '22.7K', email: 'vivian@vinfatuation-wines.com', confidence: 'INFERRED', source: 'vinfatuation-wines.com not loading; inferred from domain' },
  { rank: 52, name: 'Odedi', handle: '@odedis.wine.reviews', followers: '22.6K', email: '', confidence: 'PERSONAL', source: 'Hotmail domain — personal email not publicly confirmable' },
  { rank: 53, name: 'Nathan & Courtney Marton', handle: '@wineryreflections', followers: '22.5K', email: '', confidence: 'PERSONAL', source: 'Gmail domain — personal email not publicly confirmable' },
  { rank: 54, name: 'Cecily & Natalia', handle: '@youhadmeatbordeaux', followers: '22.2K', email: 'info@wine-sf.com', confidence: 'INFERRED', source: 'wine-sf.com 404 on contact; inferred info@ from domain' },
  { rank: 55, name: 'Ray Isle', handle: '@rayisle', followers: '21.7K', email: 'ray.isle@foodandwine.com', confidence: 'CONFIRMED', source: 'Confirmed via rayisle.com/contact' },
  { rank: 56, name: 'Joey Casco', handle: '@thewinestalker', followers: '20.5K', email: '', confidence: 'PERSONAL', source: 'Gmail domain — personal email not publicly confirmable' },
  { rank: 57, name: 'Melissa & Jeff', handle: '@drinkthebottles', followers: '19.9K', email: 'hello@drinkthebottles.com', confidence: 'INFERRED', source: 'Blogger-based site; no contact page; inferred from domain' },
  { rank: 58, name: 'Mikayla', handle: '@mikayla.winestyle', followers: '19K', email: 'Mikayla@thewinestyle.com', confidence: 'CONFIRMED', source: 'Confirmed on thewinestyle.com/contact' },
  { rank: 59, name: 'Desiree', handle: '@winonoire', followers: '18.7K', email: 'desiree@winonoire.com', confidence: 'INFERRED', source: 'winonoire.com redirects; contact page not accessible; inferred' },
  { rank: 60, name: 'Shakera Jones', handle: '@blackgirlsdinetoo', followers: '18.6K', email: 'Shakera@blackgirlsdinetoo.com', confidence: 'CONFIRMED', source: 'Confirmed on blackgirlsdinetoo.com/the-ruse' },
  { rank: 61, name: 'Kendeigh Worden', handle: '@thegrapegrind', followers: '17.1K', email: 'kendeigh@thegrapegrind.com', confidence: 'INFERRED', source: 'Newsletter/community form only; inferred from domain' },
  { rank: 62, name: 'Lyssa', handle: '@wishesandwine', followers: '16.7K', email: '', confidence: 'PERSONAL', source: 'Gmail domain — personal email not publicly confirmable' },
  { rank: 63, name: 'Elizabeth Schneider', handle: '@winefornormalpeople', followers: '16.3K', email: 'elizabeth@winefornormalpeople.com', confidence: 'INFERRED', source: 'Contact form only; inferred from domain' },
  { rank: 64, name: 'Ami Gangemella', handle: '@ami_oncloudwine', followers: '16.2K', email: 'ami@amioncloudwine.com', confidence: 'INFERRED', source: 'Site under construction; inferred from domain' },
  { rank: 65, name: 'Hannah (Vino for Breakfast)', handle: '@vinoforbreakfast', followers: '16.1K', email: '', confidence: 'PERSONAL', source: 'Gmail domain — personal email not publicly confirmable' },
  { rank: 66, name: 'Justin Ferguson', handle: '@theblacksommrva', followers: '16.1K', email: 'Justin@justin-ferguson.com', confidence: 'CONFIRMED', source: 'Confirmed via justin-ferguson.com' },
  { rank: 67, name: 'Mindy Spencer', handle: '@caliwinegal', followers: '15.8K', email: 'mindy@caliwinegal.co', confidence: 'INFERRED', source: 'No contact email shown; inferred from domain' },
  { rank: 68, name: 'Audra Tavelli', handle: '@audratavelli', followers: '13.5K', email: '', confidence: 'PERSONAL', source: 'Gmail domain — personal email not publicly confirmable' },
  { rank: 69, name: 'Paul Laurie', handle: '@essexwineman', followers: '11.8K', email: 'info@theburntchefproject.com', confidence: 'CONFIRMED', source: 'Confirmed on theburntchefproject.com/contact (PR via Burnt Chef Project)' },
  { rank: 70, name: 'Nikki D.', handle: '@sipwithnik', followers: '11.7K', email: '', confidence: 'PERSONAL', source: 'Gmail domain — personal email not publicly confirmable' },
  { rank: 71, name: 'Susie Barrie & Peter Richards', handle: '@susieandpeter', followers: '11.6K', email: 'sam@themistressofwine.com', confidence: 'CONFIRMED', source: 'Confirmed on themistressofwine.com footer' },
  { rank: 72, name: 'Noppakit Sangsurane', handle: '@noppakit__101', followers: '11.2K', email: '', confidence: 'NOT FOUND', source: 'No website or email domain provided' },
  { rank: 73, name: 'Rebecca Rose Phillips', handle: '@letstacoboutwine', followers: '9.8K', email: '', confidence: 'PERSONAL', source: 'Gmail domain — personal email not publicly confirmable' },
  { rank: 74, name: 'Emmanuel Delmas', handle: '@emmanueldelmas_sommelier', followers: '9.7K', email: '', confidence: 'PERSONAL', source: 'Gmail domain — personal email not publicly confirmable' },
  { rank: 75, name: 'Randy Smith', handle: '@thewinewrite', followers: '9.6K', email: 'randy@thewinewrite.com', confidence: 'INFERRED', source: 'Minimal site, no contact page; inferred from domain' },
  { rank: 76, name: 'Grace', handle: '@graceetvin', followers: '9.1K', email: '', confidence: 'NOT FOUND', source: 'No email domain or website provided' },
  { rank: 77, name: 'Yves Beck', handle: '@beckustator', followers: '8.9K', email: '', confidence: 'NOT FOUND', source: 'No email domain or website provided' },
  { rank: 78, name: 'Leslee Miller', handle: '@sipbetter', followers: '8.6K', email: 'leslee@sipbetter.com', confidence: 'INFERRED', source: 'Contact form only; inferred from domain' },
  { rank: 79, name: 'Marilena Barbera', handle: '@marilenabarbera', followers: '8.4K', email: 'marilena@cantinebarbera.it', confidence: 'INFERRED', source: 'cantinebarbera.it winery contact form; inferred personal email' },
  { rank: 80, name: 'Avonlea', handle: '@whimsicalwinewoman', followers: '8.2K', email: '', confidence: 'PERSONAL', source: 'Gmail domain — personal email not publicly confirmable' },
  { rank: 81, name: 'Charlie Gilmore', handle: '@wine.tasting.notes', followers: '7.5K', email: '', confidence: 'NOT FOUND', source: 'No email domain or website provided' },
  { rank: 82, name: 'Alanna & Ray', handle: '@terroir_twosome', followers: '7.4K', email: '', confidence: 'PERSONAL', source: 'Gmail domain — personal email not publicly confirmable' },
  { rank: 83, name: 'Andre Silva', handle: '@awineteller', followers: '6.7K', email: '', confidence: 'PERSONAL', source: 'Gmail domain — personal email not publicly confirmable' },
  { rank: 84, name: 'Nadia Pugh Mincey', handle: '@nadwines', followers: '6.6K', email: 'nadia@everafterwine.com', confidence: 'INFERRED', source: 'Inferred from everafterwine domain mentioned in bio' },
  { rank: 85, name: 'The Drunken Cyclist', handle: '@thedrunkencyclist', followers: '6.6K', email: 'jeff@thedrunkencyclist.com', confidence: 'CONFIRMED', source: 'Confirmed on thedrunkencyclist.com/contact-me' },
  { rank: 86, name: 'Brianne Cohen', handle: '@sommspirations', followers: '6.1K', email: 'brianne@briannecohen.com', confidence: 'INFERRED', source: 'Newsletter signup only; inferred from domain' },
  { rank: 87, name: 'WineWalkabout', handle: '@winewalkabout', followers: '5.5K', email: '', confidence: 'PERSONAL', source: 'Gmail domain — personal email not publicly confirmable' },
  { rank: 88, name: 'Kristin', handle: '@run.wine.eat.repeat', followers: '5.2K', email: '', confidence: 'PERSONAL', source: 'Gmail domain — personal email not publicly confirmable' },
  { rank: 89, name: 'Meg Maker', handle: '@megmaker', followers: '5.1K', email: 'meg@megmaker.com', confidence: 'INFERRED', source: 'Contact page present but no email shown; inferred from domain' },
  { rank: 90, name: 'Deborah Parker Wong', handle: '@deborahparkerwong', followers: '4.4K', email: '', confidence: 'PERSONAL', source: 'Gmail domain — personal email not publicly confirmable' },
  { rank: 91, name: 'Kristin & Steph', handle: '@sommelier_sisters', followers: '4.2K', email: '', confidence: 'NOT FOUND', source: 'No email domain or website provided' },
  { rank: 92, name: 'Vashti Roebuck', handle: '@princessislandvashti', followers: '3.7K', email: '', confidence: 'PERSONAL', source: 'Hotmail domain — personal email not publicly confirmable' },
  { rank: 93, name: 'Mel Eitel', handle: '@ibringthewine', followers: '3.1K', email: '', confidence: 'NOT FOUND', source: 'No email domain or website provided' },
  { rank: 94, name: 'Larissa C. Dubose', handle: '@mrs.lotusnvines', followers: '1.5K', email: 'larissa@larissacdubose.com', confidence: 'INFERRED', source: 'Inferred from larissacdubose name reference' },
  { rank: 95, name: 'Candice Mathis Tseng', handle: '@candicemathist', followers: '158.9K', email: 'Candice@thevinereport.com', confidence: 'CONFIRMED', source: 'Confirmed on collectivelycandice.com/contact' },
  { rank: 96, name: 'Brooke Martin', handle: '@thebrookeblend', followers: '118.4K', email: '', confidence: 'PERSONAL', source: 'Gmail domain — personal email not publicly confirmable' },
  { rank: 97, name: 'John M. Jackson', handle: '@attorneysomm', followers: '40.6K', email: 'john@attorneysomm.com', confidence: 'INFERRED', source: 'Inferred from Instagram handle-based domain pattern' },
  { rank: 98, name: 'Chrishon Lampley', handle: '@lovecorkscrew', followers: '35.4K', email: 'chrishon@lovecorkscrew.com', confidence: 'INFERRED', source: 'lovecorkscrew.com/pages/contact has no email; inferred from domain' },
  { rank: 99, name: 'Amanda', handle: '@redlips_and_vinosips', followers: '35.1K', email: '', confidence: 'PERSONAL', source: 'Gmail domain — personal email not publicly confirmable' },
  { rank: 100, name: 'Sara Renee', handle: '@bordeaux.blonde', followers: '25.4K', email: '', confidence: 'PERSONAL', source: 'Gmail domain — personal email not publicly confirmable' },
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
  const [expandedRow, setExpandedRow] = useState<number | null>(null)

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
