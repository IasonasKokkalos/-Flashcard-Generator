"use client";

import { useState } from "react";
import { Flashcard as FlashCardType } from "@/types";

interface FlashcardProps {
    card: FlashCardType;
}

export default function Flashcard({ card }: FlashcardProps) {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <div
            onClick={() => setIsFlipped (!isFlipped)}
            className = "cursor-pointe prespective-1000"
        >
        <div 
            className= { `relative w-full h-64 transition-transform duration-500 transform-style-3d ${
            isFlipped ? "rotate-y-180" : ""
            }`}
        >
         {/* Front - Question */}
        <div className="absolute inset-0 backface-hidden bg-white rounded-xl shadow-lg border border-gray-200 p-6 flex flex-col justify-center">
            <p className="text-sm fron-medium text-blue-600 mb-2">Question</p>
            <p className="text-lg text-gray-800 font-medium">{card.question}</p>
            <p className="text-xs text-gray-400 mt-4">Click to reveal answer</p>
        </div>

        {/* Back - Answer */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 bg-blue-50 rounded-xl shadow-lg border border-blue-200 p-6 flex flex-col justify-center">
          <p className="text-sm font-medium text-green-700 mb-2">Answer</p>
          <p className="text-lg text-gray-900">{card.answer}</p>
          <p className="text-xs text-gray-400 mt-4">Click to see question</p>
        </div>
      </div>
    </div>
    );
}