import { useSelector, useDispatch } from 'react-redux';
import { cartActions } from '../store';

const Cart = () => {
    const cartItems = useSelector((state) => state.cart.items);
    const totalAmount = useSelector((state) => state.cart.totalAmount);
    const dispatch = useDispatch();

    const removeItemHandler = (id) => {
        dispatch(cartActions.removeItem(id));
    };

    const clearCartHandler = () => {
        dispatch(cartActions.clearCart());
    };

    const orderHandler = () => {
        const user = useSelector((state) => state.user.user);
        alert(`Заказ для ${user.name} на сумму ${totalAmount} ₽`);
    };

    return (
        <div className="flex flex-col items-center py-4">
            <h2 className="text-3xl font-bold">Корзина</h2>
            {cartItems.length === 0 && <p className="text-center">Корзина пуста</p>}
            {cartItems.map((item) => (
                <div key={item.id} className="flex flex-row justify-between items-center py-2">
                    <h3 className="text-xl">{item.name}</h3>
                    <p className="text-lg">Количество: {item.quantity}</p>
                    <button
                        onClick={() => removeItemHandler(item.id)}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md"
                    >
                        Убрать
                    </button>
                </div>
            ))}
            <p className="text-2xl">Итоговая сумма: {totalAmount} ₽</p>
            <button
                onClick={orderHandler}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md"
            >
                Оформить заказ
            </button>
            <button
                onClick={clearCartHandler}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
            >
                Очистить корзину
            </button>
        </div>
    );
};

export default Cart;
