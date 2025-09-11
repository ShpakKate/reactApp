import { Button } from 'shared/ui/Button';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

/** Компонент для тестирования Error Boundary */
export const BugButton = () => {
    const [error, setError] = useState<boolean>(false);
    const { t } = useTranslation();
    const onThrow = () => setError(true);

    useEffect(() => {
        if (error) {
            throw new Error();
        }
    }, [error]);

    return (
        <Button
            onClick={onThrow}
        >
            {t('Выдать ошибку')}
        </Button>
    );
};
