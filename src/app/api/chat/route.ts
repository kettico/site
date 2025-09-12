import { NextResponse } from 'next/server';


let rooms = [
  { name: "General Chat", roomID: 1 },
  { name: "Sports Talk", roomID: 2 },
  { name: "Tech Discussions", roomID: 3 },
];


export async function GET() {
  return NextResponse.json({ rooms});
}

export async function POST(request: Request) {
  const body = await request.json();
  const { roomName } = body;

  if (!roomName || typeof roomName !== 'string') {
    return NextResponse.json({ error: 'Invalid room name' }, { status: 400 });
  }

  const newRoom = {
    name: roomName,
    roomID: rooms.length + 1, // simple auto-increment
  };

  rooms.push(newRoom);

  return NextResponse.json({ success: true, room: newRoom });
}

