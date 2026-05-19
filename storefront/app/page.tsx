import Link from 'next/link'
import { Check, ArrowRight, Download } from 'lucide-react'

/* ─── External listing destination (Etsy / Gumroad) ──────────────── */
const LISTING_URL = '#listing-placeholder'

/* ─── The one and only CTA, used three times verbatim ────────────── */
function BuyButton({ id }: { id?: string }) {
  return (
    <a
      id={id}
      href={LISTING_URL}
      className="group inline-flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-full bg-[#0A0A0A] px-8 py-4 text-base font-semibold text-white shadow-[0_6px_0_0_#E84A1B] transition-all hover:translate-y-0.5 hover:shadow-[0_3px_0_0_#E84A1B] active:translate-y-1 active:shadow-none"
    >
      <span>Get the 50 Prompts — $27</span>
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
    </a>
  )
}

function MicroNote() {
  return (
    <p className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-[#0A0A0A]/55 sm:justify-start">
      <span className="inline-flex items-center gap-1.5">
        <Download className="h-3.5 w-3.5" strokeWidth={2} /> Instant PDF download
      </span>
      <span className="h-1 w-1 rounded-full bg-[#0A0A0A]/30" aria-hidden />
      <span>Works with free ChatGPT</span>
    </p>
  )
}

/* ─── Page ────────────────────────────────────────────────────────── */
export default function Home() {
  return (
    <div className="overflow-x-hidden">
      {/* ─────────────── HERO ─────────────── */}
      <section className="relative px-5 pb-20 pt-16 sm:pt-24">
        <div className="mx-auto max-w-2xl">
          <p className="mb-8 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#E84A1B]">
            For people who&apos;ve been applying for weeks
          </p>

          <h1 className="font-heading text-[44px] leading-[1.02] tracking-tight text-[#0A0A0A] sm:text-[64px] md:text-[76px]">
            You applied to 47 jobs.{' '}
            <span className="italic text-[#E84A1B]">You heard back from 2.</span>
          </h1>

          <p className="mt-7 max-w-xl text-lg leading-[1.55] text-[#0A0A0A]/70 sm:text-xl">
            It&apos;s not your experience. It&apos;s that nothing you&apos;re sending is targeted —
            and an ATS filter is killing your resume before a human sees a word.
          </p>

          <div className="mt-10 flex flex-col items-start gap-2">
            <BuyButton />
            <MicroNote />
          </div>
        </div>

        {/* Soft visual cue: stacked-paper illustration of the PDF */}
        <div className="pointer-events-none mx-auto mt-20 max-w-2xl select-none">
          <div className="relative h-44 sm:h-56">
            {/* back paper */}
            <div className="absolute left-[12%] top-3 h-40 w-32 rotate-[-7deg] rounded-sm bg-white shadow-[0_8px_24px_-8px_rgba(10,10,10,0.18)] sm:h-52 sm:w-40">
              <div className="mx-4 mt-5 space-y-1.5">
                <div className="h-1 w-12 rounded bg-[#0A0A0A]/12" />
                <div className="h-1 w-16 rounded bg-[#0A0A0A]/12" />
                <div className="h-1 w-10 rounded bg-[#0A0A0A]/12" />
              </div>
            </div>
            {/* mid paper */}
            <div className="absolute left-[34%] top-0 h-40 w-32 rotate-[2deg] rounded-sm bg-white shadow-[0_8px_24px_-8px_rgba(10,10,10,0.20)] sm:h-52 sm:w-40">
              <div className="mx-4 mt-5 space-y-1.5">
                <div className="h-1 w-14 rounded bg-[#0A0A0A]/15" />
                <div className="h-1 w-20 rounded bg-[#0A0A0A]/15" />
                <div className="h-1 w-12 rounded bg-[#0A0A0A]/15" />
                <div className="h-1 w-16 rounded bg-[#0A0A0A]/15" />
              </div>
            </div>
            {/* front paper */}
            <div className="absolute left-[56%] top-2 h-40 w-32 rotate-[-3deg] rounded-sm bg-white shadow-[0_10px_30px_-8px_rgba(10,10,10,0.25)] sm:h-52 sm:w-40">
              <div className="absolute right-3 top-3 h-2 w-2 rounded-full bg-[#E84A1B]" />
              <div className="mx-4 mt-5">
                <p className="font-heading text-[11px] leading-tight text-[#0A0A0A] sm:text-xs">
                  Land the Job
                </p>
                <p className="mt-0.5 text-[8px] uppercase tracking-widest text-[#0A0A0A]/45 sm:text-[9px]">
                  50 AI Prompts
                </p>
                <div className="mt-3 space-y-1.5">
                  <div className="h-1 w-16 rounded bg-[#0A0A0A]/15" />
                  <div className="h-1 w-12 rounded bg-[#0A0A0A]/15" />
                  <div className="h-1 w-20 rounded bg-[#0A0A0A]/15" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────── THE PROBLEM ─────────────── */}
      <section className="border-t border-[#0A0A0A]/8 px-5 py-20">
        <div className="mx-auto max-w-2xl">
          <p className="mb-6 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#0A0A0A]/45">
            01 — The Real Problem
          </p>
          <h2 className="font-heading text-3xl leading-tight text-[#0A0A0A] sm:text-5xl">
            You know the loop.
          </h2>
          <div className="mt-8 space-y-5 text-lg leading-[1.65] text-[#0A0A0A]/75 sm:text-xl">
            <p>
              Tweak the resume. Hit submit. Refresh inbox. Nothing.
            </p>
            <p>
              Try a new template. Try a different title. Still nothing.
              You&apos;re starting to wonder if <em className="font-heading not-italic italic text-[#0A0A0A]">you&apos;re</em> the problem.
            </p>
            <p className="font-heading text-2xl italic leading-snug text-[#E84A1B] sm:text-3xl">
              You&apos;re not.
            </p>
            <p>
              Roughly 75% of resumes never reach a human. ATS software filters them out for
              keyword mismatch. The ones that get through get a 6-second scan.
              Generic doesn&apos;t survive either step.
            </p>
            <p className="text-[#0A0A0A]">
              You don&apos;t have a qualifications problem. You have a targeting problem.
            </p>
          </div>
        </div>
      </section>

      {/* ─────────────── THE SHIFT ─────────────── */}
      <section className="bg-[#0A0A0A] px-5 py-20 text-[#FAF7F2]">
        <div className="mx-auto max-w-2xl">
          <p className="mb-6 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#E84A1B]">
            02 — The Shift
          </p>
          <h2 className="font-heading text-3xl leading-tight sm:text-5xl">
            The fix isn&apos;t a new tool. It&apos;s what you type into it.
          </h2>
          <div className="mt-8 space-y-5 text-lg leading-[1.6] text-[#FAF7F2]/75 sm:text-xl">
            <p>
              You already have ChatGPT. So does the person who got the callback.
            </p>
            <p>
              The difference is the prompt.
            </p>
          </div>

          {/* Prompt comparison */}
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-white/12 bg-white/[0.04] p-5">
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40">
                What most people type
              </p>
              <p className="font-heading text-lg italic leading-snug text-white/55 sm:text-xl">
                &ldquo;Write me a cover letter.&rdquo;
              </p>
              <p className="mt-3 text-xs text-white/40">
                Output: generic. Spotted in 2 seconds. Deleted.
              </p>
            </div>
            <div className="rounded-lg border border-[#E84A1B]/40 bg-[#E84A1B]/8 p-5">
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#E84A1B]">
                What you&apos;ll be typing
              </p>
              <p className="font-heading text-lg italic leading-snug text-white sm:text-xl">
                &ldquo;Rewrite this resume bullet to match this job description, with three quantified
                outcomes a recruiter at [company] would care about.&rdquo;
              </p>
              <p className="mt-3 text-xs text-white/55">
                Output: specific. Keyword-matched. Read end to end.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────── WHAT'S INSIDE ─────────────── */}
      <section className="px-5 py-20">
        <div className="mx-auto max-w-2xl">
          <p className="mb-6 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#0A0A0A]/45">
            03 — What&apos;s Inside
          </p>
          <h2 className="font-heading text-3xl leading-tight text-[#0A0A0A] sm:text-5xl">
            50 copy-paste prompts. <span className="italic text-[#E84A1B]">A full system</span>, not a list.
          </h2>
          <p className="mt-5 text-lg leading-[1.55] text-[#0A0A0A]/70">
            Organized for the actual job hunt — not a generic dump of AI tips.
          </p>

          <ul className="mt-10 divide-y divide-[#0A0A0A]/8 border-y border-[#0A0A0A]/8">
            {[
              {
                title: 'Resume',
                copy: 'Get past the ATS, then past the 6-second scan.',
              },
              {
                title: 'Cover Letter',
                copy: 'Write the one they actually open — and finish reading.',
              },
              {
                title: 'LinkedIn',
                copy: 'Show up in recruiter searches you&apos;re not currently in.',
              },
              {
                title: 'Interview Prep',
                copy: 'Answer the question they&apos;re actually asking.',
              },
              {
                title: 'Salary Negotiation',
                copy: 'Get the offer you should have gotten the first time.',
              },
            ].map((row, i) => (
              <li key={row.title} className="flex items-start gap-5 py-5">
                <span className="mt-1 w-6 shrink-0 text-sm font-semibold text-[#E84A1B]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="flex-1">
                  <p className="font-heading text-2xl leading-tight text-[#0A0A0A] sm:text-3xl">
                    {row.title}
                  </p>
                  <p className="mt-1 text-base text-[#0A0A0A]/65" dangerouslySetInnerHTML={{ __html: row.copy }} />
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex items-start gap-5 rounded-xl bg-[#0A0A0A]/[0.04] p-5">
            <span className="mt-1 inline-flex h-7 items-center rounded-full bg-[#0A0A0A] px-2.5 text-[10px] font-bold uppercase tracking-widest text-white">
              Bonus
            </span>
            <p className="text-base text-[#0A0A0A]/80">
              <span className="font-semibold text-[#0A0A0A]">10 ChatGPT Mistakes Job Seekers Make</span>
              {' '}— a short guide so you stop making them on day one.
            </p>
          </div>

          <p className="mt-8 text-base italic text-[#0A0A0A]/55">
            Every prompt is a template. You fill in your role, industry, and job description.
            It adapts to you — entry-level, senior, career change, weird gap, all of it.
          </p>
        </div>
      </section>

      {/* ─────────────── WHO IT'S FOR ─────────────── */}
      <section className="border-t border-[#0A0A0A]/8 px-5 py-20">
        <div className="mx-auto max-w-2xl">
          <p className="mb-6 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#0A0A0A]/45">
            04 — Who It&apos;s For
          </p>
          <h2 className="font-heading text-3xl leading-tight text-[#0A0A0A] sm:text-5xl">
            This is for you if&hellip;
          </h2>

          <ul className="mt-8 space-y-3 text-lg text-[#0A0A0A]/80 sm:text-xl">
            {[
              'You&apos;ve sent 20+ applications and heard close to nothing.',
              'You&apos;re a recent grad with thin experience and no clue how to frame it.',
              'You just got laid off and the market feels different than last time.',
              'You&apos;re switching industries and your resume still reads like the old job.',
              'You use ChatGPT, but the output sounds like everyone else&apos;s.',
            ].map((line) => (
              <li key={line} className="flex items-start gap-3">
                <Check className="mt-1.5 h-5 w-5 shrink-0 text-[#E84A1B]" strokeWidth={2.5} />
                <span dangerouslySetInnerHTML={{ __html: line }} />
              </li>
            ))}
          </ul>

          <p className="mt-8 border-l-2 border-[#0A0A0A]/15 pl-4 text-base text-[#0A0A0A]/55">
            Not for you if you already have an offer in hand. Close the laptop — congrats.
          </p>

          <div className="mt-12 flex flex-col items-start gap-2">
            <BuyButton id="cta-mid" />
            <MicroNote />
          </div>
        </div>
      </section>

      {/* ─────────────── OBJECTIONS ─────────────── */}
      <section className="bg-[#F2EEE6] px-5 py-20">
        <div className="mx-auto max-w-2xl">
          <p className="mb-6 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#0A0A0A]/45">
            05 — What You&apos;re Probably Thinking
          </p>
          <h2 className="font-heading text-3xl leading-tight text-[#0A0A0A] sm:text-5xl">
            Fair questions. Quick answers.
          </h2>

          <div className="mt-10 space-y-8">
            {[
              {
                q: '&ldquo;I already use ChatGPT — why pay $27?&rdquo;',
                a: 'Because the prompt is the skill. The tool is free. The output of &ldquo;write me a cover letter&rdquo; is exactly what&apos;s getting you ignored.',
              },
              {
                q: '&ldquo;$27 for a PDF, really?&rdquo;',
                a: 'You&apos;re not paying for paper. You&apos;re paying to stop spending another month refreshing an inbox that isn&apos;t moving.',
              },
              {
                q: '&ldquo;Will it work for my situation — entry-level, career change, weird gap?&rdquo;',
                a: 'Every prompt is a fill-in-the-blank template. Your role, your industry, your job description. It adapts to you, not the other way around.',
              },
              {
                q: '&ldquo;How do I know this isn&apos;t AI fluff?&rdquo;',
                a: 'Because it&apos;s organized by what you actually do — apply, interview, negotiate. Five sections, fifty prompts. Copy. Paste. Done. No filler.',
              },
            ].map((row) => (
              <div key={row.q}>
                <p className="font-heading text-xl italic leading-snug text-[#0A0A0A] sm:text-2xl" dangerouslySetInnerHTML={{ __html: row.q }} />
                <p className="mt-2 text-base leading-relaxed text-[#0A0A0A]/70" dangerouslySetInnerHTML={{ __html: row.a }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────── VALUE REFRAME ─────────────── */}
      <section className="px-5 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-6 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#0A0A0A]/45">
            06 — The Math
          </p>
          <p className="font-heading text-3xl leading-tight text-[#0A0A0A] sm:text-5xl">
            $27 is less than <span className="italic text-[#E84A1B]">one week</span> of unemployment.
          </p>
          <p className="mt-6 text-lg text-[#0A0A0A]/70 sm:text-xl">
            One callback pays for it. One better offer pays for it 500 times over.
          </p>
        </div>
      </section>

      {/* ─────────────── FINAL CTA ─────────────── */}
      <section className="bg-[#0A0A0A] px-5 py-24 text-[#FAF7F2]">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-6 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#E84A1B]">
            One offer. One decision.
          </p>
          <h2 className="font-heading text-4xl leading-[1.04] sm:text-6xl">
            Stop sending generic.{' '}
            <span className="italic text-[#E84A1B]">Start getting answered.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-md text-lg text-[#FAF7F2]/70">
            50 prompts. One PDF. Instant download. $27, one-time.
          </p>

          <div className="mt-10 flex flex-col items-center gap-3">
            <BuyButton id="cta-final" />
            <p className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-[#FAF7F2]/55">
              <span className="inline-flex items-center gap-1.5">
                <Download className="h-3.5 w-3.5" strokeWidth={2} /> Instant PDF download
              </span>
              <span className="h-1 w-1 rounded-full bg-white/30" aria-hidden />
              <span>Works with free ChatGPT</span>
            </p>
          </div>
        </div>
      </section>

      {/* ─────────────── MINI FAQ ─────────────── */}
      <section className="px-5 py-20">
        <div className="mx-auto max-w-2xl">
          <p className="mb-6 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#0A0A0A]/45">
            FAQ
          </p>
          <dl className="divide-y divide-[#0A0A0A]/10 border-y border-[#0A0A0A]/10">
            {[
              { q: 'What do I get?', a: 'A single PDF, optimized for phone and desktop. 50 prompts across 5 sections, plus the bonus mistakes guide.' },
              { q: 'Do I need ChatGPT Plus?', a: 'No. The free version of ChatGPT runs every prompt in this pack.' },
              { q: 'How fast can I use it?', a: 'Minutes. Open the PDF, pick a prompt, paste it into ChatGPT, fill in your details.' },
              { q: 'Is delivery instant?', a: 'Yes. The download link appears on the next screen after checkout — and arrives by email.' },
            ].map((row) => (
              <div key={row.q} className="flex flex-col gap-1.5 py-5 sm:flex-row sm:items-baseline sm:gap-8">
                <dt className="shrink-0 font-heading text-lg text-[#0A0A0A] sm:w-56 sm:text-xl">
                  {row.q}
                </dt>
                <dd className="text-base text-[#0A0A0A]/65">{row.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ─────────────── BRAND LINE ─────────────── */}
      <footer className="px-5 pb-14 pt-6">
        <div className="mx-auto max-w-2xl">
          <p className="font-heading text-base italic text-[#0A0A0A]/40">
            CareerUnlocked.
          </p>
        </div>
      </footer>
    </div>
  )
}
