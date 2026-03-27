"use client";

import React, { useEffect, useMemo, useRef, useState, useTransition } from "react";
import { deleteTodo, updateTodoPosition } from "@/actions/actions";

type Todo = {
  id: string;
  label: string | null;
  posX: number;
  posY: number;
};

type DragState = {
  id: string;
  offsetX: number;
  offsetY: number;
};

const CARD_HEIGHT = 192;
const BOARD_PADDING = 16;

const clamp = (value: number, min: number, max: number) => {
  if (value < min) return min;
  if (value > max) return max;
  return value;
};

const Board = ({ todos }: { todos: Todo[] }) => {
  const [positions, setPositions] = useState<Todo[]>(todos);
  const positionsRef = useRef<Todo[]>(todos);
  const dragRef = useRef<DragState | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [, startTransition] = useTransition();

  useEffect(() => {
    setPositions(todos);
    positionsRef.current = todos;
  }, [todos]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia("(max-width: 767px)");
    const handleChange = () => setIsMobile(media.matches);
    handleChange();
    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, []);

  const updatePositions = (updater: (prev: Todo[]) => Todo[]) => {
    setPositions((prev) => {
      const next = updater(prev);
      positionsRef.current = next;
      return next;
    });
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>, id: string) => {
    if (isMobile) return;
    if (event.button !== 0) return;
    const container = containerRef.current;
    if (!container) return;
    const card = event.currentTarget;
    const cardRect = card.getBoundingClientRect();

    dragRef.current = {
      id,
      offsetX: event.clientX - cardRect.left,
      offsetY: event.clientY - cardRect.top,
    };
    setDraggingId(id);
    card.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (isMobile) return;
    const dragState = dragRef.current;
    const container = containerRef.current;
    if (!dragState || !container) return;

    const card = event.currentTarget;
    const containerRect = container.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();

    const maxX = Math.max(0, containerRect.width - cardRect.width);
    const maxY = Math.max(0, containerRect.height - cardRect.height);
    const nextX = clamp(
      event.clientX - containerRect.left - dragState.offsetX,
      0,
      maxX
    );
    const nextY = clamp(
      event.clientY - containerRect.top - dragState.offsetY,
      0,
      maxY
    );

    updatePositions((prev) =>
      prev.map((todo) =>
        todo.id === dragState.id ? { ...todo, posX: nextX, posY: nextY } : todo
      )
    );
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (isMobile) return;
    const dragState = dragRef.current;
    if (!dragState) return;

    event.currentTarget.releasePointerCapture(event.pointerId);
    dragRef.current = null;
    setDraggingId(null);

    const current = positionsRef.current.find((todo) => todo.id === dragState.id);
    if (!current) return;

    const posX = Math.round(current.posX);
    const posY = Math.round(current.posY);

    startTransition(() => updateTodoPosition(dragState.id, posX, posY));
  };

  const sortedTodos = useMemo(() => {
    const sorted = [...positions];
    if (!draggingId) return sorted;
    return sorted.sort((a, b) => {
      if (a.id === draggingId) return 1;
      if (b.id === draggingId) return -1;
      return 0;
    });
  }, [positions, draggingId]);

  const boardMinHeight = useMemo(() => {
    if (positions.length === 0) return 480;
    const maxY = Math.max(...positions.map((todo) => todo.posY));
    return Math.max(480, maxY + CARD_HEIGHT + BOARD_PADDING);
  }, [positions]);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-6xl min-h-[70svh] mt-6 flex flex-col gap-4 md:block"
      style={isMobile ? undefined : { minHeight: boardMinHeight }}
      aria-label="Tablero de post-its"
    >
      {sortedTodos.map((todo) => (
        <div
          key={todo.id}
          className={
            "bg-yellow-100 drop-shadow-md rounded-md w-full max-w-sm min-h-48 md:w-60 md:h-48 touch-auto md:touch-none select-none md:absolute" +
            (draggingId === todo.id ? " md:cursor-grabbing z-20" : " md:cursor-grab")
          }
          style={isMobile ? undefined : { left: todo.posX, top: todo.posY, position: "absolute" }}
          onPointerDown={(event) => handlePointerDown(event, todo.id)}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
        >
          <form
            className="mx-3 flex justify-end"
            action={deleteTodo}
            onPointerDown={(event) => event.stopPropagation()}
          >
            <input type="hidden" name="id" value={todo.id} />
            <button
              className=" text-red-900 p-1 mb-1 mt-1 font-bold text-xs"
              title="Eliminar"
              onPointerDown={(event) => event.stopPropagation()}
            >
              X
            </button>
          </form>
          <div className="p-4 bg-yellow-100">
            <div className="list-none">{todo.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Board;
