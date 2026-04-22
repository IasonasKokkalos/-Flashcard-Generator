import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Flashcard Generator",
  description: "Generate flashcards from your notes using AI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}