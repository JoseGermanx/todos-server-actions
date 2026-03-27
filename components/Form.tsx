"use client";

import { addtodo } from "@/actions/actions";
import React, { useRef } from "react";
import Button from "./Button";

const Form = () => {
  const ref = useRef<HTMLFormElement>(null);
  return (
    <form
      ref={ref}
      action={async (formData) => {
        ref.current?.reset();
        await addtodo(formData);
      }}
      className="flex flex-col w-[300px] my-16"
    >
      <textarea
        name="label"
        className="px-4 py-2 mb-3 border resize-none rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 h-24 w-full"
        placeholder="Enter a new post-it..."
        required
      />
      <Button />
    </form>
  );
};

export default Form;
