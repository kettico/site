import { NextResponse } from 'next/server';


let messages = [
    { id: 1, text: 'Hello!', sender: 'Alice' },
    { id: 2, text: 'Hi How are you?', sender: 'Bob' },
    { id: 3, text: 'Good. How are you?', sender: 'Alice' },
    { id: 4, text: 'Im Great.', sender: 'Bob' },
  ];



export async function GET(request: Request, context: { params: { roomID: string } }) {
  const { roomID } = context.params;
  return NextResponse.json({ messages });
}


export async function POST(
  request: Request,
  context: { params: { roomID: string } } 
) {
  const { roomID } = context.params;
  const body = await request.json();
  const { text, sender } = body;
  messages.push({ id: messages.length + 1, text, sender });
  // Here you would normally save the message to a database
  return NextResponse.json({ success: true, message: { id: Date.now(), text, sender } });
}



export async function DELETE(request: Request) {
  const body = await request.json();
  // Create room logic here
  return NextResponse.json({ success: true });
}
