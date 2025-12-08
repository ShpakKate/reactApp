import { memo, useState } from 'react';
import { classNames } from '../../lib/classNames/classNames';
import cls from './StarRating.module.scss';
import StarIcon from '../../assets/icons/star.svg';
import { Icon } from '../../ui/Icon/Icon';

interface StarRatingProps {
    className?: string;
    onSelect?: (starsCount: number) => void;
    size?: number;
    selectedStars?: number;
}

const stars = [1, 2, 3, 4, 5];

export const StarRating = memo((props: StarRatingProps) => {
    const { className, onSelect, size = 30, selectedStars = 0 } = props;
    const [currentStarsCount, setCurrentStarsCount] = useState(selectedStars);
    const [isSelected, setIsSelected] = useState(Boolean(selectedStars));

    const onHover = (starsCount: number) => () => {
        if (!isSelected) {
            setCurrentStarsCount(starsCount);
        }
    };

    const onLeave = () => {
        if (!isSelected) {
            setCurrentStarsCount(0);
        }
    };

    const onClick = (starsCount: number) => () => {
        if (!isSelected) {
            onSelect?.(starsCount);
            setIsSelected(true);
            setCurrentStarsCount(starsCount);
        }
    };

    return (
        <div className={classNames(cls.StarRating, {}, [className])}>
            {stars.map((starNumber) => (
                <Icon
                    className={classNames(
                        cls.starIcon,
                        {
                            [cls.hovered]: currentStarsCount >= starNumber,
                            [cls.selected]: isSelected,
                        },
                        [],
                    )}
                    Svg={StarIcon}
                    key={starNumber}
                    height={size}
                    width={size}
                    onMouseEnter={onHover(starNumber)}
                    onMouseLeave={onLeave}
                    onClick={onClick(starNumber)}
                    data-testid={`StarRating.${starNumber}`}
                    data-selected={currentStarsCount >= starNumber}
                />
            ))}
        </div>
    );
});
