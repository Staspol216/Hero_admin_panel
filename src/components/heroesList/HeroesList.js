import { useHttp } from '../../hooks/http.hook';
import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { dataFetching, heroesFetched, heroesFetchingError, heroDelete } from '../../actions';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE

const HeroesList = () => {
    const { heroes, loadingStatus, activeFilter } = useSelector(state => state);
    const dispatch = useDispatch();
    const { request } = useHttp();

    useEffect(() => {
        dispatch(dataFetching());
        request("http://localhost:3001/heroes")
            .then(data => dispatch(heroesFetched(data)))
            .catch(() => dispatch(heroesFetchingError()))

        // eslint-disable-next-line
    }, []);

    //* Функция передается ниже по иерархии как проперти и чтобы каждый раз не вызывать перерендеринг дочерних компонентов, все это мы помещаем в UseCallback
    const onDeleteHero = useCallback((id) => {
        request(`http://localhost:3001/heroes/${id}`, "DELETE")
            .then(data => console.log(data, 'deleted'))
            .then(dispatch(heroDelete(id)))
            .catch(err => console.log(err));

        // eslint-disable-next-line
    }, [request])

    if (loadingStatus === "loading") {
        return <Spinner />;
    } else if (loadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Героев пока нет</h5>
        }

        return arr.map(({ id, ...props }) => {
            return <HeroesListItem onDelete={() => onDeleteHero(id)} key={id} {...props} />
        })
    }

    const filterPost = (items, filter) => {
        console.log(items);
        if (filter === "Все") return items
        return items.filter(item => item.element === filter)
    }

    const element = renderHeroesList(filterPost(heroes, activeFilter));

    return (
        <ul>
            {element}
        </ul>
    )
}

export default HeroesList;