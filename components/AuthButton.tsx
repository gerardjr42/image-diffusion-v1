"use client";

import { useAuth, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export function AuthButton() {
  const { isSignedIn } = useAuth();

  return (
    <>
      {isSignedIn ? (
        <UserButton afterSignOutUrl="/" />
      ) : (
        <Link href="/sign-in">
          <button className="hover:opacity-60 transition-opacity">Login</button>
        </Link>
      )}
    </>
  );
}
