import { useTranslation } from 'react-i18next';
import { Fragment, ReactNode, useState } from 'react';
import { Listbox as HListBox } from '@headlessui/react';
import { classNames } from '../../lib/classNames/classNames';
import { HStack } from '../Stack/HStack/HStack';
import { Button } from '../Button/Button';
import cls from './ListBox.module.scss';

export interface ListBoxItem {
    value: string;
    content: ReactNode;
    disabled?: boolean;
}

type DropdownDirection = 'top' | 'bottom';

interface ListBoxProps {
    items: ListBoxItem[];
    className?: string;
    value?: string;
    defaultValue?: string;
    readOnly?: boolean;
    direction?: DropdownDirection;
    label?: string;
    onChange: (value: string) => void;
}

const mapDirectionClass: Record<DropdownDirection, string> = {
    bottom: cls.optionsBottom,
    top: cls.optionsTop,
};

export function ListBox(props: ListBoxProps) {
    const {
        items = [],
        className,
        value,
        defaultValue,
        readOnly,
        direction = 'bottom',
        label,
        onChange,
    } = props;
    const [selectedPerson, setSelectedPerson] = useState();
    const { t } = useTranslation();

    const optionClasses = [mapDirectionClass[direction]];

    return (
        <HStack gap="4">
            {label && <span>{`${label}>`}</span>}
            <HListBox
                as="div"
                className={classNames(cls.ListBox, {}, [className])}
                value={value}
                disabled={readOnly}
                onChange={onChange}
            >
                <HListBox.Button className={cls.trigger}>
                    <Button disabled={readOnly}>
                        {value ?? defaultValue}
                    </Button>
                </HListBox.Button>
                <HListBox.Options className={classNames(cls.options, {}, optionClasses)}>
                    {items.map((item) => (
                        <HListBox.Option
                            key={item.value}
                            value={item.value}
                            disabled={item.disabled}
                            as={Fragment}
                        >
                            {({ active, selected }) => (
                                <li className={classNames(
                                    cls.item,
                                    {
                                        [cls.active]: active,
                                        [cls.disabled]: item.disabled,
                                    },
                                )}
                                >
                                    {selected && '!!!'}
                                    {item.content}
                                </li>
                            )}
                        </HListBox.Option>
                    ))}
                </HListBox.Options>
            </HListBox>
        </HStack>

    );
}
