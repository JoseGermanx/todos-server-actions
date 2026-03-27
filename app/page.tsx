import { revalidatePath } from "next/cache";
import prisma from "../lib/prisma";

import Form from "../components/Form";
import Board from "@/components/Board";
import { FaGithub } from "react-icons/fa";
import Footer from "@/components/Footer";

export default async function Home() {
  const todos = await prisma.todo.findMany({
    select: {
      id: true,
      label: true,
      posX: true,
      posY: true,
    },
  });

  return (
    <>
    <main className="flex min-h-svh flex-col items-center w-full p-24">
        <a href="https://github.com/josegermanx/todos-server-actions" target="_blank" rel="noopener noreferrer" className=" top-5 right-5 fixed" title="Colabora">
      <FaGithub size={32} />
    </a>
      <h1 className="text-2xl md:text-4xl font-bold">Post-It Page</h1>
      <Form />
      <Board todos={todos} />
    </main>
    <Footer />
</>
  );
}
