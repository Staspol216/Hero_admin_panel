import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    heroes: [],
    loadingStatus: 'idle',
}
//* Здесь также встроенная библиотека работает на иммутабельностью
const heroesSlice = createSlice({
    name: 'heroes',
    initialState,
    reducers: {
        dataFetching: state => {
            state.loadingStatus = 'loading'
        },
        heroesFetched: (state, action) => {
            state.loadingStatus = 'idle';
            state.heroes = action.payload;
        },
        heroesFetchingError: state => {
            state.loadingStatus = 'error'
        },
        heroAdd: (state, action) => {
            state.heroes.push(action.payload)
        },
        heroDelete: (state, action) => {
            state.heroes = state.heroes.filter(item => item.id !== action.payload)
        }
    }
});

const { actions, reducer } = heroesSlice;

export default reducer;

export const {
    dataFetching,
    heroesFetched,
    heroesFetchingError,
    heroAdd,
    heroDelete
} = actions;