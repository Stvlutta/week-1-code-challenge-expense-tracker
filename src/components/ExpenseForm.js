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

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'amount') {
      // Remove non-numeric characters and parse the value
      const numericValue = value.replace(/[^0-9]/g, '');
      
      if (numericValue === '') {
        setFormData({
          ...formData,
          amount: ''
        });
        setFormattedAmount('');
      } else {
        // Convert to number and store the raw value
        const numValue = parseInt(numericValue, 10);
        setFormData({
          ...formData,
          amount: numValue
        });
        
        // Format with commas for display
        setFormattedAmount(numValue.toLocaleString('en-KE'));
      }
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };