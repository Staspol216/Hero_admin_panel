const initialState = {
    heroes: [],
    loadingStatus: 'idle',
    filters: [],
    filtersLoadingStatus: 'idle',
    activeFilter: 'Все'
}

const reducer = (state = initialState, action) => {
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
                heroes: action.payload
            }
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                loadingStatus: 'error'
            }
        case 'FILTERS_FETCHING':
            return {
                ...state,
                filtersLoadingStatus: 'loading'
            }
        case 'FILTER_SELECTED':
            return {
                ...state,
                activeFilter: action.payload
            }
        case 'FILTERS_FETCHED':
            return {
                ...state,
                filters: action.payload,
                filtersLoadingStatus: 'idle'
            }
        default: return state
    }
}

export default reducer;