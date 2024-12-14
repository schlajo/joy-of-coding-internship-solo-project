import prisma from "@/prisma/client";
import TaskCard from "../components/TaskCard";

const TasksPage = async () => {
  // Fetch tasks from the database directly in the component
  const tasks = await prisma.task.findMany();

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Tasks</h1>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default TasksPage;

