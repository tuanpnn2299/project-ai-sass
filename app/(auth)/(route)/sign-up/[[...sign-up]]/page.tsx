import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <SignUp path="/sign-up" />;
    </div>
  );
}
