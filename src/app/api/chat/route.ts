import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'


// GET: List of all rooms
export async function GET(request: NextRequest) {
  try {
    const rooms = await prisma.room.findMany({
      include: {
        messages: {
          select: {
            id: true,
            text: true,
            createdAt: true,
          },
          orderBy: { createdAt: 'desc'},
          take: 1, // Latest Message Preview
        },
      },
    });
    return NextResponse.json({rooms});
  } catch (error) {
    console.error('Error fetching rooms: ', error);
    return NextResponse.json({error: 'Failed to fetch rooms'}, {status: 500});
  }
}

// POST: Create a new chat room
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name } = body;

    if (!name || typeof name != 'string') {
      return NextResponse.json({error: 'Invalid room name'}, {status: 400});
    }

    const newRoom = await prisma.room.create({
      data: { name },
    });

    return NextResponse.json({success: true, room: newRoom});
  } catch (error) {
    console.error('Error creating room: ', error);
    return NextResponse.json({error: 'Failed to create room'}, {status: 500});
  }
}