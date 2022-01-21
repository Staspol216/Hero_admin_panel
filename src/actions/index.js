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

export const heroAdd = (heroes, newHero) => {
    return {
        type: 'HERO_ADD',
        payload: [...heroes, newHero]
    }
}

//*------------------FILTERS------------------------

export const filtersFetched = (filters) => {
    return {
        type: 'FILTERS_FETCHED',
        payload: filters
    }
}

export const selectedFilter = (filter) => {
    return {
        type: 'FILTER_SELECTED',
        payload: filter
    }
}