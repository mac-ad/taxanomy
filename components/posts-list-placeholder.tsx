import React from "react";
import CreatePostBtn from "./create-post-btn";
import { Icons } from "./icons";

const PostListPlaceholder = () => {
  return (
    <div className="border flex flex-col space-y-4 items-center justify-center border-dashed p-5 h-full w-full">
      <div className="w-[80px] grid place-items-center bg-muted aspect-square  rounded-full w-fit">
        <Icons.post className="h-10 w-10" />
      </div>
      <div className="flex flex-col gap-2 justify-center items-center">
        <h2 className="text-xl font-semibold">No posts created yet!</h2>
        <p className="text-muted-foreground max-w-[30ch] text-center mb-3">
          You don&apos;t have created any posts yet. Start creating content.
        </p>
        <CreatePostBtn variant="ghost" />
      </div>
    </div>
  );
};

export default PostListPlaceholder;
