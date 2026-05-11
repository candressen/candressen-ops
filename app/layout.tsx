import type { Metadata } from 'next'
import './globals.css'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'candressen.com | Operations',
  description: 'Christian Andressen — Project Operations Dashboard',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-zinc-950 text-zinc-100 min-h-screen">
        <nav className="border-b border-zinc-800 px-8 py-4">
          <div className="max-w-[1400px] mx-auto flex items-center justify-between">
            <Link href="/" className="font-bold text-lg tracking-tight">candressen.com</Link>
            <div className="flex gap-6 text-sm text-zinc-400">
              <Link href="/" className="hover:text-white transition">Home</Link>
              <Link href="/kanban" className="hover:text-white transition">Kanban</Link>
              <Link href="/ase" className="hover:text-white transition">ASE Leads</Link>
              <Link href="/team" className="hover:text-white transition">Team</Link>
              <Link href="/tokens" className="hover:text-white transition">Tokens</Link>
            </div>
          </div>
        </nav>
        <div className="max-w-[1400px] mx-auto px-8 py-8">
          {children}
        </div>
      </body>
    </html>
  )
}
