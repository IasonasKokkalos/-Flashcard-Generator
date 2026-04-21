import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

//Initialization of the Gemini client with API key
// This only runs on the server - the key is never sent to the browser
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(request: Request) {
    try{
        //Get the text the user pasted from the request body
        const { text } = await request.json();

        //Validate: dont send empty text to Gemini
        if( !text || text.trim().length == 0){
            return NextResponse.json(
                { error: "No text provided"},
                { status: 400 }
            );
        }

        //The prompt tells Gemini exactly what to do and how to fomat the ouput.
        //We ask for JSON so we can parse it predictably.
        const prompt = `You are a flashcard generator. Given the following text, create 5-10 flashcards. 
        Each flashcard should have:
- A clear, specific question
- A concise answer (1-3 sentences)

Return ONLY valid JSON in this exact format, with no other text:
[
  {
    "question": "What is photosynthesis?",
    "answer": "The process by which plants convert sunlight, water, and CO2 into glucose and oxygen."
  }
]
Here is the text to create flashcards from:
${text}.`;
        //Send the prompt to Gemini
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });

        //Get the response
        const responseText = response.text;

        if(!responseText) {
            return NextResponse.json(
                {error: "No response from AI"},
                { status : 500}
            );
        }

        //Gemini sometimes wraps JSON in '''json ...''' markdown blocks.
        //Strip those out so JSON.parse works.
        const cleanedText = responseText
        .replace(/```json\s*/g, "")
        .replace(/```\s*/g, "")
        .trim();

        //Parse the JSON string into actual data
        const flashcards = JSON.parse(cleanedText);

        return NextResponse.json({ flashcards });
    } catch (error) {
        console.error("Error generating flashcards:", error);
        return NextResponse.json(
            { error: "Failed to generate flashcards" },
            { status: 500 }
        );
    }
}