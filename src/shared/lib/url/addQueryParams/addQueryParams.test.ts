import { getQueryParams } from '../addQueryParams/addQuaryParams';

describe('addQueryParams.test', () => {
    test('text with one param', () => {
        const params = getQueryParams({
            test: 'value',
        });

        expect(params).toBe('?test=value');
    });
    test('text with multiple params', () => {
        const params = getQueryParams({
            test: 'value',
            name: 'max',
        });

        expect(params).toBe('?test=value&name=max');
    });
    test('text with undefined', () => {
        const params = getQueryParams({
            test: 'value',
            name: undefined,
        });

        expect(params).toBe('?test=value');
    });
});
