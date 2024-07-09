"use client";

import { Post, User } from "@prisma/client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs/types/index";
import TextAreaAutosize from "react-textarea-autosize";
import "../styles/editor.css";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface EditorProps {
  post: Pick<Post, "id" | "title" | "content" | "published">;
}

const postPatchSchema = z.object({
  title: z.string().min(3).max(128).optional(),

  // TODO: Type this properly from editorjs block types?
  content: z.any().optional(),
});

const Editor = ({ post }: EditorProps) => {
  const [saving, setSaving] = useState<boolean>(false);
  const ref = useRef<EditorJS>();

  const [mounted, setMounted] = useState<boolean>(false);

  const { handleSubmit, watch, register } = useForm();

  const router = useRouter();

  const initializeEditor = useCallback(async () => {
    const EditorJS = (await import("@editorjs/editorjs")).default;
    const Header = (await import("@editorjs/header")).default;
    const List = (await import("@editorjs/list")).default;
    const Code = (await import("@editorjs/code")).default;
    const LinkTool = (await import("@editorjs/link")).default;
    const InlineCode = (await import("@editorjs/inline-code")).default;
    const Embed = (await import("@editorjs/embed")).default;
    const Table = (await import("@editorjs/table")).default;

    const body = postPatchSchema.parse(post);

    console.log("body - ", body);

    if (!ref?.current) {
      const editor = new EditorJS({
        holder: "editor",
        onReady: () => {
          ref.current = editor;
        },
        placeholder: "Type here to write your post...",
        data: body.content,
        inlineToolbar: true,
        tools: {
          header: Header,
          linkTool: LinkTool,
          list: List,
          code: Code,
          inlineCode: InlineCode,
          table: Table,
          // embed: Embed,
        },
      });
    }
  }, [post]);

  const onSubmit = async (data: any) => {
    setSaving(true);
    console.log("submitting", data);
    const blocks = await ref?.current?.save();
    const response = await fetch(`/api/posts/${post?.id}`, {
      method: "PATCH",
      body: JSON.stringify({
        title: data?.title,
        content: blocks,
      }),
    });
    if (!response.ok) {
      setSaving(false);
      return toast.error("something went wrong");
    }
    toast.success("Post updated successfully");
    router.refresh();
    setSaving(false);
    console.log(blocks);
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      setMounted(true);
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      initializeEditor();
    }

    return () => {
      ref.current?.destroy();
      ref.current = undefined;
    };
  }, [mounted, initializeEditor]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="py-10">
      <div className="w-full max-w-[800px] mx-auto prose prose-stone dark:prose-invert">
        <div className="flex items-center justify-between">
          <TextAreaAutosize
            id="title"
            autoFocus
            placeholder="Post title"
            defaultValue={post.title}
            className="w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none"
            {...register("title")}
          />
          <Button text="Save" loading={saving} disabled={saving} />
        </div>
        <div id="editor" className="min-h-[500px] "></div>
        <p className="text-sm text-gray-500">
          Use{" "}
          <kbd className="rounded-md border bg-muted px-1 text-xs uppercase">
            Tab
          </kbd>{" "}
          to open the command menu.
        </p>
      </div>
    </form>
  );
};

export default Editor;
