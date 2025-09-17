import { counterReducer, CounterSchema } from 'entities/Counter';
import { counterActions } from 'entities/Counter/model/slice/counterSlice';

describe('counterSlice.test', () => {
    test('decrement', () => {
        const state: CounterSchema = { value: 10 };

        expect(
            counterReducer(state as CounterSchema, counterActions.decrement),
        ).toEqual({ value: 9 });
    });

    test('increment', () => {
        const state: CounterSchema = { value: 10 };

        expect(
            counterReducer(state as CounterSchema, counterActions.increment),
        ).toEqual({ value: 11 });
    });

    test('should work with empty state', () => {
        expect(
            counterReducer(undefined, counterActions.increment),
        ).toEqual({ value: 1 });
    });
});
