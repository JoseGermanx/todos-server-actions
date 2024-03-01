import { revalidatePath } from "next/cache";
import prisma from "../lib/prisma";

import Form from "../components/Form";

export default async function Home() {
  const todos = await prisma.todo.findMany();

  const deleteTodo = async (formData: FormData) => {
    "use server";
    const id = parseInt(formData.get("id")?.toString() ?? "0");
    await prisma.todo.delete({
      where: {
        id: id as number,
      },
    });

    revalidatePath("/");
  };

  return (
    <main className="flex min-hscreen flex-col items-center w-full p-24">
      <h1 className="text-2xl font-bold">Todos Page</h1>
      <Form />
      <ul className="list-disc">
        {todos.map((todo) => (
          <>
            <li key={todo.id}>{todo.label}</li>
            <form action={deleteTodo}>
              <input type="hidden" name="id" value={todo.id} />
              <button className="rounded bg-gray-700 text-gray-100 p-1">
                Delete
              </button>
            </form>
          </>
        ))}
      </ul>
    </main>
  );
}
