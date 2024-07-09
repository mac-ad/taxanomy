import { Icons } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

const proFeatures = [
  {
    title: "Unlimited Posts",
  },
  {
    title: "Custom domain",
  },
  {
    title: "Dashboard Analytics",
  },
  {
    title: "Access to discord",
  },
  {
    title: "Premium Support",
  },
];

const PricingPage = () => {
  return (
    <section className=" container py-16 md:py-32 max-w-[65em]">
      <h1 className="font-heading text-3xl md:text-5xl lg:text-6xl">
        Simple Transparent Pricing
      </h1>
      <p className="mb-10 mt-4 max-w-[60ch] text-muted-foreground">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia aliquam
        facilis eaque ex provident aut repellendus dignissimos magnam unde quam.
      </p>
      <div className="grid md:grid-cols-[3fr_1fr] gap-6 border p-10 rounded-lg">
        <div className="space-y-4">
          <h2 className="font-semibold text-lg">
            What&apos;s included in PRO plan?
          </h2>
          <ul className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
            {proFeatures?.map((f, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <Icons.check />
                <span>{f?.title}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col items-center justify-center gap-2">
          <h1 className="text-7xl font-bold ">$19</h1>
          <p className="text-muted-foreground mb-4">Billed Monthly</p>
          <Link
            className={cn(buttonVariants({ variant: "default" }), "w-full")}
            href="/login"
          >
            Get Started
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PricingPage;
