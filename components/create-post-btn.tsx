"use client";

import { VariantProps } from "class-variance-authority";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Icons } from "./icons";
import { Button } from "./ui/button";
import { buttonVariants } from "./ui/button";

const CreatePostBtn = ({ variant }: VariantProps<typeof buttonVariants>) => {
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const createPostHandler = async () => {
    console.log("Create post");
    setLoading(true);

    const res = await fetch("/api/posts/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "Untitled Post",
      }),
    }).then((r) => r.json());
    console.log("res = ", res);
    router.refresh();
    setLoading(true);
    router.push(`/editor/${res.id}`);
  };

  return (
    <Button
      variant="default"
      text="New Post"
      iconLeft={<Icons.add className="h-4 w-4" />}
      onClick={createPostHandler}
      loading={loading}
      disabled={loading}
    />
  );
};

export default CreatePostBtn;
