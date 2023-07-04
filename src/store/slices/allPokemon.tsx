import {createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

export const listPokemonSlice = createSlice({
  name: 'pokedex',
  initialState: {
    results: [],
  },
  reducers: {
    resultado: (state, action) => {
      state.results = action.payload;
    },
  },
});

export const {resultado} = listPokemonSlice.actions;

export default listPokemonSlice.reducer;

export const fetchAllBanks = (dispatch: Function) => {
  axios
    .get(`https://dev.obtenmas.com/catom/api/challenge/banks`)
    .then((response: {data: []}) => {
      dispatch(resultado(response.data));
    })
    .catch((error: string) => console.log(error, 'error'));
};
