import { StateSchema } from 'app/providers/StoreProvider';
import { getProfilesLoading } from './getProfilesLoading';

describe('getProfileForm.test', () => {
    test('should return data', () => {
        const state: DeepPartial<StateSchema> = {
            profile: {
                isLoading: true,
            },
        };
        expect(getProfilesLoading(state as StateSchema)).toEqual(true);
    });

    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getProfilesLoading(state as StateSchema)).toEqual(undefined);
    });
});
