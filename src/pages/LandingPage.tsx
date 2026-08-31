import { ArrowRight, BookOpen, LogIn, Sparkles, Users, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const benefits = [
  {
    icon: BookOpen,
    title: "Learn with direction",
    description: "Find the right person to help you move from curious to capable.",
  },
  {
    icon: Users,
    title: "Meet your people",
    description: "Build meaningful connections around the skills you care about.",
  },
  {
    icon: Zap,
    title: "Make progress faster",
    description: "Turn practical guidance into momentum you can feel every week.",
  },
];

export default function LandingPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f6f2] text-[#18231f]">
      <div className="relative isolate">
        <div className="pointer-events-none absolute -right-32 -top-36 -z-10 h-[34rem] w-[34rem] rounded-full bg-[#d4e7dc] opacity-70 blur-3xl" />
        <div className="pointer-events-none absolute left-[-18rem] top-[30rem] -z-10 h-[28rem] w-[28rem] rounded-full bg-[#f1d5b8] opacity-60 blur-3xl" />

        <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
          <Link to="/" className="flex items-center gap-3" aria-label="Hi Mentor home">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#183d32] text-lg font-bold text-[#f6c877]">H</span>
            <span className="text-lg font-bold tracking-[-0.03em]">HI Mentor</span>
          </Link>

          <nav className="hidden items-center gap-8 text-sm font-medium text-[#52625a] md:flex" aria-label="Main navigation">
            <a href="#how-it-works" className="transition-colors hover:text-[#183d32]">How it works</a>
            <a href="#for-everyone" className="transition-colors hover:text-[#183d32]">For learners & mentors</a>
          </nav>

          <Link
            to="/login"
            aria-label="Log in"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[#cbd6cf] bg-white/70 text-[#183d32] shadow-sm transition hover:-translate-y-0.5 hover:border-[#183d32] hover:bg-white"
          >
            <LogIn className="h-5 w-5" />
          </Link>
        </header>

        <section className="mx-auto grid max-w-7xl items-center gap-16 px-6 pb-24 pt-12 lg:grid-cols-[1.02fr_0.98fr] lg:px-10 lg:pb-32 lg:pt-20">
          <div className="max-w-2xl">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#cbd6cf] bg-white/65 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#527366]">
              <Sparkles className="h-3.5 w-3.5 text-[#d18a3b]" />
              Skill sharing, made human
            </div>
            <h1 className="max-w-xl text-5xl font-bold leading-[0.98] tracking-[-0.065em] text-[#183d32] sm:text-7xl">
              Grow through the power of <span className="text-[#d18a3b]">guidance.</span>
            </h1>
            <p className="mt-7 max-w-lg text-lg leading-8 text-[#5b6a62]">
              Hi Mentor brings curious learners and generous experts together, so every new skill starts with the right conversation.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link to="/register" className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#183d32] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#285848]">
                Start your journey <ArrowRight className="h-4 w-4" />
              </Link>
              <a href="#for-everyone" className="inline-flex items-center justify-center rounded-lg border border-[#cbd6cf] bg-white/60 px-5 py-3.5 text-sm font-semibold text-[#183d32] transition hover:bg-white">
                Explore your path
              </a>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-lg" aria-label="A learner and mentor connecting">
            <div className="relative aspect-[0.92] overflow-hidden rounded-[2rem] bg-[#183d32] p-5 shadow-2xl shadow-[#183d32]/15 sm:p-7">
              <div className="absolute right-[-4rem] top-[-5rem] h-48 w-48 rounded-full border-[28px] border-[#f6c877]" />
              <div className="absolute bottom-[-3rem] left-[-3rem] h-40 w-40 rounded-full bg-[#d18a3b]" />
              <div className="relative flex h-full flex-col justify-between rounded-[1.4rem] border border-white/15 bg-[#275446] p-6 text-white sm:p-8">
                <div className="flex items-start justify-between">
                  <span className="rounded-full bg-[#f6c877] px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-[#183d32]">Your next chapter</span>
                  <span className="text-3xl text-[#f6c877]">✦</span>
                </div>
                <div>
                  <p className="text-sm text-[#c4d9cc]">A little help goes a long way</p>
                  <p className="mt-3 max-w-xs text-3xl font-semibold leading-tight tracking-[-0.04em]">The best skill to learn is the one that changes what you believe you can do.</p>
                </div>
                <div className="flex items-center justify-between border-t border-white/15 pt-5 text-sm text-[#c4d9cc]">
                  <span>Learn. Share. Become.</span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#183d32]"><ArrowRight className="h-4 w-4" /></span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section id="how-it-works" className="border-y border-[#dfe5df] bg-white/55">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-16 sm:grid-cols-3 lg:px-10">
          {benefits.map(({ icon: Icon, title, description }) => (
            <div key={title} className="border-l-2 border-[#f0c982] pl-5">
              <Icon className="mb-6 h-6 w-6 text-[#d18a3b]" />
              <h2 className="text-xl font-bold tracking-[-0.03em] text-[#183d32]">{title}</h2>
              <p className="mt-2 max-w-xs text-sm leading-6 text-[#69776f]">{description}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="for-everyone" className="mx-auto grid max-w-7xl gap-8 px-6 py-20 lg:grid-cols-2 lg:px-10 lg:py-28">
        <div className="rounded-2xl bg-[#f0d7bb] p-8 sm:p-10">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#8a5c35]">For learners</p>
          <h2 className="mt-4 max-w-md text-3xl font-bold leading-tight tracking-[-0.05em] text-[#183d32]">You do not have to figure it all out alone.</h2>
          <p className="mt-4 max-w-md leading-7 text-[#6e5948]">Find someone who has been where you want to go and make your next step a little clearer.</p>
        </div>
        <div className="rounded-2xl bg-[#d6e7dc] p-8 sm:p-10">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#527366]">For mentors</p>
          <h2 className="mt-4 max-w-md text-3xl font-bold leading-tight tracking-[-0.05em] text-[#183d32]">Your experience can open a door.</h2>
          <p className="mt-4 max-w-md leading-7 text-[#526a5d]">Share what you know, meet motivated people, and build meaningful income around your expertise.</p>
        </div>
      </section>

      <footer className="mx-auto flex max-w-7xl flex-col gap-3 border-t border-[#dfe5df] px-6 py-7 text-sm text-[#69776f] sm:flex-row sm:items-center sm:justify-between lg:px-10">
        <span className="font-semibold text-[#183d32]">HI Mentor</span>
        <span>Learn something new. Help someone grow.</span>
      </footer>
    </main>
  );
}