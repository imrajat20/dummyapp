import { configureStore} from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import expensesSlice from "./expenseSlice";
import themeslice from "./themeslice";



const store = configureStore({
    reducer: { auth: authSlice.reducer, expense: expensesSlice.reducer, theme: themeslice.reducer}
});

export default store;