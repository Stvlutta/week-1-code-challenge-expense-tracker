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