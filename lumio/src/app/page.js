'use client'

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import freighterApi from "@stellar/freighter-api";

import { retrievePublicKey } from "./script";
// import homepage from "./homepage";


export default function Home() {
  const router = useRouter();

  const goToBalances = () => {
    router.push('/homepage');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gradient-to-b from-blue-50 to-white">
      <header className="mb-12">
        <h1 className="text-5xl font-extrabold text-center text-blue-900 tracking-tight">
          Welcome to Lumio
        </h1>
      </header>

      <main className="flex flex-col items-center gap-10">
        <div className="shadow-lg rounded-full overflow-hidden">
          <Image
            src="/images/lumio.png"
            alt="Lumio Logo"
            width={150}
            height={150}
            className="transition-transform duration-300 transform hover:scale-110"
          />
        </div>
        <p className="text-center text-lg text-gray-700 max-w-md leading-relaxed">
          Illuminate your group expenses!
        </p>
        <button onClick={retrievePublicKey} className="mt-4 px-8 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-md hover:bg-blue-700 transition-colors duration-200">
          Connect Wallet
        </button>
        <button onClick={goToBalances} className="mt-4 px-8 py-3 bg-green-600 text-white font-semibold rounded-full shadow-md hover:bg-green-700 transition-colors duration-200">
          View Balances
        </button>
      </main>

      <footer className="mt-12">
        <p className="text-center text-sm text-gray-500">
          © 2024 Lumio. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
