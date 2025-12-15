# Tumi — Work in Progress (Next.js + Vercel)

Gotowa strona WIP (work in progress) w stylu Twojej wizualizacji:
- fioletowe tło + ciemny UI
- animowane "sylwetki" (abstrakcyjne, anime-inspirowane — bez konkretnych postaci)
- link do ankiety / Discord / BuyMeACoffee
- formularz sugestii (działa od razu)
- licznik odliczania do premiery (konfigurowalny przez env)

## 1) Start lokalnie

```bash
npm install
npm run dev
```

## 2) Ustaw linki + data premiery

W pliku `.env` (lokalnie) albo w Vercel → Project Settings → Environment Variables:

```bash
# public (widoczne w przeglądarce)
NEXT_PUBLIC_SURVEY_URL="https://twoj-link-do-ankiety"
NEXT_PUBLIC_DISCORD_URL="https://twoj-link-do-discorda"
NEXT_PUBLIC_BUYMEACOFFEE_URL="https://buymeacoffee.com/tumi"
NEXT_PUBLIC_DEMO_URL="https://twoj-link-do-demo" # opcjonalnie

# odliczanie (ISO string)
NEXT_PUBLIC_LAUNCH_DATE="2026-01-31T20:00:00+01:00"
```

## 3) Formularz → mail (Resend) (opcjonalnie, polecane)

Jeśli ustawisz te zmienne, formularz będzie wysyłał maila zamiast tylko logów:

```bash
RESEND_API_KEY="re_..."
TO_EMAIL="twoj@email.com"
FROM_EMAIL="Tumi <onboarding@resend.dev>" # możesz zmienić na swój verified sender
```

Bez Resend: wiadomości trafiają do logów funkcji na Vercelu (console).

## 4) Deploy na Vercel

1. wrzuć repo na GitHub
2. Vercel → Add New Project → wybierz repo → Deploy
3. dodaj domenę w Vercel → Settings → Domains

Powodzenia! ✨
