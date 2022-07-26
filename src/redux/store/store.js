import { configureStore } from '@reduxjs/toolkit';
import factorySlice from '../slices/factorySlice';

// 1. Create a Redux Store
// 자동으로 Redux DevTools extension 설정 
export const store = configureStore({
  reducer: {
    factory : factorySlice.reducer
  },
});