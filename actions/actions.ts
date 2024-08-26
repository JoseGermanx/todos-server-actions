'use server';

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";


export const addtodo = async (formData: FormData) => {
    const label = formData.get('label');
    await prisma.todo.create({
      data: {
        label: label as string,
        done: false,
      },
    });

    revalidatePath('/')
  }

  export const deleteTodo = async (formData: FormData) => {
    const id = parseInt(formData.get("id")?.toString() ?? "0");
    await prisma.todo.delete({
      where: {
        id: id as unknown as string,
      },
    });

    revalidatePath("/");
  };
