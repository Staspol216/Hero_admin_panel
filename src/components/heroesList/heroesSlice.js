import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { useHttp } from "../../hooks/http.hook";

const initialState = {
    heroes: [],
    loadingStatus: 'idle',
}

//* Мемоизированные функции внутри createAsyncThunk Не рабоают, useHttp обернутый в useCallback исправляем

export const fetchHeroes = createAsyncThunk(
    'heroes/fetchHeroes',
    //* Данная функция принимает два аргумента
    //* Первый аргумент это то, что приходит при диспатче, например id
    //* Второй аргумент = ThunkAPI (payloadCreator)
    () => {
        const { request } = useHttp();
        return request("http://localhost:3001/heroes");
    }
)
//* Здесь также встроенная библиотека работает на иммутабельностью
const heroesSlice = createSlice({
    name: 'heroes',
    initialState,
    reducers: {
        heroAdd: (state, action) => {
            state.heroes.push(action.payload)
        },
        heroDelete: (state, action) => {
            state.heroes = state.heroes.filter(item => item.id !== action.payload)
        }
    },
    //* pending - когда запрос только формируется/отправляется, то мы будем делать какие то определенные действия
    //* Data полученные с promis'a (данные от сервера) автоматически переходят в action.payload
    extraReducers: (builder) => {
        builder
            .addCase(fetchHeroes.pending, state => {state.loadingStatus = 'loading'})
            .addCase(fetchHeroes.fulfilled, (state, action) => {
                state.loadingStatus = 'idle';
                state.heroes = action.payload;
            })
            .addCase(fetchHeroes.rejected, state => {
                state.loadingStatus = 'error';
            })
            .addDefaultCase(() => {})
    }
});

const { actions, reducer } = heroesSlice;

export default reducer;

export const {
    heroAdd,
    heroDelete
} = actions;