import React, { useState } from "react";
import classes from './ExpenseForm.module.css';

const ExpenseForm = () => {
  const [cost, setCost] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [expenses, setExpenses] = useState([]);

  const submitHandler = (e) => {
    e.preventDefault();
    const newExpense = { cost, description, category };
    setExpenses([...expenses, newExpense]);
    setCost('');
    setDescription('');
    setCategory('');
  };

  return (
    <div>
      <form className={classes.form} onSubmit={submitHandler}>
        <label htmlFor="cost">Cost</label>
        <input id="cost" type="tel" value={cost} onChange={(e) => setCost(e.target.value)} required/>

        <label htmlFor="desc">Description</label>
        <input id="desc" type="text" value={description} onChange={(e) => setDescription(e.target.value)} required/>

        <label htmlFor="category">Category</label>
        <select id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value=''>Select...</option>
          <option value='Food'>Food</option>
          <option value='Petrol'>Petrol</option>
          <option value='Salary'>Salary</option>
          <option value='Grocery'>Grocery</option>
        </select>

        <button type="submit">Add Expense</button>
      </form>

      <div className={classes.expensesList}>
        {expenses.length > 0 && (
          <ul>
            {expenses.map((expense, index) => (
              <li key={index}>
                <span>Cost: {expense.cost}</span> <br/> 
                <span>Description: {expense.description}</span> <br/> 
                <span>Category: {expense.category}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ExpenseForm;
