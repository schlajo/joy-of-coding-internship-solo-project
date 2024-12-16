import { NextResponse } from "next/server";
import prisma from "../../../../prisma/client";

const validStatuses = ["TO_START", "IN_PROGRESS", "COMPLETED"]; // Define allowed statuses

// PATCH: Update task status
export async function PATCH(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params; // Safely extract the id
    const { status } = await request.json();

    // Validate status
    if (status && !validStatuses.includes(status)) {
      return NextResponse.json(
        { error: "Invalid status value provided." },
        { status: 400 }
      );
    }

    // Update task status
    const updatedTask = await prisma.task.update({
      where: { id }, // Convert id to number if it's Int in the database
      data: {
        status: status ?? undefined, // Update only if status is provided
      },
    });

    return NextResponse.json(updatedTask);
  } catch (error) {
    console.error("Error updating task: ", error);
    return NextResponse.json(
      { error: "Failed to update task." },
      { status: 500 }
    );
  }
}

// DELETE: Delete a task
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params; // Extract task ID from params

    const deletedTask = await prisma.task.delete({
      where: {
        id // Convert id to number if necessary
      },
    });

    return NextResponse.json(deletedTask, { status: 200 });
  } catch (error) {
    console.error("Error deleting task:", error);
    return NextResponse.json(
      { error: "Failed to delete task." },
      { status: 500 }
    );
  }
}

