import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Text } from 'shared/ui/Text/Text';
import { VStack } from 'shared/ui/Stack/VStack/VStack';
import { CommentCard } from '../CommentCard/CommentCard';
import { CommentItem } from '../../model/types/commentItem';

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
            <VStack gap="16" className={classNames('', {}, [className])}>
                <CommentCard isLoading={isLoading} />
                <CommentCard isLoading={isLoading} />
                <CommentCard isLoading={isLoading} />
            </VStack>
        );
    }

    return (
        <VStack gap="16" className={classNames('', {}, [className])}>
            {comments?.length
                ? comments.map((comment) => (
                    <CommentCard
                        key={comment.id}
                        comment={comment}
                        isLoading={isLoading}
                    />
                ))
                : <Text text={t('Комментрии отсутствуют')} />}
        </VStack>
    );
});
