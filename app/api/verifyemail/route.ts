import { NextRequest, NextResponse } from 'next/server';
import { verifyEmail } from '../../../lib/data/user';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get('token');

    console.log("API Route hit, token received:", token);

    if (!token) {
        console.log("Invalid or missing token");
        return NextResponse.json({ message: 'Invalid or missing token' }, { status: 400 });
    }

    try {
        const response = await verifyEmail(token);
        return response;
    } catch (error: any) {
        console.error('Error in verifyEmail API route:', error.message);
        return NextResponse.json({ message: 'Internal server error', error: error.message }, { status: 500 });
    }
}
