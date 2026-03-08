import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const { userProfile } = await req.json();

        // In a real implementation this would invoke AWS OpenSearch
        // or run a PostgreSQL full-text matching / Prisma query
        // e.g. Prisma.Scheme.findMany({ where: { state: userProfile.state } })

        const matchedSchemes = [
            {
                id: "pm-kisan",
                name: "PM Kisan Samman Nidhi",
                description: "Income support of ₹6,000 per year for farmer families.",
                matchScore: 95,
                confidence: "High",
                amount: 6000,
                agency: "Central Government"
            },
            {
                id: "pm-awas",
                name: "Pradhan Mantri Awas Yojana",
                description: "Housing for all scheme.",
                matchScore: 82,
                confidence: "Medium",
                amount: 120000,
                agency: "Ministry of Rural Development"
            }
        ];

        return NextResponse.json({
            matches: matchedSchemes
        });

    } catch (error) {
        return NextResponse.json({ error: "Scheme matching failed" }, { status: 500 });
    }
}
