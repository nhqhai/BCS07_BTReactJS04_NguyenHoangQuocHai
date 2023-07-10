import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  // reducer
  reducer: {
    hoTen: (state = 'Minh Quân', action) => {
      // arrow function nhận vào 2 tham số, state và action, khi bắn dispatch từ component lên redux cần phải có check xem nên lắng nghe dispatch nào bằng cách check type
      if (action.type == 'DOITEN') {
        state = action.payload;
      }
      return state;
    },
  },
});
