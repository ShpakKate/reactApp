import './styles/index.scss';
import { Link, Route, Routes } from 'react-router-dom';
import { Suspense } from 'react';
import { useTheme } from './providers/ThemeProvider/lib/useTheme';
import { classNames } from 'shared/lib/classNames/classNames';
import { AboutPage } from 'pages/AboutPage';
import { MainPage } from 'pages/MainPage';

const App = () => {
    const { theme, toggleTheme } = useTheme();
    console.log('theme', theme)
    return (
        <div className={ classNames('app', {}, [ theme ]) }>
            <button onClick={ toggleTheme }> TOGGLE </button>
            <Link to={'/'}> Главня страница </Link>
            <Link to={'/about'}> О сайте </Link>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path={'/about'} element={<AboutPage />}/>
                    <Route path={'/'} element={<MainPage />}/>
                </Routes>
            </Suspense>
        </div>
  );
}

export default App;
