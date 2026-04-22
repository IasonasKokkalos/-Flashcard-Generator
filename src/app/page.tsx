"use client"

import { useState, useEffect } from "react";
import { Deck } from "@/types";
import { getDecks, deleteDeck } from "@/lib/storage";
import FlashcardForm from "@/components/Flashcards";
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

    function handleDeketeDeck(id: string) { 
        deleteDeck(id);
        setDecks(getDecks());
    }

    // If a deck is open, show the study view 
}
