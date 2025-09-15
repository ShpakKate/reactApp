import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Modal } from 'shared/ui/Modal';
import React, { useCallback, useState } from 'react';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import cls from './Navbar.module.scss';

interface NavbarProps {
    className?: string;
}

export const Navbar = ({ className }: NavbarProps) => {
    const { t } = useTranslation();
    const [isAuthModal, setIsAuthOpen] = useState(false);
    const onToggleModal = useCallback(() => {
        setIsAuthOpen((prev) => !prev);
    }, []);

    return (
        <div className={classNames(cls.Navbar, {}, [className])}>
            <Button
                className={cls.links}
                theme={ButtonTheme.CLEAR_INVERTED}
                onClick={onToggleModal}
            >
                {t('Войти')}
            </Button>
            <Modal isOpen={isAuthModal} onClose={() => setIsAuthOpen(false)}>
                Модуль ИИ-ассистент предназначен для поддержки:
                - заказчиков в торгах в части подбора критериев оценки предложений со
                стороны поставщиков и распределения веса между ними (доп. к модулю Торги)
                - заказчиков в торгах в части подбора поставщиков (доп. к модулю Торги)
            </Modal>
        </div>
    );
};
