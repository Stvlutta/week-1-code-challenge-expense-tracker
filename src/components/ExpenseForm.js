import React, { useState } from 'react';

function ExpenseForm({ addExpense }) {
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    amount: '',
    category: '',
    description: ''
  });
  const [formattedAmount, setFormattedAmount] = useState('');

  // Handle focus on the amount field
  const handleAmountFocus = () => {
    // If focusing on a zero value, clear it for easier entry
    if (formData.amount === 0 || formData.amount === '') {
      setFormattedAmount('');
    }
  };