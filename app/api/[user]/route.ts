import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

type Request = {
    user: string;
};

export async function GET(req: Request, context: { params: Params }) {
    const { user } = context.params;
    const client = await clientPromise;
    const db = client.db("geets");
    const response = await db.collection("users").find({ email: user }).toArray();
    return NextResponse.json({ response });
};
