import { useTranslation } from 'react-i18next';
import { Button } from '@/shared/ui/Button';
import { useCounterActions } from '../model/slice/counterSlice';
import { useCounterSelector } from '../model/selectors/getCounterValue/getCounterValue';

export const Counter = () => {
    const counterValue = useCounterSelector();
    const { t } = useTranslation();
    const { increment, add, decrement } = useCounterActions();

    const handleInc = () => {
        increment();
    };

    const handleAdd = () => {
        add(5);
    };

    const handleDec = () => {
        decrement();
    };

    return (
        <div>
            <h1 data-testid="value-title">{counterValue}</h1>
            <Button onClick={handleInc} data-testid="increment-btn">
                {t('increment')}
            </Button>
            <Button onClick={handleAdd} data-testid="increment-btn">
                {t('add 5')}
            </Button>
            <Button data-testid="decrement-btn" onClick={handleDec}>
                {t('decrement')}
            </Button>
        </div>
    );
};
