import { useTranslation } from 'react-i18next';
import { memo, ReactNode } from 'react';
import { DropdownDirection } from 'shared/types/ui';
import { Popover as HPopover } from '@headlessui/react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Popover.module.scss';
import { mapDirectionClass } from '../../styles/consts';
import popupCls from '../../styles/popups.module.scss';

interface PopoverProps {
    className?: string;
    trigger: ReactNode;
    direction?: DropdownDirection;
    children?: ReactNode;
}

export const Popover = memo((props: PopoverProps) => {
    const {
        className,
        trigger,
        direction = 'bottom right',
        children,
    } = props;
    const { t } = useTranslation();

    const menuClasses = [mapDirectionClass[direction]];

    return (
        <HPopover className={classNames('', {}, [className, popupCls.popup])}>
            <HPopover.Button className={popupCls.trigger}>
                {trigger}
            </HPopover.Button>
            <HPopover.Panel className={classNames(cls.panel, {}, menuClasses)}>
                {children}
            </HPopover.Panel>
        </HPopover>
    );
});
