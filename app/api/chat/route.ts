import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const { message, sessionId } = await req.json();

        // Mock response simulating a conversational agent like Bhashini + LLM
        // In a real system, you would pass `message` to AWS Bedrock or OpenAI, maintaining `sessionId` state

        let reply = "Namaste. Main SarkariAgent hoon. Aapka naam kya hai aur aap kis rajya (state) se hain?";

        if (message.toLowerCase().includes("kaise")) {
            reply = "Aap bas apney barey mein batayein uske badle main saare forms automatically bhar dunga. Apni aayu (age) aur vyavsaay (occupation) bataiye.";
        } else if (message.includes("kisan") || message.includes("farmer") || message.includes("kheti")) {
            reply = "Accha, aap kisan hain. Aapke paas kitni zameen hai? Hum PM Kisan Samman Nidhi ke liye form bhar sakte hain.";
        } else {
            reply = "Dhanyavad. Aapki jankari maine save kar li hai. Aap PM Kisan aur Ayushman Bharat yojanaon ke liye eligible lagte hain. Kya main PM Kisan ka form shuru karun?";
        }

        return NextResponse.json({
            reply,
            audioUrl: '', // Mocking TTS output for Voice
            extractedEntities: {
                occupation: "farmer",
                intent: "scheme_search"
            }
        });

    } catch (error) {
        return NextResponse.json({ error: "Voice processing failed" }, { status: 500 });
    }
}
