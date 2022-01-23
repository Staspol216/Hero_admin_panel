

export const fetchFilters = (request) => (dispatch) => {
    dispatch(filtersFetching());
    request("http://localhost:3001/filters")
        .then(data => dispatch(filtersFetched(data)))
        .catch(() => dispatch(filtersFetchingError()))
}

export const fetchHeroes = (request) => (dispatch) => {
    dispatch(dataFetching());
    request("http://localhost:3001/heroes")
        .then(data => dispatch(heroesFetched(data)))
        .catch(() => dispatch(heroesFetchingError()))
}

//*---------------------HEROES---------------
export const dataFetching = () => {
    return {
        type: 'DATA_FETCHING'
    }
}

export const heroesFetched = (heroes) => {
    return {
        type: 'HEROES_FETCHED',
        payload: heroes
    }
}


export const heroesFetchingError = () => {
    return {
        type: 'HEROES_FETCHING_ERROR'
    }
}

export const heroDelete = (id) => {
    return {
        type: 'HERO_DELETE',
        payload: id
    }
}

export const heroAdd = (newHero) => {
    return {
        type: 'HERO_ADD',
        payload: newHero
    }
}

//*------------------FILTERS------------------------

export const filtersFetching = () => {
    return {
        type: 'FILTERS_FETCHING',
    }
}

export const filtersFetched = (filters) => {
    return {
        type: 'FILTERS_FETCHED',
        payload: filters
    }
}

export const filtersFetchingError = () => {
    return {
        type: 'FILTERS_FETCHING_ERROR'
    }
}

export const selectedFilter = (filter) => {
    return {
        type: 'FILTER_SELECTED',
        payload: filter
    }
}


// export const selectedFilter = (filter) => (dispatch) => {
//     setTimeout(() => {
//         dispatch({
//             type: 'FILTER_SELECTED',
//             payload: filter
//         })
//     })
// }