import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { userActions } from '../store';
import { FaSearch, FaSignOutAlt } from 'react-icons/fa';

const Header = ({ setSearchTerm }) => {
    const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch();

    const logoutHandler = () => {
        dispatch(userActions.logout());
    };

    return (
        <header className="flex items-center justify-between p-4 bg-gray-800 text-white shadow-md">
            <Link to="/" className="text-2xl font-bold hover:text-gray-300 transition duration-300">Пиццерия</Link>

            <div className="relative flex items-center">
                <FaSearch className="absolute left-3 text-gray-400" />
                <input
                    type="text"
                    placeholder="Поиск пиццы..."
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 px-4 py-2 border-2 border-gray-600 rounded-md focus:outline-none focus:border-blue-500 transition duration-300 text-gray-600"
                />
            </div>

            <div className="flex items-center space-x-4">
                {user ? (
                    <>
                        <span className="font-bold">Привет, {user.name}</span>
                        <Link to="/cart" className="text-blue-500 hover:underline transition duration-300">
                            Корзина
                        </Link>
                        {user.role === 'admin' && (
                            <Link to="/admin" className="text-blue-500 hover:underline transition duration-300">
                                Админка
                            </Link>
                        )}
                        <button
                            onClick={logoutHandler}
                            className="flex items-center bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition duration-300"
                        >
                            <FaSignOutAlt className="mr-2" /> Выйти
                        </button>
                    </>
                ) : (
                    <Link to="/auth" className="text-blue-500 hover:underline transition duration-300">
                        Войти
                    </Link>
                )}
            </div>
        </header>
    );
};

export default Header;