import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#101827]">
      <SignIn afterSignInUrl="/feed" signUpUrl="/sign-up" />
    </div>
  );
}