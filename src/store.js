import { configureStore, createSlice } from '@reduxjs/toolkit';
import pizzas from '../pizzaData'; // Импортируем данные о пиццах

// Начальное состояние для корзины
const initialCartState = { items: [], totalAmount: 0 };

// Начальное состояние для пользователя
const initialUserState = { user: JSON.parse(localStorage.getItem('user')) || null };

// Начальное состояние для пицц
const initialPizzaState = pizzas; // Устанавливаем массив пицц напрямую

// Слайс для управления корзиной
const cartSlice = createSlice({
    name: 'cart',
    initialState: initialCartState,
    reducers: {
        addItem(state, action) {
            const newItem = action.payload;
            const existingItem = state.items.find(item => item.id === newItem.id);
            if (!existingItem) {
                state.items.push({ ...newItem, quantity: 1 });
                state.totalAmount += newItem.price;
            } else {
                existingItem.quantity++;
                state.totalAmount += newItem.price;
            }
        },
        removeItem(state, action) {
            const id = action.payload;
            const existingItem = state.items.find(item => item.id === id);
            if (existingItem) {
                if (existingItem.quantity === 1) {
                    state.items = state.items.filter(item => item.id !== id);
                } else {
                    existingItem.quantity--;
                }
                state.totalAmount -= existingItem.price;
            }
        },
        clearCart(state) {
            state.items = [];
            state.totalAmount = 0;
        },
    }
});

// Слайс для управления пользователем
const userSlice = createSlice({
    name: 'user',
    initialState: initialUserState,
    reducers: {
        login(state, action) {
            state.user = action.payload;
            localStorage.setItem('user', JSON.stringify(state.user));
        },
        logout(state) {
            state.user = null;
            localStorage.removeItem('user');
        },
    }
});

// Слайс для управления пиццами
const pizzaSlice = createSlice({
    name: 'pizzas',
    initialState: initialPizzaState,
    reducers: {
        addPizza(state, action) {
            state.push(action.payload); // Добавить новую пиццу
        },
        editPizza(state, action) {
            const { id, updatedPizza } = action.payload;
            const pizzaIndex = state.findIndex(pizza => pizza.id === id);
            if (pizzaIndex !== -1) {
                state[pizzaIndex] = { ...state[pizzaIndex], ...updatedPizza }; // Обновить пиццу
            }
        },
        removePizza(state, action) {
            const id = action.payload;
            return state.filter(pizza => pizza.id !== id); // Удалить пиццу
        },
    }
});

// Конфигурация Redux store
export const store = configureStore({
    reducer: {
        cart: cartSlice.reducer,
        user: userSlice.reducer,
        pizzas: pizzaSlice.reducer,
    }
});

// Экспортируем действия для использования в компонентах
export const cartActions = cartSlice.actions;
export const userActions = userSlice.actions;
export const pizzaActions = pizzaSlice.actions;