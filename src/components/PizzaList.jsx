import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '../store';
import pizzas from '../../pizzaData';
import { useMemo } from 'react';

const PizzaList = ({ searchTerm }) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);

    const addToCartHandler = (pizza) => {
        dispatch(cartActions.addItem(pizza));
    };

    const filteredPizzas = useMemo(() =>
        pizzas.filter((pizza) =>
            pizza.name.toLowerCase().includes(searchTerm.toLowerCase())
        ), [searchTerm]
    );

    return (
        <div className="py-10">
            <h1 className="text-3xl font-bold mb-4">Выберите пиццу</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPizzas.length > 0 ? (
                    filteredPizzas.map((pizza) => (
                        <div key={pizza.id} className="bg-white rounded-lg shadow-lg p-4">
                            <img src={pizza.img} alt={pizza.name} className="w-full h-40 mb-4 object-cover" />
                            <h3 className="text-2xl font-bold">{pizza.name}</h3>
                            <p className="text-gray-600">{pizza.description}</p>
                            <p className="text-xl font-bold mt-2">{pizza.price} ₽</p>
                            <p className="text-gray-600">{pizza.cookingTime}</p>
                            {user && (
                                <button
                                    onClick={() => addToCartHandler(pizza)}
                                    className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    Добавить в корзину
                                </button>
                            )}
                        </div>
                    ))
                ) : (
                    <p className="text-xl text-gray-600">Пиццы не найдены</p>
                )}
            </div>
        </div>
    );
};

export default PizzaList;