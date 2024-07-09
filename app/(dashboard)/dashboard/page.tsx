import { authOptions } from "@/app/utils/auth";
import { db } from "@/app/utils/db";
import CreatePostBtn from "@/components/create-post-btn";
import DashboardHeader from "@/components/dashboard-header";
import DashboardShell from "@/components/dashboard-shell";
import PostItem from "@/components/post-item";
import PostListPlaceholder from "@/components/posts-list-placeholder";
import { getCurrentUser } from "@/lib/session";
import { User } from "@prisma/client";
import { redirect } from "next/navigation";

const getAllPostsOfUser = async (userId: User["id"]) => {
  return await db.post.findMany({
    where: {
      authorId: userId,
    },
  });
};

const Dashboard = async () => {
  const user = await getCurrentUser();

  if (!user) redirect(authOptions?.pages?.signIn || "/login");

  // get all posts

  const posts = await getAllPostsOfUser(user?.id);
  console.log("posts = ", posts);

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Posts"
        description="Create and manage all your posts"
      >
        <CreatePostBtn />
      </DashboardHeader>
      {/* show all posts */}
      <div className="flex-1">
        {posts?.length ? (
          <div className="grid divide-y divide-border rounded-md border">
            {posts?.map((post, idx) => (
              <PostItem key={idx} data={posts?.[0]} />
            ))}
          </div>
        ) : (
          <PostListPlaceholder />
        )}
      </div>
    </DashboardShell>
  );
};

export default Dashboard;
