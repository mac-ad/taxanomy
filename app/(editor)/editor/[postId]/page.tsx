import { authOptions } from "@/app/utils/auth";
import { db } from "@/app/utils/db";
import Editor from "@/components/editor";
import { getCurrentUser } from "@/lib/session";
import { Post, User } from "@prisma/client";
import { redirect } from "next/navigation";
import React from "react";

const getPostForUser = async (postId: Post["id"], userId: User["id"]) => {
  return await db.post.findFirst({
    where: {
      id: postId,
      authorId: userId,
    },
  });
};

interface EditorPageProps {
  params: {
    postId: string;
  };
}

const EditorPage = async ({ params }: EditorPageProps) => {
  const user = await getCurrentUser();

  if (!user) redirect(authOptions?.pages?.signIn || "login");

  const post = await getPostForUser(params?.postId, user?.id);

  console.log("post = ", post);

  const extractedPost = {
    id: post?.id!,
    title: post?.title!,
    content: post?.content!,
    published: post?.published!,
  };

  return <Editor post={extractedPost} />;
};

export default EditorPage;
