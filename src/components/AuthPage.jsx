import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { userActions } from '../store';
import { useNavigate } from 'react-router-dom'; // Импортируем useNavigate

const AuthPage = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isRegistering, setIsRegistering] = useState(false); // Состояние для переключения между входом и регистрацией
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Получаем navigate

    const submitHandler = (event) => {
        event.preventDefault();
        if (!name || !password) {
            setError('Пожалуйста, заполните все поля.');
            return;
        }

        if (isRegistering) {
            // Логика для регистрации
            dispatch(userActions.login({ name, role: 'user' })); // Пример регистрации
            setError('');
            navigate('/'); // Перенаправление на главную страницу
        } else {
            // Логика для входа
            if (name === 'admin' && password === 'admin') {
                dispatch(userActions.login({ name: 'admin', role: 'admin' }));
            } else {
                setError('Неправильное имя пользователя или пароль.');
                return;
            }
            setError('');
            navigate('/'); // Перенаправление на главную страницу
        }
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <form onSubmit={submitHandler} className="bg-white rounded-lg shadow-lg p-8 w-full max-w-sm">
                <h2 className="text-3xl font-bold">{isRegistering ? 'Регистрация' : 'Авторизация'}</h2>
                {error && <p className="text-red-500">{error}</p>}
                <div className="mt-4">
                    <input
                        type="text"
                        placeholder="Имя"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-md"
                    />
                </div>
                <div className="mt-4">
                    <input
                        type="password"
                        placeholder="Пароль"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-md"
                    />
                </div>
                <button
                    type="submit"
                    className="mt-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
                >
                    {isRegistering ? 'Зарегистрироваться' : 'Войти'}
                </button>
                <button
                    type="button"
                    onClick={() => setIsRegistering(!isRegistering)}
                    className="mt-4 w-full text-blue-500 hover:underline"
                >
                    {isRegistering ? 'Уже есть аккаунт? Войти' : 'Нет аккаунта? Зарегистрироваться'}
                </button>
            </form>
        </div>
    );
};

export default AuthPage;