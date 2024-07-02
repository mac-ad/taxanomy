import { getServerSession } from "next-auth";
import { authOptions } from "./utils/auth";
import Auth from "./(auth)/login/page";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return <div>{session ? "logged in" : "not logged in"}</div>;
}
