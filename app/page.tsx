import { revalidatePath } from "next/cache";
import prisma from "../lib/prisma";

import Form from "../components/Form";
import { FaGithub } from "react-icons/fa";
import Footer from "@/components/Footer";

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
    <>
    <main className="flex min-h-svh flex-col items-center w-full p-24">
        <a href="https://github.com/josegermanx/todos-server-actions" target="_blank" rel="noopener noreferrer" className=" top-5 right-5 fixed" title="Colabora">
      <FaGithub size={32} />
    </a>
      <h1 className="text-2xl md:text-4xl font-bold">Post-It Page</h1>
      <Form />
      <ul className="grid grip-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {todos.map((todo) => (
          <div key={todo.id} className="bg-yellow-100  drop-shadow-md rounded-md w-60 h-48">
           <form className="mx-3 flex justify-end" action={deleteTodo}>
                <input type="hidden" name="id" value={todo.id} />
                <button className=" text-red-900 p-1 mb-1 mt-1 font-bold text-xs" title="Eliminar">
                  X
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
    <Footer />
</>
  );
}
