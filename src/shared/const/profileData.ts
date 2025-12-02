// eslint-disable-next-line @kate_shpak_07/path-checker/layer-imports
import { Profile } from '@/entities/Profile';
// eslint-disable-next-line @kate_shpak_07/path-checker/layer-imports
import { Currency } from '@/entities/Currency';
// eslint-disable-next-line @kate_shpak_07/path-checker/layer-imports
import { Country } from '@/entities/Country';

export const profile: Profile = {
    id: '1',
    first: 'admin',
    lastname: 'admin',
    age: 465,
    currency: Currency.USD,
    country: Country.Belarus,
    city: 'Moscow',
    username: 'admin213',
};
