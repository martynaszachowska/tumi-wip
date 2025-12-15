import AnimatedBackground from "@/components/AnimatedBackground";
import Countdown from "@/components/Countdown";
import Toast from "@/components/Toast";
import { Suspense } from "react";

function getLinks() {
  return {
    survey: process.env.NEXT_PUBLIC_SURVEY_URL || "https://example.com/ankieta",
    discord: process.env.NEXT_PUBLIC_DISCORD_URL || "https://discord.gg/example",
    coffee: process.env.NEXT_PUBLIC_BUYMEACOFFEE_URL || "https://buycoffee.to/tumittv",
    demo: process.env.NEXT_PUBLIC_DEMO_URL || "https://www.figma.com/make/6SQj0BR12PTTzS2hLsOlOP/Anime-Streaming-Platform?t=r0z4vKzgf0Zs3UPL-20&fullscreen=1",
  };
}


async function SentToastClient() {
  // this server component exists only to keep page.tsx clean; the real logic is in the client component below
  return null;
}

export default function Page({ searchParams }: { searchParams?: { sent?: string } }) {
  const links = getLinks();
  const sent = searchParams?.sent === "1";

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#2a0d45] text-white">
      <AnimatedBackground />

      {/* Toast (server decides initial state) */}
      <div className="relative z-50">
        {/* Toast must be client; pass initial flag */}
        {/* eslint-disable-next-line @next/next/no-before-interactive-script */}
        <Toast show={sent} />
      </div>

      {/* Top bar */}
      <header className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
        <div className="text-lg font-semibold tracking-tight">
          <span className="text-[#b985ff]">Tumi</span> <span className="opacity-70">/ Work in Progress</span>
        </div>

        <nav className="flex items-center gap-3 text-sm">
          <a className="rounded-full border border-white/10 bg-white/5 px-4 py-2 hover:bg-white/10" href="#kontakt">
            Kontakt
          </a>
          <a
            className="rounded-full bg-[#8b5cf6] px-4 py-2 font-medium hover:brightness-110"
            href="#ankieta"
          >
            Ankieta
          </a>
        </nav>
      </header>

      {/* Hero */}
      <section className="relative z-10 mx-auto grid w-full max-w-6xl gap-10 px-6 pb-10 pt-8 md:grid-cols-2 md:items-start md:pt-12">
        <div className="space-y-6">
          <h1 className="text-4xl font-bold leading-tight md:text-5xl">
            Twoje anime, Twój świat.
            <br />
            <span className="text-[#b985ff]">Wersja WIP</span>
          </h1>

          <p className="max-w-xl text-white/70">
            Budujemy Tumi — platformę dla fanów anime. Zanim wystartujemy, zbieramy sugestie i testujemy kierunek MVP.
            Zostaw opinię, wypełnij ankietę albo dorzuć wsparcie projektu.
          </p>

          <div className="flex flex-wrap gap-3" id="ankieta">
            <a
              href={links.survey}
              className="rounded-full bg-[#8b5cf6] px-5 py-3 text-sm font-semibold hover:brightness-110"
              target="_blank"
              rel="noreferrer"
            >
              Wypełnij ankietę
            </a>

            <a
              href={links.discord}
              className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold hover:bg-white/10"
              target="_blank"
              rel="noreferrer"
            >
              Dołącz do Discorda
            </a>

            <a
              href={links.coffee}
              className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold hover:bg-white/10"
              target="_blank"
              rel="noreferrer"
            >
              Postaw nam kawę!
            </a>

            <a
              href={links.demo}
              className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold hover:bg-white/10"
              target="_blank"
              rel="noreferrer"
            >
              Zobacz co planujemy
            </a>
            
          </div>

          <Countdown />

          <div className="rounded-3xl border border-white/10 bg-black/25 p-5">
            <p className="text-sm font-semibold text-white/80">Co planujemy w MVP</p>
            <ul className="mt-3 space-y-2 text-sm text-white/65">
              <li>• Katalog + filtry (gatunki, lata, status, tagi)</li>
              <li>• Player + lista odcinków + „kontynuuj oglądanie”</li>
              <li>• Profil użytkownika (lista: oglądam / obejrzane / planuję)</li>
              <li>• Wersja mobilna i szybkie ładowanie (Vercel)</li>
            </ul>
          </div>
        </div>

        {/* Form */}
        <div id="kontakt" className="rounded-3xl border border-white/10 bg-black/25 p-6 backdrop-blur-md shadow-glow">
          <h2 className="text-xl font-semibold">Zostaw sugestię</h2>
          <p className="mt-2 text-sm text-white/65">
            Napisz co chcesz zobaczyć w Tumi. Formularz działa od razu — na start wiadomości trafiają do logów,
            a po podpięciu Resend będą przychodzić na maila.
          </p>

          <form className="mt-6 space-y-3" method="post" action="/api/feedback">
            <div className="grid gap-3 md:grid-cols-2">
              <div>
                <label className="text-xs text-white/60">Imię</label>
                <input
                  name="name"
                  className="mt-1 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none focus:border-[#b985ff]/60"
                  placeholder="np. Martyna"
                />
              </div>
              <div>
                <label className="text-xs text-white/60">Email (opcjonalnie)</label>
                <input
                  name="email"
                  type="email"
                  className="mt-1 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none focus:border-[#b985ff]/60"
                  placeholder="np. twoj@email.com"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-white/60">Wiadomość / sugestia</label>
              <textarea
                name="message"
                rows={6}
                required
                className="mt-1 w-full resize-none rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none focus:border-[#b985ff]/60"
                placeholder="Co dodać? Co poprawić? Jak ma wyglądać MVP? Jakie anime/gatunki są najważniejsze?"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-2xl bg-[#8b5cf6] px-5 py-3 text-sm font-semibold hover:brightness-110"
            >
              Wyślij
            </button>

            <p className="text-center text-xs text-white/45">
              Tip: ustaw w <code className="text-white/70">.env</code> zmienne Resend, aby dostawać maile.
            </p>
          </form>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-16">
        <div className="rounded-3xl border border-white/10 bg-black/25 px-6 py-10 text-center shadow-glow">
          <h3 className="text-2xl font-bold">Tworzymy Tumi — platformę dla fanów anime</h3>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-white/65">
            Chcesz mieć wpływ na MVP? Wypełnij ankietę i dołącz do Discorda. Jeśli kibicujesz projektowi — BuyMeACoffee
            pomoże szybciej dowieźć pierwszą wersję.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a
              href={links.discord}
              className="rounded-full bg-[#8b5cf6] px-5 py-3 text-sm font-semibold hover:brightness-110"
              target="_blank"
              rel="noreferrer"
            >
              Dołącz do Discorda
            </a>
            <a
              href={links.coffee}
              className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold hover:bg-white/10"
              target="_blank"
              rel="noreferrer"
            >
              Postaw kawę
            </a>
            <a
              href={links.survey}
              className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold hover:bg-white/10"
              target="_blank"
              rel="noreferrer"
            >
              Ankieta
            </a>
          </div>
        </div>
      </section>

      <footer className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-10 text-xs text-white/40">
        © {new Date().getFullYear()} Tumi • Work in Progress
      </footer>
    </main>
  );
}
