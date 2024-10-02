import { configureStore } from '@reduxjs/toolkit';
import UserReducer from "./reducers/user";
import fileListReducer from "./reducers/fileList";
import fileReducer from "./reducers/file"
import { useDispatch, useSelector } from 'react-redux';

export const store = configureStore({
  reducer: {
    user: UserReducer,
    files: fileListReducer,
    file: fileReducer
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>()

