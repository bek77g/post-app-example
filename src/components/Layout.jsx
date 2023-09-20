import { Link, Outlet, useLocation } from 'react-router-dom';
import AddPost from './AddPost';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser, selectUser } from '../redux/features/userSlice';

function Layout() {
  const dispatch = useDispatch();
  const location = useLocation();
  const userData = useSelector(selectUser);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div className='layout'>
      <header className='header'>
        <nav>
          <Link to='/' className='link'>
            Главная
          </Link>
          {userData?.user ? (
            <>
              <span className='profile'>
                Привет, {userData.user?.username}!
              </span>
              <Link to='/change-pwd' className='link'>
                Изменить пароль
              </Link>
              <Link to='/' onClick={handleLogout} className='link'>
                Выйти
              </Link>
            </>
          ) : (
            <div className='buttons'>
              <Link to='/registration' className='button'>
                Регистрация
              </Link>
              <Link to='/login' className='button'>
                Вход
              </Link>
              <Link to='/forgot-pwd' className='button'>
                Сбросить пароль
              </Link>
            </div>
          )}
        </nav>
      </header>
      <div className='content'>
        <main className='main-content'>
          <Outlet />
        </main>
        <aside className='aside'>
          {userData?.user && location.pathname === '/' && <AddPost />}
        </aside>
      </div>
    </div>
  );
}

export default Layout;
