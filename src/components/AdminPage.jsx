import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { pizzaActions } from '../store';
import Modal from 'react-modal';


const AdminPage = () => {
    const dispatch = useDispatch();
    const pizzas = useSelector((state) => state.pizzas);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [currentPizza, setCurrentPizza] = useState({
        id: '',
        name: '',
        img: '',
        price: '',
        description: '',
        cookingTime: '',
    });

    const openModal = () => {
        setEditMode(false);
        setCurrentPizza({
            id: '',
            name: '',
            img: '',
            price: '',
            description: '',
            cookingTime: '',
        });
        setModalIsOpen(true);
    };

    const openEditModal = (pizza) => {
        setEditMode(true);
        setCurrentPizza(pizza);
        setModalIsOpen(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCurrentPizza((prevPizza) => ({
            ...prevPizza,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editMode) {
            dispatch(pizzaActions.editPizza({ id: currentPizza.id, updatedPizza: currentPizza }));
        } else {
            dispatch(pizzaActions.addPizza(currentPizza));
        }
        setModalIsOpen(false);
    };

    const handleDelete = (id) => {
        dispatch(pizzaActions.removePizza(id));
    };

    return (
        <div className="py-10">
            <h1 className="text-3xl font-bold mb-4">Управление пиццами</h1>
            <button onClick={openModal} className="mb-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                Добавить пиццу
            </button>
            <ul className="list-none">
                {pizzas.map((pizza) => (
                    <li key={pizza.id} className="flex justify-between items-center mb-2 bg-white p-4 rounded shadow">
                        <div>
                            <h2 className="text-xl font-bold">{pizza.name}</h2>
                            <p>{pizza.description}</p>
                        </div>
                        <div>
                            <button
                                onClick={() => openEditModal(pizza)}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
                            >
                                Редактировать
                            </button>
                            <button
                                onClick={() => handleDelete(pizza.id)}
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                            >
                                Удалить
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} ariaHideApp={false}>
                <h2 className="text-2xl font-bold mb-4">{editMode ? 'Редактировать пиццу' : 'Добавить пиццу'}</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Название пиццы"
                        value={currentPizza.name}
                        onChange={handleChange}
                        className="w-full mb-4 px-3 py-2 border rounded"
                        required
                    />
                    <input
                        type="text"
                        name="img"
                        placeholder="URL изображения"
                        value={currentPizza.img}
                        onChange={handleChange}
                        className="w-full mb-4 px-3 py-2 border rounded"
                        required
                    />
                    <input
                        type="number"
                        name="price"
                        placeholder="Цена"
                        value={currentPizza.price}
                        onChange={handleChange}
                        className="w-full mb-4 px-3 py-2 border rounded"
                        required
                    />
                    <input
                        type="text"
                        name="description"
                        placeholder="Описание"
                        value={currentPizza.description}
                        onChange={handleChange}
                        className="w-full mb-4 px-3 py-2 border rounded"
                        required
                    />
                    <input
                        type="text"
                        name="cookingTime"
                        placeholder="Время приготовления"
                        value={currentPizza.cookingTime}
                        onChange={handleChange}
                        className="w-full mb-4 px-3 py-2 border rounded"
                        required
                    />
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Сохранить
                    </button>
                </form>
                <button onClick={() => setModalIsOpen(false)} className="mt-4 text-red-500">Закрыть</button>
            </Modal>
        </div>
    );
};

export default AdminPage;