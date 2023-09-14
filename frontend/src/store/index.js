import { configureStore } from '@reduxjs/toolkit';
import cafeReducer from './cafe';
import employeesReducer from './employee';
const store = configureStore({
  reducer: { cafe: cafeReducer, employees: employeesReducer },
 
});
export default store;