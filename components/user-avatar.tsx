"use client";

import { User } from "@prisma/client";
import { Icons } from "./icons";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface UserAvatarProps {
  user: Pick<User, "image" | "name">;
}

const UserAvatar = ({ user }: UserAvatarProps) => {
  return (
    <Avatar>
      {user.image ? (
        <AvatarImage alt="Picture" src={user.image} className="h-10 w-10" />
      ) : (
        <AvatarFallback>
          <span className="sr-only">{user.name}</span>
          <Icons.user className="h-4 w-4" />
        </AvatarFallback>
      )}
    </Avatar>
  );
};

export default UserAvatar;
