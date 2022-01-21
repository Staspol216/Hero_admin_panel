import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage as FormikErrorMessage } from 'formik';
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import { heroAdd, dataFetching, filtersFetched, heroesFetchingError } from '../../actions';

import { useHttp } from '../../hooks/http.hook';


// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться

// Уникальный идентификатор персонажа можно сгенерировать через uiid

// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST

// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

const HeroesAddForm = () => {

    const { heroes, filters } = useSelector(state => state);
    const dispatch = useDispatch();
    const { request } = useHttp();

    useEffect(() => {
        dispatch(dataFetching());
        request("http://localhost:3001/filters")
            .then(data => dispatch(filtersFetched(data)))
            .catch(() => dispatch(heroesFetchingError()))

        // eslint-disable-next-line
    }, []);

    const renderOptions = (arr) => {
        const optionElements = arr.map(({ name }, i) => {
            if (name === 'Все') return;
            return <option value={name} key={i}>{name}</option>
        })
        return (
            <>
                <option value="">Ваш элемент...</option>
                {optionElements}
            </>
        )
    }


    const onCreateNewHero = (values) => {
        const newHero = {
            id: uuidv4(),
            ...values
        }
        request("http://localhost:3001/heroes", "POST", JSON.stringify(newHero))
            .then(res => console.log(res, 'Отправка успешна'))
            .then(dispatch(heroAdd(heroes, newHero)))
            .catch(err => console.log(err))
    }

    const optionElements = renderOptions(filters);

    return (
        <Formik
            initialValues={{
                name: '',
                description: '',
                element: ''
            }}

            validationSchema={Yup.object({
                name: Yup.string()
                    .min(2, 'Минимум два символа')
                    .required('Обязательное поле'),
                description: Yup.string().required('Обязательное поле'),
                element: Yup.string()
                    .required()
            })}

            onSubmit={values => onCreateNewHero(values)}>
            <Form className="border p-4 shadow-lg rounded">
                <div className="mb-3">
                    <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                    <Field
                        required
                        type="text"
                        name="name"
                        className="form-control"
                        id="name"
                        placeholder="Как меня зовут?"
                    />
                    <FormikErrorMessage className="error" name="name" component='div' />
                </div>
                <div className="mb-3">
                    <label htmlFor="text" className="form-label fs-4">Описание</label>
                    <Field
                        required
                        name="description"
                        className="form-control"
                        id="text"
                        placeholder="Что я умею?"
                        style={{ "height": '130px' }}
                    />
                    <FormikErrorMessage className="error" name="text" component='div' />
                </div>
                <div className="mb-3">
                    <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                    <Field
                        required
                        className="form-select"
                        id="element"
                        name="element"
                        as='select'
                    >
                        <>
                            {optionElements}
                        </>
                    </Field>
                    <FormikErrorMessage className="error" name="element" component='div' />
                </div>

                <button type="submit" className="btn btn-primary">Создать</button>
            </Form>
        </Formik >
    )
}

export default HeroesAddForm;