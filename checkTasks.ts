// checkTasks.ts
import prisma from "./prisma/client"; // Adjust path

async function checkTasks() {
  try {
    const tasks = await prisma.task.findMany({
      select: {
        id: true,
        status: true,
      },
    });
    console.log(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
}

checkTasks();
