import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios'
import * as cheerio from 'cheerio'

// for APi 
import { GoogleGenerativeAI } from '@google/generative-ai';
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export  async function POST(req : NextRequest )
{
    const { url } = await req.json();
    // we have done error checking in the frontend, so we can assume url is valid 
    try
    {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    // Extract all paragraphs
    const paragraphs = $('p').map((i, el) => $(el).text()).get();
    const blogText = paragraphs.join(' ').slice(0, 5000); // Limit size

     const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

     // Generate summary
    const summaryResult = await model.generateContent(`Summarize this blog:\n${blogText}`);
    const summary = summaryResult.response.text();

    // Translate to Urdu
    const urduResult = await model.generateContent(`Translate this into Urdu:\n${summary}`);
    const urdu = urduResult.response.text();

    return NextResponse.json({ content: blogText, summary, urdu }, { status: 200 });
    }
    catch 
    {
        return NextResponse.json({ error: 'Failed to fetch or parse blog' }, { status: 500 });
    }
}