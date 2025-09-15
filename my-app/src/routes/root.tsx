// import { Link, Outlet, useLocation } from 'react-router-dom';
// import { getTasks } from '../forStorage';
// import '../index.css';

// export async function loader() {
//     const tasks = await getTasks();
//     return { tasks };
// }

// function Root() {
//     const location = useLocation();

//     // Функция для проверки активной ссылки
//     const isActive = (path: string) => {
//         return location.pathname.includes(path);
//     };

//     return (
//         <>
//             <nav>
//                 <Link to={`/entrance/1`} className={isActive('entrance') ? 'active' : ''}>Войти</Link>
//                 <Link to={`/dashboard/2`} className={isActive('dashboard') ? 'active' : ''}>Без авторизации</Link>
//             </nav>
//             <main>
//                 <Outlet />
//             </main>
//         </>
//     );
// }

// export default Root;




import { Link, Outlet, useLocation } from 'react-router-dom';
import { getTasks } from '../forStorage';
import '../index.css';

export async function loader() {
    const tasks = await getTasks();
    return { tasks };
}

function Root() {
    const location = useLocation();

    // Функция для проверки активной ссылки
    const isActive = (path: string) => {
        return location.pathname === path;
    };

    return (
        <>
            <nav>
                <Link to="/" className={isActive('/') ? 'active' : ''}>Войти</Link>
                <Link to="/dashboard/2" className={isActive('/dashboard/2') ? 'active' : ''}>Попробовать без авторизации</Link>
            </nav>
            <main>
                <Outlet />
            </main>
        </>
    );
}

export default Root;