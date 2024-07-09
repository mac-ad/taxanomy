"use client";

import { cn } from "@/lib/utils";
import { Post } from "@prisma/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/drop-down";
import Link from "next/link";
import React, { useState } from "react";
import { Icons } from "./icons";
import { Button, buttonVariants } from "./ui/button";
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface PostOperationProps {
  post: Post;
}

const PostOperations = ({ post }: PostOperationProps) => {
  const router = useRouter();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false);

  const [deleting, setDeleting] = useState<boolean>(false);

  const resetStates = () => {
    setDeleting(false);
    setShowDeleteConfirm(false);
  };

  const deletePostHandler = async (e: any) => {
    setDeleting(true);
    e.preventDefault();
    console.log("deleting");
    const res = await fetch(`/api/posts/${post?.id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      toast.error("something went wrong");
    }

    resetStates();
    toast.success("post deleted successfully");
    console.log("res = ", res);
    router.refresh();
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger
          className={cn(buttonVariants({ variant: "ghost" }), "border px-2")}
        >
          <Icons.verticleEllipsis className="h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <Link href={`/editor/${post?.id}`}>Edit</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onSelect={() => setShowDeleteConfirm(true)}
            className="text-destructive hover:text-destructive focus:text-destructive"
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader
            close={() => {
              resetStates();
            }}
          >
            <AlertDialogTitle>Confirmation Deletion of Post</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription>
            This action will permanently delete the post and all of it&apos;s
            data
          </AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              disabled={deleting}
              onClick={deletePostHandler}
              className={cn(
                buttonVariants({
                  variant: "destructive",
                }),
                "flex items-center gap-2"
              )}
            >
              {deleting ? <Icons.spinner className="h-3 w-3" /> : null}
              <span className="">I understand, delete this post</span>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default PostOperations;
