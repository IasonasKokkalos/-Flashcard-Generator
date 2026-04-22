"use client"

import { useState, useEffect } from "react";
import { Deck } from "@/types";
import { getDecks, deleteDeck } from "@/lib/storage";
import FlashcardForm from "@/components/FlashcardForm";
import DeckView from "@/components/DeckView";

export default function Home() {
    const [decks, setDecks] = useState<Deck[]>([]);
    const [activeDeck, setActiveDeck] = useState<Deck | null>(null);

    //Load saved decks from localStorage wen the page first loads
    useEffect(() => {
        setDecks(getDecks());
    }, []);

    function handleDeckCreated(deck: Deck) {
        setDecks(getDecks());    // refresh the list from localStorage
        setActiveDeck(deck);        // immediately open the new deck
    }

    function handleDeleteDeck(id: string) { 
        deleteDeck(id);
        setDecks(getDecks());
    }

    // If a deck is open, show the study view 
    if (activeDeck) {
        return (
            <main className="min-h-screen bg-gray-50 py-12 px-4">
               <DeckView
                    deck={activeDeck}
                    onClose={() => setActiveDeck(null)}
                />
                </main>   
        );
    }

    // Otherwise, show the generator + saved decks
    return (<main className="min-h-screen bg-gray-50 py-12 px-4">
                <div className="max-w-2xl mx-auto">
                    <h1 className="text-3xl font-bold text-gray-900 text-center mb-2">
                    AI Flashcard Generator
                    </h1>
                    <p className="text-gray-500 text-center mb-8">
                    Paste your notes and get instant flashcards
                    </p>

                    <FlashcardForm onDeckCreated={handleDeckCreated} />

                    {/* Saved Decks */}
                    {decks.length > 0 && (
                        <div className="mt-12">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">
                                Your Decks
                            </h2>

                        <div className="space-y-3">
                            {decks.map((deck) => (
                                <div
                                    key={deck.id}
                                    className="flex items-center justify-between p-4 bg-whiter rounded-lg
                                                border border-gray-200 hover:border-blue-300 transition-colors"
                                >
                                  <div
                                    className="cursor-pointer flex-1"
                                    onClick={() => setActiveDeck(deck)}
                                    >
                                        <p className="font-medium text-gray-800">{deck.title}</p>
                                        <p className="text-sm text-gray-500">
                                            {deck.cards.length} cards -{" "}
                                            {new Date(deck.createdAt).toLocaleDateString()}
                                            </p>
                                        </div>  

                                        <button
                                            onClick={() => handleDeleteDeck(deck.id)}
                                            className="ml-4 text-red-400 hover:text-red-600 text-sm"
                                        >
                                            Delete
                                        </button>
                                    </div>
                            ))}                        
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
