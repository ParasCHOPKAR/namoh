// components/LogoutButton.tsx
"use client";
import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button 
      onClick={() => signOut({ callbackUrl: '/' })} 
      className="text-sm font-bold text-red-500 hover:underline"
    >
      Sign Out
    </button>
  );
}