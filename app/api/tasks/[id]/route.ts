import { NextResponse } from 'next/server';
import prisma from '@/prisma/client'; // Ensure the path to your Prisma client is correct

// GET: Fetch a single task by ID
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const task = await prisma.task.findUnique({
      where: { id: parseInt(params.id) },
    });

    if (!task) {
      return NextResponse.json(
        { error: 'Task not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(task, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch task' },
      { status: 500 }
    );
  }
}

// PATCH: Update a task's status or content
export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const { title, description, status } = body;

    const updatedTask = await prisma.task.update({
      where: { id: parseInt(params.id) },
      data: {
        ...(title && { title }),
        ...(description && { description }),
        ...(status && { status }),
      },
    });

    return NextResponse.json(updatedTask, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update task' },
      { status: 500 }
    );
  }
}

// DELETE: Remove a task by ID
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.task.delete({
      where: { id: parseInt(params.id) },
    });

    return NextResponse.json(
      { message: 'Task deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete task' },
      { status: 500 }
    );
  }
}
