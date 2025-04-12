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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Create a new expense object with all fields
    const newExpense = {
      ...formData,
      amount: parseFloat(formData.amount) // Ensure it's a number
    };
    
    // Add the expense to the list
    addExpense(newExpense);
    
    // Reset the form
    setFormData({
      name: '',
      date: '',
      amount: '',
      category: '',
      description: ''
    });
    setFormattedAmount('');
  };

  return (
    <div className="form-container">
      <h2>Add New Expense</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name">Expense Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="amount">Amount (KSh)</label>
            <input
              type="text"
              id="amount"
              name="amount"
              value={formattedAmount}
              onChange={handleChange}
              onFocus={handleAmountFocus}
              placeholder="0"
              pattern="[0-9,]*"
              inputMode="numeric"
              required
            />
          </div>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select a category</option>
              <option value="Food">Food</option>
              <option value="Transportation">Transportation</option>
              <option value="Housing">Housing</option>
              <option value="Utilities">Utilities</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Shopping">Shopping</option>
              <option value="Personal">Personal</option>
              <option value="Education">Education</option>
              <option value="Other">Other</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        
        <button type="submit">Add Expense</button>
      </form>
    </div>
  );
}

export default ExpenseForm;
