import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
  throw new Error('GEMINI_API_KEY is not defined');
}

const genAI = new GoogleGenerativeAI(API_KEY);

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const symptoms = formData.get('symptoms') as string;
    const imageFile = formData.get('image') as File | null;

    if (!symptoms) {
      return NextResponse.json({ error: 'Symptoms are required' }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-latest' });

    const prompt = `
      Anda adalah asisten dokter hewan AI yang berspesialisasi dalam kesehatan kucing.
      Berdasarkan gejala berikut dan gambar yang mungkin disediakan, berikan kemungkinan diagnosis, deskripsi singkat tentang kondisi tersebut, dan tindakan yang disarankan.
      Jangan menambahkan teks pengantar seperti "Berdasarkan gejala yang diberikan".
      Output harus berupa objek JSON dengan struktur berikut: { "disease": "...", "description": "...", "recommendation": "..." }.
      Tanggapan harus dalam bahasa Indonesia.
      
      Gejala: ${symptoms}
    `;

    let result;
    if (imageFile) {
      const imageBuffer = await imageFile.arrayBuffer();
      const imageBase64 = Buffer.from(imageBuffer).toString('base64');
      const imagePart = {
        inlineData: {
          data: imageBase64,
          mimeType: imageFile.type,
        },
      };
      result = await model.generateContent([prompt, imagePart]);
    } else {
      result = await model.generateContent(prompt);
    }

    const response = await result.response;
    const text = await response.text();

    // Clean the response to ensure it's valid JSON
    const jsonResponse = text.replace(/```json\n|```/g, '').trim();

    const diagnosis = JSON.parse(jsonResponse);

    return NextResponse.json(diagnosis);
  } catch (error) {
    console.error('Error in diagnose endpoint:', error);
    return NextResponse.json({ error: 'An unexpected error occurred while processing the diagnosis.' }, { status: 500 });
  }
}
