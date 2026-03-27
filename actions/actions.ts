'use server';

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

const GRID_COLUMNS = 4;
const GRID_CELL_WIDTH = 260;
const GRID_CELL_HEIGHT = 210;
const GRID_PADDING_X = 16;
const GRID_PADDING_Y = 280;

const getGridPosition = (index: number) => {
  const column = index % GRID_COLUMNS;
  const row = Math.floor(index / GRID_COLUMNS);

  return {
    posX: GRID_PADDING_X + column * GRID_CELL_WIDTH,
    posY: GRID_PADDING_Y + row * GRID_CELL_HEIGHT,
  };
};

export const addtodo = async (formData: FormData) => {
    const label = formData.get('label');
    const count = await prisma.todo.count();
    const { posX, posY } = getGridPosition(count);
    await prisma.todo.create({
      data: {
        label: label as string,
        done: false,
        posX,
        posY,
      },
    });

    revalidatePath('/')
  }

export const deleteTodo = async (formData: FormData) => {
  const id = formData.get("id")?.toString() ?? "0";
  await prisma.todo.delete({
    where: {
      id: id as unknown as string,
    },
  });

  revalidatePath("/");
};

export const updateTodoPosition = async (id: string, posX: number, posY: number) => {
  await prisma.todo.update({
    where: {
      id,
    },
    data: {
      posX,
      posY,
    },
  });

  revalidatePath("/");
};
