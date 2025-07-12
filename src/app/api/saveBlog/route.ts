import { NextRequest } from 'next/server';
import clientPromise from '@/lib/mogodb';


export async function POST(req: NextRequest) {
  try {
    const { url, fullText } = await req.json();
    const client = await clientPromise;
    const db = client.db('blogdb');
    const collection = db.collection('blogs');

    const result = await collection.insertOne({ url, fullText, createdAt: new Date() });
    return new Response(JSON.stringify({ success: true, id: result.insertedId }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: err }), { status: 500 });
  }
}
