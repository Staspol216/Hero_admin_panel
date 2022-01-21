
// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

import { useSelector } from "react-redux";
import { useState } from "react";
import cn from 'classnames';
import { selectedFilter } from "../../actions";
import { useDispatch } from "react-redux";



const HeroesFilters = (props) => {


    const [isActiveBtn, setIsActiveBtn] = useState(null);
    const { filters } = useSelector(state => state);
    const dispatch = useDispatch();



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

            return <button onClick={() => { setIsActiveBtn(id); onFilterSelect(name) }} key={id} className={btnClass}>{item.name}</button>
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