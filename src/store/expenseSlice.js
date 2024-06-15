import { createSlice } from "@reduxjs/toolkit";

const initialExpensesState = {
    expenses: [],
    showPremiumButton: false
};

const expenseSlice = createSlice({
    name: 'expenses',
    initialState: initialExpensesState,
    reducers: {
        setExpenses(state, action) {
            state.expenses = action.payload;
            const totalAmount = state.expenses.reduce((total, expense) => total + Number(expense.cost), 0);
            state.showPremiumButton = totalAmount > 10000;
        },
        addExpense(state, action) {
            state.expenses.push(action.payload);
            const totalAmount = state.expenses.reduce((total, expense) => total + Number(expense.cost), 0);
            state.showPremiumButton = totalAmount > 10000;
        }
    }
});

export const expenseActions = expenseSlice.actions;
export default expenseSlice;
