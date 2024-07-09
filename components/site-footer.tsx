import { siteConfig } from "@/config/site";
import Link from "next/link";
import { Icons } from "./icons";
import ModeToggle from "./mode-toggle";

const SiteFooter = () => {
  return (
    <footer className="py-10 container">
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="flex flex-col gap-3 items-center">
          <Icons.logo />
          <p className="text-sm flex items-center gap-2 text-muted-foreground">
            Built by{" "}
            <Link
              className="underline underline-offset-4"
              href={siteConfig?.links?.self}
            >
              macad.
            </Link>
            Hosted on{" "}
            <Link
              className="underline underline-offset-4"
              href={siteConfig?.links?.self}
            >
              macad.
            </Link>
            Source code is available on{" "}
            <Link
              className="underline underline-offset-4"
              href={siteConfig?.links?.self}
            >
              github.
            </Link>
          </p>
        </div>
        <ModeToggle />
      </div>
    </footer>
  );
};

export default SiteFooter;
