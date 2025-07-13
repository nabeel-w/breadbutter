import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { gigsSlice } from "./slices/gigsSlice";
import { talentSlice } from "./slices/talentSlice";

const rootReducer = combineReducers({
    gigs: gigsSlice.reducer,
    talent: talentSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
