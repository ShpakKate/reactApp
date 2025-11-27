import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import React, {
    memo, useCallback, useEffect, useState,
} from 'react';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { LoginModal } from 'features/AuthByUserName';
import { useDispatch, useSelector } from 'react-redux';
import {
    getUserAuthData, isUserAdmin, isUserManager, userActions,
} from 'entities/User';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { Dropdown } from 'shared/ui/Popups/ui/Dropdown/Dropdown';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { HStack } from 'shared/ui/Stack';
import { NotificationButton } from 'features/NotificationButton';
import { AvatarDropDown } from 'features/AvatarDropDown';
import cls from './Navbar.module.scss';

interface NavbarProps {
    className?: string;
}

export const Navbar = memo(({ className }: NavbarProps) => {
    const { t } = useTranslation();
    const [isAuthModal, setIsAuthModal] = useState(false);
    const authData = useSelector(getUserAuthData);

    useEffect(() => {
        if (authData) {
            setIsAuthModal(false);
        }
    }, [authData]);

    const onCloseModal = useCallback(() => {
        setIsAuthModal(false);
    }, []);

    const onShowModal = useCallback(() => {
        setIsAuthModal(true);
    }, []);

    if (authData) {
        return (
            <header className={classNames(cls.Navbar, {}, [className])}>
                <Text className={cls.appName} title={t('Test React App')} theme={TextTheme.INVERTED} />
                <AppLink to={RoutePath.articles_create} theme={AppLinkTheme.SECONDARY}>
                    {t('Создать статью')}
                </AppLink>
                <HStack gap="16" className={cls.actions}>
                    <NotificationButton />
                    <AvatarDropDown />
                </HStack>
                {isAuthModal && <LoginModal isOpen={isAuthModal && !authData} onClose={onCloseModal} />}
            </header>
        );
    }

    return (
        <header className={classNames(cls.Navbar, {}, [className])}>
            <Button
                theme={ButtonTheme.CLEAR_INVERTED}
                className={cls.links}
                onClick={onShowModal}
            >
                {t('Войти')}
            </Button>
            {isAuthModal && <LoginModal isOpen={isAuthModal && !authData} onClose={onCloseModal} />}
        </header>
    );
});
