import './styles/index.scss';
import { Link } from 'react-router-dom';
import { useTheme } from './providers/ThemeProvider/lib/useTheme';
import { classNames } from 'shared/lib/classNames/classNames';
import { AppRouter } from 'app/providers/router';

const App = () => {
    const { theme, toggleTheme } = useTheme();
    console.log('theme', theme)
    return (
        <div className={ classNames('app', {}, [ theme ]) }>
            <button onClick={ toggleTheme }> TOGGLE </button>
            <Link to={'/'}> Главня страница </Link>
            <Link to={'/about'}> О сайте </Link>
            <AppRouter />
        </div>
  );
}

export default App;
