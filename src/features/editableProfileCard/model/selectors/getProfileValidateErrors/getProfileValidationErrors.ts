import { StateSchema } from '@/app/providers/StoreProvider';
import { ValidateProfileError } from '../../../model/consts/consts';
import { getProfileValidateErrors } from './getProfileValidateErrors';

describe('getProfileValidateErrors.test', () => {
    test('should return data', () => {
        const errors = [
            ValidateProfileError.SERVER_ERROR,
            ValidateProfileError.INCORRECT_COUNTRY,
        ];

        const state: DeepPartial<StateSchema> = {
            profile: {
                validateErrors: errors,
            },
        };
        expect(getProfileValidateErrors(state as StateSchema)).toEqual(errors);
    });

    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getProfileValidateErrors(state as StateSchema)).toEqual(undefined);
    });
});
