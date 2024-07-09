import { authOptions } from "@/app/utils/auth";
import { db } from "@/app/utils/db";
import { getServerSession } from "next-auth";
import * as z from "zod";

const postCreateSchema = z.object({
  title: z.string(),
  content: z.string().optional(),
});

export const POST = async (req: Request) => {
  console.log("inside post post");
  try {
    const session = await getServerSession(authOptions);
    // console.log("session = ", session);
    const { user } = session;

    const json = await req.json();
    // console.log("json = ", json);
    const body = postCreateSchema.parse(json);
    // console.log("body", body);

    const post = await db.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: user.id,
      },
      select: {
        id: true,
      },
    });

    // console.log("post = ", post);

    return new Response(JSON.stringify(post));
  } catch (error) {
    console.log("errors = ", error);
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    //   if (error instanceof RequiresProPlanError) {
    //     return new Response("Requires Pro Plan", { status: 402 })
    //   }

    return new Response(null, { status: 500 });
  }
};
