import AnimatedBackground from "@/components/AnimatedBackground";

export default function Page() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#2a0d45] text-white">
      <AnimatedBackground />

      <header className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
        <div className="text-lg font-semibold tracking-tight">
          <span className="text-[#b985ff]">Tumi</span> <span className="opacity-70">/ WIP</span>
        </div>

        <nav className="flex items-center gap-3 text-sm">
          <a className="rounded-full border border-white/10 bg-white/5 px-4 py-2 hover:bg-white/10" href="#kontakt">
            Kontakt
          </a>
          <a className="rounded-full bg-[#8b5cf6] px-4 py-2 font-medium hover:brightness-110" href="#ankieta">
            Wypełnij ankietę
          </a>
        </nav>
      </header>

      <section className="relative z-10 mx-auto grid w-full max-w-6xl gap-10 px-6 pb-16 pt-8 md:grid-cols-2 md:items-start md:pt-14">
        <div className="space-y-6">
          <h1 className="text-4xl font-bold leading-tight md:text-5xl">
            Tumi jest w budowie.
            <br />
            <span className="text-[#b985ff]">Pomóż nam ją dopracować.</span>
          </h1>

          <p className="max-w-xl text-white/70">
            Tworzymy platformę dla fanów anime. Zbieramy feedback: co ma być w MVP, jak ma wyglądać katalog,
            player, listy „kontynuuj oglądanie” i cała nawigacja.
          </p>

          <div className="flex flex-wrap gap-3" id="ankieta">
            <a
              href={process.env.NEXT_PUBLIC_SURVEY_URL || "#"}
              className="rounded-full bg-[#8b5cf6] px-5 py-3 text-sm font-semibold hover:brightness-110"
              target="_blank"
              rel="noreferrer"
            >
              Link do ankiety
            </a>

            <a
              href={process.env.NEXT_PUBLIC_DISCORD_URL || "#"}
              className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold hover:bg-white/10"
              target="_blank"
              rel="noreferrer"
            >
              Dołącz do Discorda
            </a>

            <a
              href={process.env.NEXT_PUBLIC_BUYMEACOFFEE_URL || "#"}
              className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold hover:bg-white/10"
              target="_blank"
              rel="noreferrer"
            >
              Buy me a coffee
            </a>
          </div>

          <div className="rounded-3xl border border-white/10 bg-black/25 p-5 shadow-[0_0_80px_rgba(139,92,246,0.18)]">
            <p className="text-sm font-semibold text-white/80">Co już działa / co planujemy</p>
            <ul className="mt-3 space-y-2 text-sm text-white/65">
              <li>• Styl i layout jak w mockupach (ciemny motyw + fiolet)</li>
              <li>• Sekcje: popularne / nowe / kontynuuj oglądanie</li>
              <li>• Konto i logowanie (w kolejnym kroku)</li>
              <li>• Player + lista odcinków (w kolejnym kroku)</li>
            </ul>
          </div>
        </div>

        <div id="kontakt" className="rounded-3xl border border-white/10 bg-black/25 p-6 backdrop-blur-md">
          <h2 className="text-xl font-semibold">Zostaw sugestię</h2>
          <p className="mt-2 text-sm text-white/65">
            Napisz co chcesz zobaczyć w Tumi. Każda wiadomość trafia do nas.
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
                <label className="text-xs text-white/60">Email</label>
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
                rows={5}
                required
                className="mt-1 w-full resize-none rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none focus:border-[#b985ff]/60"
                placeholder="Co dodać? Co poprawić? Jak ma wyglądać MVP?"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-2xl bg-[#8b5cf6] px-5 py-3 text-sm font-semibold hover:brightness-110"
            >
              Wyślij
            </button>

            <p className="text-center text-xs text-white/45">
              Demo: wiadomości zapisują się w logach serwera (możesz podpiąć Resend).
            </p>
          </form>
        </div>
      </section>

      <footer className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-10 text-xs text-white/40">
        © {new Date().getFullYear()} Tumi • Work in Progress
      </footer>
    </main>
  );
}
