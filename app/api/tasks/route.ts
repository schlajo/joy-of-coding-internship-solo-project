import { NextResponse } from 'next/server';
import prisma from '@/prisma/client'; // Ensure the path to your Prisma client is correct

// GET: Fetch all tasks
export async function GET() {
  try {
    const tasks = await prisma.task.findMany();
    return NextResponse.json(tasks, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch tasks' },
      { status: 500 }
    );
  }
}

// POST: Create a new task
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description } = body;

    // Validate request body
    if (!title || !description) {
      return NextResponse.json(
        { error: 'Title and description are required' },
        { status: 400 }
      );
    }

    // Create task in database
    const newTask = await prisma.task.create({
      data: {
        title,
        description,
      },
    });

    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create task' },
      { status: 500 }
    );
  }
}
