import { Counter } from './components/Counter';
import './index.scss';

const App = () => {
    return (
        <div className="app">
            Hello
            <button className='button'> Button </button>
            <Counter />
        </div>
  );
}

export default App;
