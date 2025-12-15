import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tumi — Work in Progress",
  description: "Tumi is in progress. Leave feedback, take the survey, and support the project.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl">
      <body>{children}</body>
    </html>
  );
}
