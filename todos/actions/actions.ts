'use server';

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";


export const addtodo = async (formData: FormData) => {
    const label = formData.get('label');
    try {
        await prisma.todo.create({
      data: {
        label: label as string,
        done: false,
      },
    });
    } catch (error) {
        return {
            error: error
        }
        
    }
    

    revalidatePath('/')
  }
