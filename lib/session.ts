import { authOptions } from "@/app/utils/auth";
import { getServerSession } from "next-auth";

export const getCurrentUser = async () => {
  const session = await getServerSession(authOptions);

  return session?.user;
};
