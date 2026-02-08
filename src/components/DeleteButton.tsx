"use client";

import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

const DeleteSubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      variant="destructive"
      className="hover:bg-red-900"
      disabled={pending}
    >
      {pending ? "Deleting..." : "Delete"}
    </Button>
  );
};

export default DeleteSubmitButton;
