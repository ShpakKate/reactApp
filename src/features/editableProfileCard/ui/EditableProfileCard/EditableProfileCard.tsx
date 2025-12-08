import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text, TextTheme } from '@/shared/ui/Text';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { Currency } from '@/entities/Currency';
import { Country } from '@/entities/Country';
import { ProfileCard } from '@/entities/Profile';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { VStack } from '@/shared/ui/Stack';
import { ValidateProfileError } from '../../model/consts/consts';
import { EditableProfileCardHeader } from '../EditableProfileCardHeader/EditableProfileCardHeader';
import { getProfileForm } from '../../model/selectors/getProfileForm/getProfileForm';
import { getProfilesLoading } from '../../model/selectors/getProfilesLoading/getProfilesLoading';
import { getProfileError } from '../../model/selectors/getProfileError/getProfileError';
import { getProfileReadOnly } from '../../model/selectors/getProfileReadOnly/getProfileReadOnly';
import { fetchProfileData } from '../../model/services/fetchProfileData/fetchProfileData';
import { profileActions, profileReducer } from '../../model/slice/profileSlice';
import { getProfileValidateErrors } from '../../model/selectors/getProfileValidateErrors/getProfileValidateErrors';

const reducers: ReducersList = {
    profile: profileReducer,
};

interface EditableProfileCardProps {
    className?: string;
    id?: string;
}

export const EditableProfileCard = memo((props: EditableProfileCardProps) => {
    const { className, id } = props;
    const { t } = useTranslation('profile');
    const dispatch = useAppDispatch();

    const formData = useSelector(getProfileForm);
    const isLoading = useSelector(getProfilesLoading);
    const error = useSelector(getProfileError);
    const readOnly = useSelector(getProfileReadOnly);
    const validateErrors = useSelector(getProfileValidateErrors);

    const validateErrorTranslates = {
        [ValidateProfileError.SERVER_ERROR]: t(
            'Серверная ошибка при сохранении',
        ),
        [ValidateProfileError.INCORRECT_COUNTRY]: t('Некорректный регион'),
        [ValidateProfileError.NO_DATA]: t('Данные не указаны'),
        [ValidateProfileError.INCORRECT_USER_DATA]: t(
            'Имя и фамилия обязательны',
        ),
        [ValidateProfileError.INCORRECT_AGE]: t('Некорректный возраст'),
    };

    useInitialEffect(() => {
        if (id) {
            dispatch(fetchProfileData(id));
        }
    });

    const onChangeFirstName = useCallback(
        (value?: string) => {
            dispatch(profileActions.updateProfile({ first: value || '' }));
        },
        [dispatch],
    );

    const onChangeLastName = useCallback(
        (value?: string) => {
            dispatch(profileActions.updateProfile({ lastname: value || '' }));
        },
        [dispatch],
    );

    const onChangeAge = useCallback(
        (value?: string) => {
            const numericValue = value?.replace(/[^\d]/g, '').slice(0, 3);

            if (numericValue === '') {
                dispatch(profileActions.updateProfile({ age: 0 }));
            } else {
                const age = Number(numericValue || 0);
                if (age <= 120) {
                    dispatch(profileActions.updateProfile({ age }));
                }
            }
        },
        [dispatch],
    );

    const onChangeCity = useCallback(
        (value?: string) => {
            dispatch(profileActions.updateProfile({ city: value || '' }));
        },
        [dispatch],
    );

    const onChangeUserName = useCallback(
        (value?: string) => {
            dispatch(profileActions.updateProfile({ username: value || '' }));
        },
        [dispatch],
    );

    const onChangeAvatar = useCallback(
        (value?: string) => {
            dispatch(profileActions.updateProfile({ avatar: value || '' }));
        },
        [dispatch],
    );

    const onChangeCurrency = useCallback(
        (currency?: Currency) => {
            dispatch(profileActions.updateProfile({ currency }));
        },
        [dispatch],
    );

    const onChangeCountry = useCallback(
        (country?: Country) => {
            dispatch(profileActions.updateProfile({ country }));
        },
        [dispatch],
    );

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <VStack gap="8" max className={classNames('', {}, [className])}>
                <EditableProfileCardHeader />
                {validateErrors &&
                    validateErrors.map((err) => (
                        <Text
                            key={err}
                            theme={TextTheme.ERROR}
                            text={validateErrorTranslates[err]}
                            data-testid="EditableProfileCard.Error"
                        />
                    ))}
                <ProfileCard
                    data={formData}
                    isLoading={isLoading}
                    error={error}
                    readOnly={readOnly}
                    onChangeFirstName={onChangeFirstName}
                    onChangeLastName={onChangeLastName}
                    onChangeAge={onChangeAge}
                    onChangeCity={onChangeCity}
                    onChangeUserName={onChangeUserName}
                    onChangeAvatar={onChangeAvatar}
                    onChangeCurrency={onChangeCurrency}
                    onChangeCountry={onChangeCountry}
                />
            </VStack>
        </DynamicModuleLoader>
    );
});
