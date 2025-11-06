import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Text } from 'shared/ui/Text/Text';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { getProfileReadOnly, profileActions, updateProfileData } from 'entities/Profile';
import { useCallback } from 'react';
import cls from './ProfilePageHeader.module.scss';

interface ProfilePageHeaderProps {
    className?: string;
}

export const ProfilePageHeader = ({ className }: ProfilePageHeaderProps) => {
    const { t } = useTranslation();

    const readOnly = useSelector(getProfileReadOnly);
    const dispatch = useDispatch();

    const onEdit = useCallback(() => {
        dispatch(profileActions.setReadOnly(false));
    }, [dispatch]);

    const onSave = useCallback(() => {
        dispatch(updateProfileData());
    }, [dispatch]);

    const onCancelEdit = useCallback(() => {
        dispatch(profileActions.cancelEdit());
    }, [dispatch]);

    return (
        <div className={classNames(cls.ProfilePageHeader, {}, [className])}>
            <Text title={t('Профиль')} />
            { readOnly ? (
                <Button theme={ButtonTheme.OUTLINE} onClick={onEdit}>
                    {t('Редактировать')}
                </Button>
            ) : (
                <div>
                    <Button theme={ButtonTheme.OUTLINE_RED} onClick={onCancelEdit}>
                        {t('Отменить')}
                    </Button>
                    <Button className={cls.saveBtn} theme={ButtonTheme.OUTLINE} onClick={onSave}>
                        {t('Сохранить')}
                    </Button>
                </div>
            )}
        </div>
    );
};
