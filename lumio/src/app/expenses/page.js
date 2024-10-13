'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddExpense() {
  const [newExpense, setNewExpense] = useState({ title: '', amount: '95', currency: 'EUR', paidBy: '' });
  const [expenses, setExpenses] = useState([]);
  const router = useRouter();

  const handleAddExpense = () => {
    if (newExpense.title && newExpense.amount && newExpense.paidBy) {
      setExpenses([...expenses, newExpense]);
      console.log("Expense added:", newExpense);
      router.push('/greece'); // Navigate back to the Greece page
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <h1 className="text-4xl font-extrabold mb-6">Add New Expense</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <label className="block mb-2 text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          placeholder="Title"
          value={newExpense.title}
          onChange={(e) => setNewExpense({ ...newExpense, title: e.target.value })}
          className="mb-4 p-3 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label className="block mb-2 text-sm font-medium text-gray-700">Amount</label>
        <div className="flex mb-4">
          <input
            type="number"
            placeholder="Amount"
            value={newExpense.amount}
            onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
            className="p-3 w-full border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={newExpense.currency}
            onChange={(e) => setNewExpense({ ...newExpense, currency: e.target.value })}
            className="p-3 border border-gray-300 rounded-r focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="EUR">EUR</option>
            <option value="USD">USD</option>
          </select>
        </div>

        <label className="block mb-2 text-sm font-medium text-gray-700">Paid by</label>
        <select
          value={newExpense.paidBy}
          onChange={(e) => setNewExpense({ ...newExpense, paidBy: e.target.value })}
          className="mb-4 p-3 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="" disabled>Paid by</option>
          <option value="Alex">Alex</option>
          <option value="Joana">Joana</option>
          <option value="Lina">Lina</option>
          <option value="Mischel">Mischel</option>
          <option value="Gonzalo">Gonzalo</option>
          <option value="Andre">Andre</option>
        </select>

        <button
          onClick={handleAddExpense}
          className="w-full bg-blue-600 text-white font-semibold py-3 rounded hover:bg-blue-700 transition-colors duration-200"
        >
          Add Expense
        </button>
      </div>
    </div>
  );
}
