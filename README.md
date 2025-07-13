# Blog Summarizer

A simple web app that takes a blog URL, scrapes the content, generates a summary using AI, translates it into Urdu, and stores the results in Supabase and MongoDB. The user can also view or delete their history.

---

## Installation

1. **Clone the repo**

```bash
git clone <repo-url>
cd assignment-2
```

2. **Install dependencies**

```bash

npm install @supabase/supabase-js
npm install mongodb
npm install @google/generative-ai
npm install cheerio axios
```

3. **Set up environment variables**

Create a `.env` file in the root with:

```
GEMINI_API_KEY=your_gemini_key
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_key
MONGODB_URI=your_mongodb_uri
```

4. **Run the development server**

```bash
npm run dev
```

---

## Tech Stack Used

* **Next.js App Router (TypeScript)**
* **ShadCN UI** for design
* **Supabase** for storing summary data
* **MongoDB Atlas** for storing full scraped text
* **Google Gemini API** for summary and translation
* **Cheerio + Axios** for scraping blog content

---

## Features

* Input blog URL and fetch content from web
* Generate English summary using Gemini
* Translate to Urdu
* Store summary in Supabase
* Store full blog text in MongoDB
* Load previous summaries on reload
* Delete individual summaries
