"use client";

import { useState } from "react";
import { Flashcard, Deck } from "@/types";
import { saveDeck, generateId } from "@/lib/storage";
import { Cal_Sans } from "next/font/google";

interface FlashcardFromProps {
    onDeckCreated: (deck: Deck) => void;
}

export default function FlashcardForm({ onDeckCreated }: FlashcardFromProps) {
    const [text, setText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleGenerate() {
        if (!text.trim()) return;

        setIsLoading(true);
        setError(null);

        try {
            //Send the text to API route (not directly to Gemini)
            const response = await fetch ("/api/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify({text}),
            });

            if (!response.ok) {
                throw new Error("Failed to generate flashcards");
            }

            const data = await response.json();

            //Add IDs to each card (Gemini doesnt generate thses)
            const cardsWithIds: Flashcard[] = data.flashcard.map(
                (card: { question: string; answer: string}) => ({
                    ...card,
                    id: generateId(),
                })
            );

            //Create a deck with a title from the first few words
            const deck: Deck = {
                id: generateId(),
                title: text.slice(0, 50).trim() + (text.length > 50 ? "..." : ""),
                cards: cardsWithIds,
                createdAt: new Date().toISOString(),
            };

            //Save to localSotrage and notify parent
            saveDeck(deck);
            onDeckCreated(deck);
            setText("");
        } catch(err) {
            setError(
                err instanceof Error ? err.message : "Something went wrong"
            );
        } finally {
            setIsLoading(false);
        } 
    }

    return ( 
        <div className ="w-full max_w_2xl mx_auto">
            <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste your lectue notes, textbook paragraphs, or any text here..."
            className ="w-full h-48 p-4 border border-gray-300 rounded-lg resize-none
                   focus:ring-2 focus:ring-blue-500 focus:border-transparent
                   text-gray-800 placeholder-gray-400"
            disabled={isLoading}
            />

            <div className="mt-3 flex items-center justify-between">
                <p className="text-sm text-gray-500">
                    {text.length > 0
                    ? `${text.length} character`
                    : "Paste text to generate fdlashcards"}
                </p>

                <button
                    onClick={handleGenerate}
                    disabled={isLoading || !text.trim()}
                    className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium
                     hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed
                     transition-colors"
                >
                    {isLoading ? "Generating..." : "Generate Flashcard"}
                </button>
            </div>

            {error && (
                <p className="mt-3 text-red-500 text-sm" > {error}</p>
            )}
        </div>
    );
}