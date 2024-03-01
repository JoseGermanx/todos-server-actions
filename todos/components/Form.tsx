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
      <input
        type="text"
        name="label"
        className="px-4 py-2 mb-3"
        placeholder="Enter a new todo..."
        required
      />
      <Button />
    </form>
  );
};

export default Form;
