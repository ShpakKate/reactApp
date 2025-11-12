import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Text } from 'shared/ui/Text/Text';
import { CommentCard } from '../CommentCard/CommentCard';
import { CommentItem } from '../../model/types/commentItem';
import cls from './CommentList.module.scss';

interface CommentListProps {
    className?: string;
    comments?: CommentItem[];
    isLoading?: boolean;
}

export const CommentList = memo((props: CommentListProps) => {
    const { t } = useTranslation('article-details');
    const {
        className,
        comments,
        isLoading,
    } = props;

    if (isLoading) {
        return (
            <div className={classNames(cls.CommentList, {}, [className])}>
                <CommentCard isLoading={isLoading} />
                <CommentCard isLoading={isLoading} />
                <CommentCard isLoading={isLoading} />
            </div>
        );
    }

    return (
        <div className={classNames(cls.CommentList, {}, [className])}>
            {comments?.length
                ? comments.map((comment) => (
                    <CommentCard
                        key={comment.id}
                        className={cls.comment}
                        comment={comment}
                        isLoading={isLoading}
                    />
                ))
                : <Text text={t('Комментрии отсутствуют')} />}
        </div>
    );
});
