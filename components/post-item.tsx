import { cn, formatDate } from "@/lib/utils";
import { Post } from "@prisma/client";
import Link from "next/link";
import { Icons } from "./icons";
import PostOperations from "./post-operations";
import { Button, buttonVariants } from "./ui/button";

interface PostItemProps {
  data: Post;
}

const PostItem = ({ data }: PostItemProps) => {
  console.log("data = ", data);

  return (
    <div className={cn(" p-4  flex items-center justify-between")}>
      <div>
        <Link
          href={`/editor/${data?.id}`}
          className="font-bold text-md hover:underline"
        >
          {data?.title}
        </Link>
        <p className="text-muted-foreground text-sm">
          {formatDate(data?.createdAt?.toString())}
        </p>
      </div>
      <PostOperations post={data} />
    </div>
  );
};

export default PostItem;
