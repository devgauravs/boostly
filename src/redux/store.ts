// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authReducer from './AuthSlice';
import rewardsReducer from './RewardsSlice/RewardsSlice';

// 1️⃣ Configure persistence
const persistConfig = {
  key: 'auth',
  storage: AsyncStorage,
  whitelist: ['token', 'user', 'userId', 'fcmToken', 'instagramtoken',
    'instagramuser',
    'facebooktoken',
    'facebookuser',
    'youtubetoken',
    'youtubeuser',
    'socialName'], 
};

// 2️⃣ Create persisted reducer
const persistedReducer = persistReducer(persistConfig, authReducer);

// 3️⃣ Create store with persisted reducer
export const store = configureStore({
  reducer: {
    auth: persistedReducer,
    rewards: rewardsReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
        ignoredActionsPaths: ['register'],
        ignoredPaths: ['_persist'],
      },
    }),
});

// 4️⃣ Create persistor
export const persistor = persistStore(store);

// 5️⃣ Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
