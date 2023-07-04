import {combineReducers} from '@reduxjs/toolkit';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from './store';
import ListPokemon from './slices/allPokemon';

const rootReducer = combineReducers({
  allPokemon: ListPokemon,
});

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default rootReducer;
