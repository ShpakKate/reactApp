import { useCallback, useMemo, useState } from 'react';

interface UseHoverBind {
    onMouseEnter: () => void,
    onLeaveEnter: () => void,
}

type UseHoverResult = [boolean, UseHoverBind];

export const useHover = () => {
    const [isHover, setState] = useState(false);

    const onMouseEnter = useCallback(() => {
        setState(true);
    }, []);

    const onMouseLeave = useCallback(() => {
        setState(false);
    }, []);

    return useMemo(() => [isHover, { onMouseEnter, onMouseLeave }], [isHover, onMouseEnter, onMouseLeave]);
};
