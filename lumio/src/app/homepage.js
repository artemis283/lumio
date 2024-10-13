'use client'

import { useState } from "react";

export default function homepage() {
  const [balances, setBalances] = useState([]);

  // Placeholder for fetching balances
  const fetchBalances = () => {
    // Simulate fetching balances
    setBalances([
      { asset: 'Lumens', balance: '1000' },
      { asset: 'USD', balance: '500' },
    ]);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-white">
      <header className="mb-12">
        <h1 className="text-4xl font-extrabold text-center text-blue-900 tracking-tight">
          Your Balances
        </h1>
      </header>

      <main className="flex flex-col items-center gap-6">
        <button onClick={fetchBalances} className="mb-4 px-8 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-md hover:bg-blue-700 transition-colors duration-200">
          Refresh Balances
        </button>
        <ul className="text-center text-lg text-gray-700">
          {balances.map((balance, index) => (
            <li key={index} className="mb-2">
              {balance.asset}: {balance.balance}
            </li>
          ))}
        </ul>
      </main>

      <footer className="mt-12">
        <p className="text-center text-sm text-gray-500">
          © 2024 Lumio. All rights reserved.
        </p>
      </footer>
    </div>
  );
}