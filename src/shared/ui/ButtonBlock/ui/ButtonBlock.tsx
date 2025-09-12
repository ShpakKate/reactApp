import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui/Button/Button';
import { ButtonHTMLAttributes, FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './ButtonBlock.module.scss';

export enum ThemeButton {
    CLEAR = 'clear',
    OUTLINE = 'outline',
}

interface ButtonBlockProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    theme?: ThemeButton;
}

export const ButtonBlock: FC<ButtonBlockProps> = (props: ButtonBlockProps) => {
    const {
        className,
        children,
        theme,
        ...otherProps
    } = props;
    const [count, setCount] = useState(0);
    const { t } = useTranslation();
    const changeCount = () => {
        setCount((prev) => ++prev);
    };
    return (
        <div className={classNames(cls.ButtoBlock, {}, [className])}>
            <div className={cls.textWrapper}>
                {count}
            </div>
            <Button
                className={classNames(cls.Button, { [cls[theme]]: true }, [className])}
                onClick={changeCount}
            >
                {t('Increase button')}
            </Button>
        </div>
    );
};
