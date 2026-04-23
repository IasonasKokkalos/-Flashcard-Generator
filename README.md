# AI Flashcard Generator

A simple AI-powered flashcard generator that turns your notes, slides, or any text into structured flashcards instantly.

## Live Demo

https://flashcardgenerator-rho.vercel.app/

## Features
Generate flashcards from any input text
Fast and simple UI
AI-powered using Gemini API

## Tech Stack
TypeScript
Next.js
Tailwind CSS
Gemini API
Vercel (deployment)

## Getting Started
1. Clone the repository
  git clone https://github.com/your-username/flashcard-generator.git
  cd flashcard-generator
2. Install dependencies
  npm install
3. Set up environment variables
  Create a .env.local file in the root directory and add your Gemini API key:
  GEMINI_API_KEY=your_api_key_here
4. Run the development server
  npm run dev
5. Open http://localhost:3000
 in your browser.

## How It Works
1. User inputs text (notes, articles, etc.)
2. The app sends the text to the Gemini API
3. The AI processes the input and generates flashcards
4. Flashcards are displayed in a clean, readable format

## Possible Improvements
* PDF upload
* Export flashcards (CSV / Anki format)
* Save decks (database integration)
* Better prompt tuning for higher quality output
* Support for different flashcard styles
* Authentication system for users

## Known Issues
* Output quality may vary depending on input text
* Large inputs may hit API limits

## Contributing
Contributions are welcome. Feel free to open issues or submit pull requests.

## License
This project is open-source and available under the MIT License.
