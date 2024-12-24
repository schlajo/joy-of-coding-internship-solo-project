import { NextResponse } from "next/server";
import prisma from "../../../../prisma/client";

const validStatuses = ["TO_START", "IN_PROGRESS", "COMPLETED"];

// PATCH: Update task details (status, title, description)
export async function PATCH(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params;
    const { status, title, description } = await request.json();

    // Validate status if provided
    if (status && !validStatuses.includes(status)) {
      return NextResponse.json(
        { error: "Invalid status value provided." },
        { status: 400 }
      );
    }

    // Update task fields dynamically
    const updatedTask = await prisma.task.update({
      where: { id },
      data: {
        title: title ?? undefined, // Update title only if provided
        description: description ?? undefined, // Update description only if provided
        status: status ?? undefined, // Update status only if provided
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
    const { id } = params;

    const deletedTask = await prisma.task.delete({
      where: {
        id,
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
