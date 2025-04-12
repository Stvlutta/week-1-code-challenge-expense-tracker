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
