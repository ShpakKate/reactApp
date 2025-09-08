import { classNames } from 'shared/lib/classNames/classNames';
import cls from './LangSwitcher.module.scss'; // Без фигурных скобок!
import { useTranslation } from 'react-i18next';
import { Button } from 'shared/ui/Button';
import { ThemeButton } from 'shared/ui/Button/ui/Button';

interface LangSwitcherProps {
    className?: string;
}

export const LangSwitcher = ({className}: LangSwitcherProps) => {
    const { t, i18n } = useTranslation();
    const toggle = () => {
        i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru').then()
    }


    const langSwitcherClass = cls?.LangSwitcher || '';

    return (
        <Button
            className={classNames(langSwitcherClass, {}, [className])}
            theme={ThemeButton.CLEAR}
            onClick={toggle}
        >
            {t('Язык')}
        </Button>
    )
};
