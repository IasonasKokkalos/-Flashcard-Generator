"use client";

import { useState } from "react";
import { Deck } from "@/types";
import Flashcard from "./Flashcards";

interface DeckViewProps {
    deck: Deck;
    onClose: () => void;
}

export default function DeckView({ deck, onClose }: DeckViewProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goNext = () => {
        if (currentIndex < deck.cards.length -1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const goPrev = () => {
        if(currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    return (
        <div className="w-full max-w-lg mx-auto">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800 truncate mr-4">
                {deck.title}
            </h2>
            <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 text-sm font-medium"
            >   
           Back
        </button>
      </div>

      <Flashcard card={deck.cards[currentIndex]} />

      <div className="flex items-center justify-between mt-6">
        <button
            onClick={goPrev}
            disabled={currentIndex == 0}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg
                     hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed
                     transition-colors"
            >
                Previous
            </button>

            <span className="text-sm text-grey-500">
                {currentIndex + 1} / {deck.cards.length}
            </span>

            <button
                onClick={goNext} 
                disabled={currentIndex == deck.cards.length -1}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg
                     hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed
                     transition-colors"
            >
                Next
             </button>
        </div>
    </div>
    );
}