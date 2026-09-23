'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import { ArrowDown, ArrowUpRight, Check, ChevronDown, Menu, MessageCircle, Sparkles, X } from 'lucide-react'
import { categoryLabel, items, translations, whatsappUrl, type Locale, type PartyItem } from '@/lib/content'

const localeNames: Record<Locale, string> = { pt: 'PT', es: 'ES', en: 'EN' }

export function PartySite() {
  const [locale, setLocale] = useState<Locale>('pt')
  const [filter, setFilter] = useState<'all' | PartyItem['category']>('all')
  const [menuOpen, setMenuOpen] = useState(false)
  const t = translations[locale]
  const filteredItems = useMemo(() => filter === 'all' ? items : items.filter((item) => item.category === filter), [filter])
  const chatUrl = whatsappUrl(`${t.hero.cta} — [NOME]`)

  const itemUrl = (item: PartyItem) => whatsappUrl(`${t.portfolio.action}: ${item.name[locale]} | ${categoryLabel(item.category, t)} | ${item.description[locale]}`)

  return (
    <main className="min-h-screen overflow-hidden bg-[#fffaf5] text-[#3d3145]">
      <header className="fixed inset-x-0 top-0 z-40 border-b border-[#3d3145]/10 bg-[#fffaf5]/90 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-10">
          <a href="#top" className="font-display text-2xl font-bold tracking-tight text-[#e85d7b]">[NOME]<span className="text-[#62b6a4]">.</span></a>
          <nav className="hidden items-center gap-7 text-sm font-medium lg:flex">
            {Object.entries(t.nav).map(([key, value]) => <a key={key} href={`#${key}`} className="transition-colors hover:text-[#e85d7b]">{value}</a>)}
          </nav>
          <div className="flex items-center gap-2">
            <div className="flex rounded-full border border-[#3d3145]/15 bg-white p-1" aria-label="Idioma">
              {(Object.keys(localeNames) as Locale[]).map((language) => <button key={language} onClick={() => setLocale(language)} className={`rounded-full px-2.5 py-1 text-[11px] font-bold transition ${locale === language ? 'bg-[#3d3145] text-white' : 'text-[#3d3145]/55 hover:text-[#3d3145]'}`} aria-pressed={locale === language}>{localeNames[language]}</button>)}
            </div>
            <button className="rounded-full p-2 lg:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">{menuOpen ? <X /> : <Menu />}</button>
          </div>
        </div>
        {menuOpen && <nav className="flex flex-col gap-4 border-t border-[#3d3145]/10 bg-[#fffaf5] px-5 py-5 lg:hidden">{Object.entries(t.nav).map(([key, value]) => <a key={key} href={`#${key}`} onClick={() => setMenuOpen(false)}>{value}</a>)}</nav>}
      </header>

      <section id="top" className="relative px-5 pb-20 pt-36 lg:px-10 lg:pb-32 lg:pt-48">
        <div className="absolute -right-28 top-20 size-72 rounded-full bg-[#f8cf55]/30 blur-3xl" /><div className="absolute -left-32 top-56 size-80 rounded-full bg-[#d9a7d9]/25 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_.95fr]">
          <div className="max-w-xl"><p className="eyebrow">{t.hero.eyebrow}</p><h1 className="font-display mt-5 text-5xl font-bold leading-[.98] tracking-tight sm:text-6xl lg:text-8xl">{t.hero.title}</h1><p className="mt-7 max-w-md text-lg leading-relaxed text-[#3d3145]/70">{t.hero.body}</p><div className="mt-9 flex flex-wrap gap-3"><a href={chatUrl} className="inline-flex items-center gap-2 rounded-full bg-[#e85d7b] px-6 py-3.5 font-semibold text-white shadow-lg shadow-[#e85d7b]/20 transition hover:-translate-y-0.5">{t.hero.cta}<ArrowUpRight size={18} /></a><a href="#portfolio" className="inline-flex items-center gap-2 rounded-full border border-[#3d3145]/20 px-6 py-3.5 font-semibold transition hover:border-[#e85d7b] hover:text-[#e85d7b]">{t.hero.secondary}<ArrowDown size={16} /></a></div></div>
          <div className="relative mx-auto w-full max-w-md lg:max-w-none"><div className="rotate-3 overflow-hidden rounded-[2.5rem] border-[12px] border-white bg-[#f8cf55] shadow-2xl shadow-[#3d3145]/15"><Image src="/placeholder.jpg" alt="Decoração de festa infantil" width={700} height={760} className="aspect-[.92] w-full object-cover mix-blend-multiply" priority /></div><div className="absolute -bottom-5 -left-4 rounded-2xl bg-white px-5 py-4 shadow-xl"><Sparkles className="mb-1 text-[#e85d7b]" size={20} /><p className="font-display text-lg font-bold">feito à mão</p></div></div>
        </div>
      </section>

      <section className="bg-white px-5 py-20 lg:px-10 lg:py-28"><div className="mx-auto max-w-7xl"><p className="eyebrow">{t.categories.eyebrow}</p><h2 className="section-title">{t.categories.title}</h2><div className="mt-10 grid gap-4 md:grid-cols-3">{(['rental', 'decoration', 'pickup'] as const).map((category, index) => <a href="#portfolio" key={category} onClick={() => setFilter(category)} className={`group rounded-3xl p-7 transition hover:-translate-y-1 ${index === 0 ? 'bg-[#f8cf55]' : index === 1 ? 'bg-[#d9a7d9]' : 'bg-[#bde3d7]'}`}><div className="flex items-start justify-between"><span className="font-display text-4xl font-bold">0{index + 1}</span><ArrowUpRight className="transition group-hover:rotate-45" /></div><h3 className="font-display mt-14 text-2xl font-bold">{t.categories[category]}</h3><p className="mt-2 max-w-xs text-[#3d3145]/70">{t.categories[`${category}Body` as keyof typeof t.categories] as string}</p></a>)}</div></div></section>

      <section id="portfolio" className="px-5 py-20 lg:px-10 lg:py-28"><div className="mx-auto max-w-7xl"><p className="eyebrow">{t.portfolio.eyebrow}</p><div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><h2 className="section-title">{t.portfolio.title}</h2><div className="flex flex-wrap gap-2">{(['all', 'rental', 'decoration', 'pickup'] as const).map((key) => <button key={key} onClick={() => setFilter(key)} className={`rounded-full px-4 py-2 text-sm font-semibold transition ${filter === key ? 'bg-[#3d3145] text-white' : 'bg-white text-[#3d3145]/65 hover:text-[#e85d7b]'}`}>{t.portfolio[key]}</button>)}</div></div><div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{filteredItems.map((item) => <article key={item.id} className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-[#3d3145]/8"><Image src={item.image} alt={item.name[locale]} width={600} height={420} className="aspect-[1.2] w-full object-cover" /><div className="p-5"><p className="text-xs font-bold uppercase tracking-widest text-[#e85d7b]">{categoryLabel(item.category, t)}</p><h3 className="font-display mt-2 text-2xl font-bold">{item.name[locale]}</h3><p className="mt-2 text-sm leading-relaxed text-[#3d3145]/65">{item.description[locale]}</p><a href={itemUrl(item)} className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#62a997] hover:text-[#e85d7b]">{t.portfolio.action}<ArrowUpRight size={15} /></a></div></article>)}</div></div></section>

      <section id="how" className="bg-[#3d3145] px-5 py-20 text-white lg:px-10 lg:py-28"><div className="mx-auto max-w-7xl"><p className="eyebrow text-[#f8cf55]">{t.how.eyebrow}</p><h2 className="section-title text-white">{t.how.title}</h2><div className="mt-12 grid gap-10 md:grid-cols-3">{t.how.steps.map((step, index) => <div key={step.title} className="relative border-t border-white/20 pt-5"><span className="font-display text-5xl font-bold text-[#f8cf55]">0{index + 1}</span><h3 className="font-display mt-8 text-2xl font-bold">{step.title}</h3><p className="mt-3 max-w-xs leading-relaxed text-white/60">{step.body}</p></div>)}</div></div></section>

      <section id="about" className="grid gap-10 px-5 py-20 lg:grid-cols-2 lg:gap-20 lg:px-10 lg:py-28"><div className="mx-auto w-full max-w-xl overflow-hidden rounded-[2.5rem] bg-[#bde3d7]"><Image src="/placeholder.jpg" alt="Detalhes de uma festa decorada" width={650} height={650} className="aspect-square w-full object-cover mix-blend-multiply" /></div><div className="flex max-w-xl flex-col justify-center"><p className="eyebrow">{t.about.eyebrow}</p><h2 className="section-title">{t.about.title}</h2><p className="mt-7 text-lg leading-relaxed text-[#3d3145]/70">{t.about.body}</p><p className="mt-8 font-display text-xl font-bold text-[#e85d7b]">{t.about.signature}</p></div></section>

      <section id="faq" className="bg-[#f8cf55] px-5 py-20 lg:px-10 lg:py-28"><div className="mx-auto max-w-4xl"><p className="eyebrow">{t.faq.eyebrow}</p><h2 className="section-title">{t.faq.title}</h2><div className="mt-10 flex flex-col gap-3">{t.faq.questions.map((question) => <details key={question.q} className="group rounded-2xl bg-white px-6 py-5"><summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg font-bold">{question.q}<ChevronDown className="transition group-open:rotate-180" /></summary><p className="mt-4 max-w-2xl leading-relaxed text-[#3d3145]/70">{question.a}</p></details>)}</div></div></section>

      <section id="contact" className="px-5 py-20 lg:px-10 lg:py-28"><div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 rounded-[2rem] bg-[#d9a7d9] p-8 sm:p-12 lg:flex-row lg:items-end lg:p-16"><div><p className="eyebrow">{t.contact.eyebrow}</p><h2 className="font-display mt-4 max-w-2xl text-4xl font-bold leading-tight sm:text-6xl">{t.contact.title}</h2><p className="mt-5 max-w-lg text-lg text-[#3d3145]/70">{t.contact.body}</p></div><a href={chatUrl} className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#3d3145] px-6 py-3.5 font-semibold text-white transition hover:bg-[#e85d7b]">{t.contact.cta}<MessageCircle size={18} /></a></div></section>

      <footer className="border-t border-[#3d3145]/10 px-5 py-8 lg:px-10"><div className="mx-auto flex max-w-7xl flex-col gap-5 text-sm text-[#3d3145]/60 sm:flex-row sm:items-center sm:justify-between"><span className="font-display text-xl font-bold text-[#e85d7b]">[NOME].</span><span>{t.footer}</span><a href="https://instagram.com" aria-label="Instagram" className="hover:text-[#e85d7b]"><Sparkles /></a></div></footer>
      <a href={chatUrl} aria-label="WhatsApp" className="fixed bottom-5 right-5 z-30 flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl shadow-[#25D366]/30 transition hover:scale-105"><MessageCircle size={27} /></a>
    </main>
  )
}

export function CheckIcon() { return <Check size={16} /> }
