const initialState = {
    heroes: [],
    loadingStatus: 'idle',
}

const heroes = (state = initialState, action) => {
    switch (action.type) {
        case 'DATA_FETCHING':
            return {
                ...state,
                loadingStatus: 'loading'
            }
        case 'HEROES_FETCHED':
            return {
                ...state,
                heroes: action.payload,
                loadingStatus: 'idle'
            }
        case 'HERO_DELETE':
            return {
                ...state,
                heroes: state.heroes.filter(item => item.id !== action.payload)
            }
        case 'HERO_ADD':
            return {
                ...state,
                heroes: [...state.heroes, action.payload]
            }
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                loadingStatus: 'error'
            }
        default: return state
    }
}

export default heroes;