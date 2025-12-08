import { useTranslation } from 'react-i18next';
import { Fragment, ReactNode, useState } from 'react';
import { Listbox as HListBox } from '@headlessui/react';
import { DropdownDirection } from '../../../../types/ui';
import { classNames } from '../../../../lib/classNames/classNames';
import { HStack } from '../../../Stack/HStack/HStack';
import { Button } from '../../../Button/Button';
import cls from './ListBox.module.scss';
import popupCls from '../../styles/popups.module.scss';
import { mapDirectionClass } from '../../styles/consts';

export interface ListBoxItem {
    value: string;
    content: ReactNode;
    disabled?: boolean;
}

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

export function ListBox(props: ListBoxProps) {
    const {
        items = [],
        className,
        value,
        defaultValue,
        readOnly,
        direction = 'bottom right',
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
                className={classNames('', {}, [className, popupCls.popup])}
                value={value}
                disabled={readOnly}
                onChange={onChange}
            >
                <HListBox.Button className={cls.trigger}>
                    <Button disabled={readOnly}>{value ?? defaultValue}</Button>
                </HListBox.Button>
                <HListBox.Options
                    className={classNames(cls.options, {}, optionClasses)}
                >
                    {items.map((item) => (
                        <HListBox.Option
                            key={item.value}
                            value={item.value}
                            disabled={item.disabled}
                            as={Fragment}
                        >
                            {({ active, selected }) => (
                                <li
                                    className={classNames(cls.item, {
                                        [popupCls.active]: active,
                                        [popupCls.disabled]: item.disabled,
                                    })}
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
