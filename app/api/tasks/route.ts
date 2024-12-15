import { NextResponse } from "next/server";
import prisma from "@/prisma/client"; // Adjust the path to your prisma client

// Handle GET requests to fetch all tasks
export async function GET() {
  try {
    const tasks = await prisma.task.findMany();
    return NextResponse.json(tasks, { status: 200 });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return NextResponse.json({ message: "Failed to fetch tasks" }, { status: 500 });
  }
}

// Handle POST requests to create a new task
export async function POST(req: Request) {
  try {
    const { title, description } = await req.json();

    const newTask = await prisma.task.create({
      data: { title, description },
    });

    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    console.error("Error creating task:", error);
    return NextResponse.json(
      { message: "Failed to create task" },
      { status: 500 }
    );
  }
}
