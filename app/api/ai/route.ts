import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai"

const ApiKey = process.env.GEMINI_API_KEY!;
const genAI = new GoogleGenerativeAI(ApiKey);

// IMPORTANT! Set the runtime to edge
export const runtime = 'edge';

export async function POST(req: NextRequest) {

  const reqBody = await req.json();
  const { chatHistory } = reqBody;

  // For text-only input, use the gemini-pro model
  const model = await genAI.getGenerativeModel({ model: "gemini-pro" });

  try {
    const prompt = "あなたはチャットアプリの会話に参加するAIです。以下に会話内容が渡されますので、この会話の流れに入って発言をしてください。発言は50文字程度以内でお願いします。あなたの返答に名前などの情報は含めないでください。\n---" + chatHistory + "\n---";

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);
    return NextResponse.json({
      text
    });
  } catch (error) {
    return NextResponse.json({
      text: "Unable to process the prompt. Please try again."
    });
  }
}