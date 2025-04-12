import React, { useState } from 'react';

function ExpenseTable({ expenses, deleteExpense }) {
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');

  const handleSort = (field) => {
    // If clicking the same field, toggle direction
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // New field, set it and default to ascending
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Sort expenses if a sort field is selected
  const sortedExpenses = [...expenses];
  if (sortField) {
    sortedExpenses.sort((a, b) => {
      // Handle different data types
      let valueA = a[sortField];
      let valueB = b[sortField];
      
      // For string fields, use localeCompare
      if (typeof valueA === 'string') {
        const comparison = valueA.localeCompare(valueB);
        return sortDirection === 'asc' ? comparison : -comparison;
      }
      
      // For numbers and dates
      if (sortDirection === 'asc') {
        return valueA > valueB ? 1 : -1;
      } else {
        return valueA < valueB ? 1 : -1;
      }
    });
  }

  // Show a message if no expenses
  if (expenses.length === 0) {
    return (
      <div>
        <h2>Expense List</h2>
        <p>No expenses found. Add an expense using the form above.</p>
      </div>
    );
  }

  // Calculate total expenses
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div>
      <h2>Expense List</h2>
      <table className="expense-table">
        <thead>
          <tr>
            <th onClick={() => handleSort('name')}>Name</th>
            <th onClick={() => handleSort('date')}>Date</th>
            <th onClick={() => handleSort('amount')}>Amount</th>
            <th onClick={() => handleSort('category')}>Category</th>
            <th onClick={() => handleSort('description')}>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedExpenses.map((expense, index) => (
            <tr key={index}>
              <td>{expense.name}</td>
              <td>{expense.date}</td>
              <td>KSh {expense.amount.toLocaleString('en-KE', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
              <td>{expense.category}</td>
              <td>{expense.description}</td>
              <td>
                <button
                  className="delete-btn"
                  onClick={() => deleteExpense(index)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="2"><strong>Total Expenses:</strong></td>
            <td><strong>KSh {totalExpenses.toLocaleString('en-KE', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</strong></td>
            <td colSpan="3"></td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default ExpenseTable;
