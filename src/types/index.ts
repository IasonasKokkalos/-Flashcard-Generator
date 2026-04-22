// A single flashcard
export interface Flashcard {
    id : string;
    question : string;
    answer : string;
}

// A deck is a group of flashcards generated from the text
export interface Deck {
    id : string;
    title : string  //auto-generated from the first few words of the text
    cards : Flashcard[];
    createdAt : string; // ISO date string
}