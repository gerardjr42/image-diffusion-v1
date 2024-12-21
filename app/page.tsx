"use client";

import { useAuth, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Home() {
  const { isSignedIn } = useAuth();

  return (
    <div className="min-h-screen">
      {isSignedIn ? (
        <UserButton afterSignOutUrl="/" />
      ) : (
        <Link href="/sign-in">
          <button className="bg-[#0A91B3] text-white hover:bg-[#0A91B3]/80">
            Login Page
          </button>
        </Link>
      )}
    </div>
  );
}
