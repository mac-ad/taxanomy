import { Icons } from "@/components/icons";

const CheckMailPage = () => {
  return (
    <div className="container h-screen flex items-center justify-center">
      <div className="space-y-10 flex items-center justify-center flex-col border p-10 rounded-md">
        <div>
          <Icons.mail className="h-12 w-12" />
        </div>
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-3xl font-semibold">Check your mail</h1>
          <p className="text-muted-foreground max-w-[40ch]">
            Check your used mail for login link. Hurry up, the login link
            expires fast.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CheckMailPage;
