import { StateSchema } from '@/app/providers/StoreProvider';

export const getProfilesLoading = (state: StateSchema) => state?.profile?.isLoading;
