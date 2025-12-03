import {
    ImgHTMLAttributes, memo, ReactElement, useLayoutEffect, useState,
} from 'react';

interface AppImageProps extends ImgHTMLAttributes<HTMLImageElement>{
    className?: string;
    fallback?: ReactElement;
    errorFallback?: ReactElement;
}

export const AppImage = memo((props: AppImageProps) => {
    const {
        className,
        src,
        alt = 'image',
        fallback,
        errorFallback,
        ...ptherProps
    } = props;
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    useLayoutEffect(() => {
        const img = new Image();
        img.src = src || '';
        img.onload = () => setIsLoading(false);
        img.onerror = () => {
            setHasError(true);
            setIsLoading(false);
        };
    }, [src]);

    if (isLoading) {
        return fallback || null;
    }

    if (hasError) {
        return errorFallback || null;
    }

    return (
        <img className={className} src={src} alt={alt} {...ptherProps} />
    );
});
