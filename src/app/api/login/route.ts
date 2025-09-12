import { NextResponse } from 'next/server';
import { serialize } from 'cookie';
import jwt from 'jsonwebtoken';


let accounts = [
    { username: "user1", password: "pass1" },
]

export async function POST(request: Request) {
  const { username, password} = await request.json();

  if (!username || typeof username !== 'string') {
    return NextResponse.json({ error: 'Invalid username' }, { status: 400 });
  }

  if (!password || typeof password !== 'string') {
    return NextResponse.json({ error: 'Invalid password' }, { status: 400 });
  }

  const account = accounts.find(
    (acc) => acc.username === username && acc.password === password
  );

  if (!account) {
    return NextResponse.json(
      { success: false, message: 'Invalid credentials' },
      { status: 401 }
    );
  }

  // Issue a JWT (or any token you prefer)
  const token = jwt.sign(
    { username },
    process.env.JWT_SECRET as string,
    { expiresIn: '7d' }
  );

  // Serialize it into a secure, HTTP‐only cookie
  const cookie = serialize('auth', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 1 week
  });

  // Return JSON plus Set-Cookie header
  const response = NextResponse.json(
    { success: true, message: 'Login successful' },
    { status: 200 }
  );
  response.headers.set('Set-Cookie', cookie);
  return response;
}

