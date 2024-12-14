import { NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const taskId = parseInt(params.id); // Extract task ID from the URL
  const { status } = await req.json(); // Get new status from the request body

  if (!status) {
    return NextResponse.json({ error: "Status is required" }, { status: 400 });
  }

  try {
    const updatedTask = await prisma.task.update({
      where: { id: taskId },
      data: { status },
    });
    return NextResponse.json(updatedTask, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Task not found" }, { status: 404 });
  }
}
