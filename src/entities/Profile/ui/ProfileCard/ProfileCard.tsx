import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Text, TextAlign, TextTheme } from 'shared/ui/Text/Text';
import { Input } from 'shared/ui/Input/Input';
import { Loader } from 'shared/ui/Loader/Loader';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Currency, CurrencySelect } from 'entities/Currency';
import { Country, CountrySelect } from 'entities/Country';
import { Profile } from '../../model/types/profile';
import cls from './ProfileCard.module.scss';

interface ProfileCardProps {
    className?: string;
    data?: Profile;
    isLoading?: boolean;
    error?: string;
    readOnly?: boolean;
    onChangeFirstName?: (value?: string) => void;
    onChangeLastName?: (value?: string) => void;
    onChangeAge?: (value?: string) => void;
    onChangeCity?: (value?: string) => void;
    onChangeUserName?: (value?: string) => void;
    onChangeAvatar?: (value?: string) => void;
    onChangeCurrency?: (value?: Currency) => void;
    onChangeCountry?: (value?: Country) => void;
}

export const ProfileCard = (props: ProfileCardProps) => {
    const { t } = useTranslation('profile');
    const {
        className,
        data,
        isLoading,
        error,
        readOnly,
        onChangeFirstName,
        onChangeLastName,
        onChangeAge,
        onChangeCity,
        onChangeUserName,
        onChangeAvatar,
        onChangeCurrency,
        onChangeCountry,
    } = props;

    if (isLoading) {
        return (
            <div className={classNames(cls.ProfileCard, {}, [className, cls.loading])}>
                <Loader />
            </div>
        );
    }

    if (error) {
        return (
            <div className={classNames(cls.ProfileCard, {}, [className, cls.error])}>
                <Text
                    theme={TextTheme.ERROR}
                    title={t('Произошла ошибка при загрузке профиля')}
                    text={t('Попробуйте обновить страницу')}
                    align={TextAlign.CENTER}
                />
            </div>
        );
    }

    const mods: Mods = {
        [cls.editing]: !readOnly,
    };

    return (
        <div className={classNames(cls.ProfileCard, mods, [className])}>
            <div>
                <div className={cls.data}>
                    {data?.avatar && (
                        <div className={cls.avatarWrapper}>
                            <Avatar src={data.avatar} alt="" />
                        </div>
                    )}
                    <Input
                        value={data?.first}
                        placeholder={t('Ваше имя')}
                        className={cls.input}
                        onChange={onChangeFirstName}
                        readOnly={readOnly}
                    />
                    <Input
                        value={data?.lastname}
                        placeholder={t('Ваше фамилия')}
                        className={cls.input}
                        onChange={onChangeLastName}
                        readOnly={readOnly}
                    />
                    <Input
                        value={data?.age}
                        placeholder={t('Ваш возраст')}
                        className={cls.input}
                        onChange={onChangeAge}
                        readOnly={readOnly}
                        type="number"
                        max={120}
                    />
                    <Input
                        value={data?.city}
                        placeholder={t('Ваш город')}
                        className={cls.input}
                        onChange={onChangeCity}
                        readOnly={readOnly}
                    />
                    <Input
                        value={data?.username}
                        placeholder={t('Ваш имя пользователя')}
                        className={cls.input}
                        onChange={onChangeUserName}
                        readOnly={readOnly}
                    />
                    <Input
                        value={data?.avatar}
                        placeholder={t('Введите ссылку на аватар')}
                        className={cls.input}
                        onChange={onChangeAvatar}
                        readOnly={readOnly}
                    />
                    <CurrencySelect
                        className={cls.input}
                        value={data?.currency}
                        onChange={onChangeCurrency}
                        readOnly={readOnly}
                    />
                    <CountrySelect
                        className={cls.input}
                        value={data?.country}
                        onChange={onChangeCountry}
                        readOnly={readOnly}
                    />
                </div>
            </div>
        </div>
    );
};
