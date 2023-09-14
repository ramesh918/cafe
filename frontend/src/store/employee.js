import { createSlice } from '@reduxjs/toolkit';

const initialEmployeeState = { employees: [] };

const employeeSlice = createSlice({
  name: 'employee',
  initialState: initialEmployeeState,
  reducers: {
    getEmployees(state, action) {
      state.employees = action.payload.employees
    }
  },
});

export const employeeActions = employeeSlice.actions;

export default employeeSlice.reducer;