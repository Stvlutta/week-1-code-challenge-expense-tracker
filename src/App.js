import React, { useState } from 'react';
import './App.css';
import ExpenseForm from './components/ExpenseForm';
import ExpenseTable from './components/ExpenseTable';
import SearchBar from './components/SearchBar';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const addExpense = (expense) => {
    setExpenses([...expenses, expense]);
  };

  const deleteExpense = (index) => {
    const updatedExpenses = expenses.filter((_, i) => i !== index);
    setExpenses(updatedExpenses);
  };

  const filteredExpenses = expenses.filter(expense => {
    return expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
           expense.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="App">
      <h1>Expense Tracker</h1>
      <div className="container">
        <ExpenseForm addExpense={addExpense} />
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <ExpenseTable expenses={filteredExpenses} deleteExpense={deleteExpense} />
      </div>
    </div>
  );
}

export default App;

