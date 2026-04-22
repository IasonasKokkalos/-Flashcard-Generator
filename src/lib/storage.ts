import { Deck } from "@/types";

const STORAGE_KEY = "flashcard-decks";

// Get all saved decks from localStorage
export function getDecks(): Deck[]{
    if (typeof window == "undefined") return [];
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}

// Save a new deck (adds it to the front of the list)
export function saveDeck(deck : Deck): void {
    const decks = getDecks();
    decks.unshift(deck);  //newest first
    localStorage.setItem(STORAGE_KEY, JSON.stringify(decks));
}

// Delete a deck by its idexport function 
export function deleteDeck(id : string): void {
    const decks = getDecks().filter((d) => d.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(decks));
}

// Generate a simple unique ID (good enough for localStorage)
export function generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).slice(2);
}