import {configureStore} from '@reduxjs/toolkit';
import allPokemon from './slices/allPokemon';

export const store = configureStore({
  reducer: {
    pokedex: allPokemon,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
