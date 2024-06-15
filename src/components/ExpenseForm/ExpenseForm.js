import React, { useEffect, useState } from "react";
import axios from "axios";
import classes from './ExpenseForm.module.css';
import { useDispatch, useSelector } from "react-redux";
import { expenseActions } from "../../store/expenseSlice";
import { themeActions } from "../../store/themeslice";
import { CSVLink } from "react-csv";

const firebaseUrl = 'https://ecommerce-web-c8b78-default-rtdb.firebaseio.com/expenses';

const ExpenseForm = () => {
  const [cost, setCost] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [showPremiumButton, setShowPremiumButton] = useState(false);

  const dispatch = useDispatch();
  const expenses = useSelector(state => state.expense.expenses);
  const darktheme = useSelector(state => state.theme.darkMode);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get(`${firebaseUrl}.json`);
        const data = response.data;
        const loadedExpenses = data ? Object.keys(data).map(key => ({ id: key, ...data[key] })) : [];
        dispatch(expenseActions.setExpenses(loadedExpenses));
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchExpenses();
  }, [dispatch]);

  useEffect(() => {
    const totalCost = expenses.reduce((total, expense) => total + parseFloat(expense.cost), 0);
    setShowPremiumButton(totalCost > 1000);
  }, [expenses]);
  

  const submitHandler = async (e) => {
    e.preventDefault();
    const newExpense = { cost, description, category };

    try {
      if (isEditing) {
        await axios.put(`${firebaseUrl}/${editingId}.json`, newExpense);
        dispatch(expenseActions.setExpenses(expenses.map(expense => expense.id === editingId ? { id: editingId, ...newExpense } : expense)));
        setIsEditing(false);
        setEditingId(null);
      } else {
        const response = await axios.post(`${firebaseUrl}.json`, newExpense);
        const newExpenseWithId = { id: response.data.name, ...newExpense };
        dispatch(expenseActions.addExpense([...expenses, newExpenseWithId]));
      }
    } catch (error) {
      console.error("Error adding/updating data: ", error);
    }

    setCost('');
    setDescription('');
    setCategory('');
  };

  const editHandler = (expense) => {
    setIsEditing(true);
    setEditingId(expense.id);
    setCost(expense.cost);
    setDescription(expense.description);
    setCategory(expense.category);
  };

  const deleteHandler = async (id) => {
    try {
      await axios.delete(`${firebaseUrl}/${id}.json`);
      dispatch(expenseActions.setExpenses(expenses.filter(expense => expense.id !== id)));
    } catch (error) {
      console.error("Error deleting data: ", error);
    }
  };
  const activatePremiumHandler = () => {
    dispatch(themeActions.toggleTheme());
  };
  const csvData = expenses.map(expense => ({
    Cost: expense.cost,
    Description: expense.description,
    Category: expense.category
  }));

  return (
    <div className={darktheme ? classes.dark : classes.light}>
      <form className={classes.form} onSubmit={submitHandler}>
        <label htmlFor="cost">Cost</label>
        <input id="cost" type="tel" value={cost} onChange={(e) => setCost(e.target.value)} required />

        <label htmlFor="desc">Description</label>
        <input id="desc" type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />

        <label htmlFor="category">Category</label>
        <select id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value=''>Select...</option>
          <option value='Food'>Food</option>
          <option value='Petrol'>Petrol</option>
          <option value='Salary'>Salary</option>
          <option value='Grocery'>Grocery</option>
        </select>

        <button type="submit" className={classes.button}>
          {isEditing ? 'Update Expense' : 'Add Expense'}
        </button>
      </form>
      {showPremiumButton && <button className={classes.button} onClick={activatePremiumHandler}>Activate Premium</button>}
      {showPremiumButton && <button className={classes.button}>
        <CSVLink data={csvData} filename="expenses.csv">Download CSV</CSVLink>
      </button>}

      <div className={classes.expensesList}>
        {expenses.length > 0 && (
          <ul>
            {expenses.map((expense) => (
              <li key={expense.id}>
                <span>Cost: {expense.cost}$</span> <br />
                <span>Description: {expense.description}</span> <br />
                <span>Category: {expense.category}</span>
                <br />
                <span>
                  <button className={classes.new} onClick={() => editHandler(expense)}>Edit</button>
                  <button className={classes.new} onClick={() => deleteHandler(expense.id)}>Delete</button>
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ExpenseForm;
