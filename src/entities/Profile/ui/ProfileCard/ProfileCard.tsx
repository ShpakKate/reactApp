import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getProfileData } from 'entities/Profile/model/selectors/getProfileData/getProfileData';
import { getProfilesLoading } from 'entities/Profile/model/selectors/getProfilesLoading/getProfilesLoading';
import { getProfileError } from 'entities/Profile/model/selectors/getProfileError/getProfileError';
import { Text } from 'shared/ui/Text/Text';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import cls from './ProfileCard.module.scss';

interface ProfileCardProps {
    className?: string;
}

export const ProfileCard = ({ className }: ProfileCardProps) => {
    const { t } = useTranslation('profile');
    const data = useSelector(getProfileData);
    const isLoading = useSelector(getProfilesLoading);
    const error = useSelector(getProfileError);

    return (
        <div className={classNames(cls.ProfileCard, {}, [className])}>
            <div>
                <Text title={t('Профиль')} />
                <Button theme={ButtonTheme.OUTLINE}>
                    {t('Редактировать')}
                </Button>
                <div className={cls.data}>
                    <Input value={data?.first} placeholder={t('Ваше имя')} className={cls.input} />
                    <Input value={data?.lastname} placeholder={t('Ваше фамилия')} className={cls.input} />
                </div>
            </div>
        </div>
    );
};
