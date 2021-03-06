
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import cn from 'classnames';


import { selectedFilter, fetchFilters } from "./filtersSlice";
import { useDispatch } from "react-redux";
import { useHttp } from "../../hooks/http.hook";
import Spinner from '../spinner/Spinner';



const HeroesFilters = () => {

    const { request } = useHttp();

    const [isActiveBtn, setIsActiveBtn] = useState(null);
    const { filters, filtersLoadingStatus } = useSelector(state => state.filters);
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(fetchFilters(request));

        // eslint-disable-next-line
    }, []);

    if (filtersLoadingStatus === "loading") {
        return <Spinner />;
    } else if (filtersLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }


    const onFilterSelect = (filterName) => {
        dispatch(selectedFilter(filterName));
    }

    const renderBtns = (arr) => {
        return arr.map((item) => {
            const { id, name } = item;
            let btnType = '';
            switch (name) {
                case 'Огонь':
                    btnType = 'danger'
                    break;
                case 'Вода':
                    btnType = 'primary'
                    break;
                case 'Ветер':
                    btnType = 'success'
                    break;
                case 'Земля':
                    btnType = 'secondary'
                    break;
                default:
                    btnType = 'outline-dark'
                    break;
            }
            const btnClass = cn('btn', `btn-${btnType}`, {
                'active': isActiveBtn === id
            })

            return <button onClick={() => { setIsActiveBtn(id); onFilterSelect(name) }} key={id} className={btnClass}>{name}</button>
        })
    }

    const filterBtns = renderBtns(filters)

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {filterBtns}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;