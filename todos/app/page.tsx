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
      <h1 className="text-2xl font-bold">Post-It Page</h1>
      <Form />
      <ul className="grid grip-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
        {todos.map((todo) => (
          <div key={todo.id} className="bg-yellow-100  drop-shadow-md rounded-md">
           <form className="mx-3 flex justify-end border-b-2 border-orange-400" action={deleteTodo}>
                <input type="hidden" name="id" value={todo.id} />
                <button className="rounded bg-gray-700 text-gray-100 p-1 mb-1 mt-1 font-light text-xs">
                  Delete
                </button>
              </form>
          <div
            
            className="p-4 bg-yellow-100"
          >
            <div>
              <li className="list-none">{todo.label}</li>
            </div>
          </div>
          </div>
        ))}
      </ul>
    </main>
  );
}