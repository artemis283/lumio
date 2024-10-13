'use client'

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Greece() {
  const [view, setView] = useState('balances');
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const [transactions, setTransactions] = useState([
    { title: 'Dinner', amount: 45, paidBy: 'Alex (me)' },
    { title: 'Museum Tickets', amount: 30, paidBy: 'Joana' },
    { title: 'Taxi', amount: 40, paidBy: 'Lina' },
    { title: 'Souvenirs', amount: 100, paidBy: 'Mischel' },
    { title: 'Hotel', amount: 200, paidBy: 'Gonzalo' },
    { title: 'Lunch', amount: 20, paidBy: 'Andre' },
    { title: 'Boat Tour', amount: 50, paidBy: 'Alex (me)' },
    { title: 'Drinks', amount: 35, paidBy: 'Joana' },
  ]);

  const calculateBalances = () => {
    const balances = {};
    transactions.forEach(({ amount, paidBy }) => {
      if (paidBy !== 'Alex (me)') {
        balances[paidBy] = (balances[paidBy] || 0) + amount;
      }
    });
    return balances;
  };

  const [balances, setBalances] = useState(calculateBalances());

  const handleMarkAsPaid = () => {
    setBalances(prevBalances => {
      const newBalances = { ...prevBalances };
      Object.keys(newBalances).forEach(person => {
        newBalances[person] = 0;
      });
      return newBalances;
    });
    alert("Debt marked as paid!");
  };

  const handleConvertClick = () => {
    setShowModal(true);
  };

  const renderContent = () => {
    switch (view) {
      case 'balances':
        const alexOwes = Object.values(balances).reduce((total, amount) => total + amount, 0);
        return (
          <div className="flex flex-col items-center gap-6 w-full max-w-md">
            <div className="w-full p-6 bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg shadow-md text-center">
              <h3 className="text-2xl font-semibold text-blue-800">Balances</h3>
            </div>
            <div className="w-full p-4 bg-white rounded-lg shadow-md flex justify-between items-center">
              <div>
                <h3 className="text-xl font-semibold text-gray-800">Alex owes:</h3>
                <p className="text-sm text-gray-600">Total: €{alexOwes}</p>
              </div>
              <button onClick={handleMarkAsPaid} className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-full shadow-md hover:bg-blue-700 transition-transform duration-200 transform hover:scale-105">
                Mark as Paid
              </button>
            </div>
            <div className="w-full p-4 bg-white rounded-lg shadow-md mt-4">
              <h3 className="text-xl font-semibold text-gray-800">Other Users' Balances:</h3>
              {Object.entries(balances).map(([person, amount]) => (
                <p key={person} className={`text-sm ${amount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {person}: {amount >= 0 ? '+' : '-'}€{Math.abs(amount)}
                </p>
              ))}
            </div>
            <div className="flex gap-4 mt-4">
              <button onClick={handleConvertClick} className="flex-1 px-4 py-2 bg-green-500 text-white font-semibold rounded-full shadow-md hover:bg-green-600 transition-transform duration-200 transform hover:scale-105">
                Convert
              </button>
              <button className="flex-1 px-4 py-2 bg-yellow-500 text-white font-semibold rounded-full shadow-md hover:bg-yellow-600 transition-transform duration-200 transform hover:scale-105">
                Settle
              </button>
              <button className="flex-1 px-4 py-2 bg-red-500 text-white font-semibold rounded-full shadow-md hover:bg-red-600 transition-transform duration-200 transform hover:scale-105">
                Pay
              </button>
            </div>
          </div>
        );
      case 'expenses':
        const myExpenses = transactions
          .filter(transaction => transaction.paidBy === 'Alex (me)')
          .reduce((total, transaction) => total + transaction.amount, 0);

        const totalExpenses = transactions.reduce((total, transaction) => total + transaction.amount, 0);

        return (
          <div className="flex flex-col items-center gap-6 w-full max-w-md">
            <div className="w-full p-6 bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg shadow-md text-center">
              <h3 className="text-2xl font-semibold text-blue-800">My Expenses: €{myExpenses}</h3>
              <h3 className="text-2xl font-semibold text-blue-800">Total Expenses: €{totalExpenses}</h3>
            </div>
            <button onClick={() => router.push('/expenses')} className="w-full mt-4 px-6 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-md hover:bg-blue-700 transition-transform duration-200 transform hover:scale-105">
              Add Expense
            </button>
            {transactions.map((transaction, index) => (
              <div key={index} className="w-full p-4 bg-gray-100 rounded-lg shadow-md flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">{transaction.title}</h3>
                  <p className="text-sm text-gray-600">Paid by {transaction.paidBy}</p>
                </div>
                <p className="text-lg font-bold text-blue-800">€{transaction.amount}</p>
              </div>
            ))}
          </div>
        );
      case 'photos':
        return (
          <div className="flex justify-center">
            <Image
              src="/images/greece-photo1.png" 
              alt="Greece Photo 1"
              width={200}
              height={150}
              className="mx-2"
            />
            <Image
              src="/images/greece-photo2.png" 
              alt="Greece Photo 2"
              width={200}
              height={150}
              className="mx-2"
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-screen p-8 bg-gradient-to-b from-white to-gray-100">
      <header className="flex flex-col items-center mb-8">
        <Image
          src="/images/greece.png"
          alt="Greece"
          width={120}
          height={120}
          className="mb-2"
        />
        <h1 className="text-5xl font-bold text-center text-blue-900 tracking-tight mb-4">
          Greece
        </h1>
        <div className="flex gap-4 w-full max-w-md">
          <button onClick={() => setView('balances')} className="flex-1 px-6 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:bg-blue-700 transition-transform duration-200 transform hover:scale-105">
            Balances
          </button>
          <button onClick={() => setView('expenses')} className="flex-1 px-6 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:bg-blue-700 transition-transform duration-200 transform hover:scale-105">
            Expenses
          </button>
          <button onClick={() => setView('photos')} className="flex-1 px-6 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:bg-blue-700 transition-transform duration-200 transform hover:scale-105">
            Photos
          </button>
        </div>
      </header>

      <main className="flex flex-col items-center gap-8 mt-4">
        {renderContent()}
      </main>

      <footer className="w-full py-4">
        <p className="text-center text-sm text-gray-500">
          © 2024 Lumio. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
