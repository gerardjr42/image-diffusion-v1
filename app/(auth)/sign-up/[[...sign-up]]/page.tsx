import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#101827]">
      <SignUp afterSignUpUrl="/feed" signInUrl="/sign-in" />
    </div>
  );
}
