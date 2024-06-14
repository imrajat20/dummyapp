import { configureStore} from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import expensesSlice from "./expenseSlice";


const store = configureStore({
    reducer: { auth: authSlice.reducer, expense: expensesSlice.reducer}
});

export default store;