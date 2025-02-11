import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { idToken } = await request.json();
    // Here, you could add additional validation if desired.
    const response = NextResponse.json({ status: 'success' });
    response.cookies.set('session', idToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      // Set the maxAge according to your needs.
      maxAge: 60 * 60 * 24 * 5,
      path: '/',
    });
    return response;
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 500 },
    );
  }
}
