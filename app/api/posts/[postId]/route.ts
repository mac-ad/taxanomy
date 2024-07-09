import { authOptions } from "@/app/utils/auth";
import { db } from "@/app/utils/db";
import { getServerSession } from "next-auth";

export const DELETE = async (
  req: Request,
  context: {
    params: {
      postId: string;
    };
  }
) => {
  try {
    console.log("deleting", context);

    const { params } = context;

    if (!verifyCurrentUserHasPost(params?.postId)) {
      return new Response(null, { status: 403 });
    }

    await db.post.delete({
      where: {
        id: params?.postId,
      },
    });

    return new Response(null, {
      status: 204,
    });
  } catch (error) {
    return new Response(null, {
      status: 500,
    });
  }
};

export const PATCH = async (
  req: Request,
  context: {
    params: {
      postId: string;
    };
  }
) => {
  const { params } = context;

  const json = await req.json();

  console.log("inside patch", json);

  try {
    // check if post is available and updatable by this user
    if (!(await postAvailableToPatch(params?.postId))) {
      return new Response("You cannot update this post", {
        status: 403,
      });
    }

    // update post

    const res = await db.post.update({
      where: {
        id: params?.postId,
      },
      data: {
        title: json.title,
        content: json.content,
      },
    });

    return new Response(JSON.stringify(res), {
      status: 200,
    });
  } catch (err) {
    console.log("error = ", err);
    return new Response(null, {
      status: 500,
    });
  }
};

async function verifyCurrentUserHasPost(postId: string) {
  const session = await getServerSession(authOptions);
  const count = await db.post.count({
    where: {
      id: postId,
      authorId: session?.user?.id,
    },
  });

  return count > 0;
}

async function postAvailableToPatch(postId: string) {
  const session = await getServerSession(authOptions);

  const count = await db.post.count({
    where: {
      id: postId,
      authorId: session?.user?.id,
    },
  });

  return count > 0;
}
