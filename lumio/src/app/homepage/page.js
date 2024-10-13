'use client'

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Homepage() {
  const [balances, setBalances] = useState([]);
  const router = useRouter();

  // Placeholder for fetching balances
  const fetchBalances = () => {
    // Simulate fetching balances
    setBalances([
      { asset: 'Lumens', balance: '1000' },
      { asset: 'USD', balance: '500' },
    ]);
  };

  const handleGroupClick = (groupName) => {
    if (groupName === 'Greece') {
      router.push('/greece');
    } else {
      alert(`Clicked on ${groupName} group`);
      // Implement navigation or other logic here for other groups
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-blue-50">
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          {['Greece', 'Flat 509', 'Hong Kong'].map((group, index) => (
            <div
              key={index}
              onClick={() => handleGroupClick(group)}
              className="cursor-pointer p-6 bg-white rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-200"
            >
              <Image
                src={`/images/${group.toLowerCase().replace(' ', '-')}.png`} 
                alt={`${group} Image`}
                width={80}
                height={80}
                className="mx-auto mb-4"
              />
              <h2 className="text-xl font-semibold text-center text-blue-800">{group}</h2>
              <p className="text-center text-gray-600 mt-2">Click to view details</p>
            </div>
          ))}
        </div>
      </main>

      <footer className="mt-12">
        <p className="text-center text-sm text-gray-500">
          © 2024 Lumio. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
