# BahasAI - Your Personal AI Tutor for Indonesian Languages

BahasAI is an innovative web application designed to be a personal AI tutor for learning various Indonesian languages, including Bahasa Indonesia, Javanese, and Sundanese. It provides an interactive chat interface where users can ask questions and receive answers in their chosen language, along with an English translation to aid understanding.

This project was built for a hackathon, showcasing the power of generative AI in education.

## Features

- **AI Language Tutor**: Chat with an AI that can answer questions in Bahasa Indonesia, Javanese, or Sundanese.
- **Dual Language Responses**: Get answers in the selected language and an optional English translation for every response.
- **Text-to-Speech (TTS)**: Listen to the AI's response in the original language to improve pronunciation.
- **Built-in Translator**: A handy tool to translate text between any of the supported languages, including English.
- **Sleek, Modern UI**: A beautiful and responsive user interface built with Next.js, ShadCN UI, and Tailwind CSS, with a custom theme inspired by your brand.
- **Persistent Chat History**: Your conversation is saved in your browser's local storage, so you can pick up where you left off.
- **Animated Interface**: Smooth animations to enhance the user experience.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **AI/Backend**: [Firebase Genkit](https://firebase.google.com/docs/genkit) with Google Gemini models
- **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Deployment**: [Firebase App Hosting](https://firebase.google.com/docs/hosting)

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn

### Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/bahas-ai.git
    cd bahas-ai
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Set up environment variables:**
    Create a `.env.local` file in the root of the project and add your Google AI API key:
    ```
    GEMINI_API_KEY=your_google_ai_api_key
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```

    Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.

## How It Works

The application uses Firebase Genkit to create AI "flows". These server-side functions handle the logic for interacting with the Google Gemini models.

- `generate-response.ts`: This flow takes a user's question and the selected language. It prompts the AI to respond in that language and also provide an English translation.
- `translate-text.ts`: This flow powers the translation tool, translating text between supported languages.
- `generate-audio-from-text.ts`: This flow takes text and generates audio using a Text-to-Speech model, allowing users to hear the pronunciation.

The frontend is built with React Server Components and client components where interactivity is needed, following Next.js best practices.

Good luck with your submission!