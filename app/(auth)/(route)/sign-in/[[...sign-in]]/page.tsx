import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <SignIn path="/sign-in" />
    </div>
  );
}
