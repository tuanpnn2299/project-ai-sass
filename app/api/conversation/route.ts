import OpenAI from "openai";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { OpenAIStream, StreamingTextResponse } from "ai";
import {
  checkSubscription,
  checkUserLimit,
  incrementUserLimit,
} from "@/lib/user-limit";

const configuration = {
  apiKey: process.env.OPENAI_API_KEY!,
};

const openai = new OpenAI(configuration);

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const { messages } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!configuration.apiKey) {
      return new NextResponse("Miss OpenAI API Key.", { status: 500 });
    }

    if (!messages) {
      return new NextResponse("Messages are required", { status: 400 });
    }

    const reachToLimit = await checkUserLimit();
    const isPro = await checkSubscription();

    if (!reachToLimit && !isPro) {
      return NextResponse.json(
        { message: "You are reach to limit", status: 403 },
        { status: 403 }
      );
    }

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      max_tokens: 1000,
      stream: true,
      messages,
    });
    const stream = OpenAIStream(response, {
      onCompletion: async () => {
        if (!isPro) {
          await incrementUserLimit();
        }
      },
    });
    return new StreamingTextResponse(stream);
  } catch (error) {
    if (error instanceof OpenAI.APIError) {
      const { name, status, headers, message } = error;
      return NextResponse.json({ name, status, headers, message }, { status });
    } else {
      throw error;
    }
  }
}
