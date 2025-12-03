import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Avatar } from '@/shared/ui/Avatar';
import { Text } from '@/shared/ui/Text';
import { Skeleton } from '@/shared/ui/Skeleton';
import { AppLink, AppLinkTheme } from '@/shared/ui/AppLink';
import { VStack } from '@/shared/ui/Stack';
import { CommentItem } from '../../model/types/commentItem';
import cls from './CommentCard.module.scss';
import { getRouteProfile } from '@/shared/const/router';

interface CommentCardProps {
    className?: string;
    comment?: CommentItem;
    isLoading?: boolean;
}

export const CommentCard = memo((props: CommentCardProps) => {
    const { className, comment, isLoading } = props;

    if (isLoading) {
        return (
            <div className={classNames(cls.CommentCard, {}, [className, cls.loading])}>
                <div className={cls.header}>
                    <Skeleton height={30} width={30} border="50%" />
                    <Skeleton className={cls.username} height={16} width={100} />
                </div>
                <Skeleton height={50} width="100%" />
            </div>
        );
    }

    if (!comment) {
        return null;
    }

    return (
        <VStack gap="8" className={classNames(cls.CommentCard, {}, [className])}>
            <AppLink
                className={cls.header}
                theme={AppLinkTheme.SECONDARY}
                to={getRouteProfile(comment.user.id)}
            >
                {comment.user.avatar ? <Avatar src={comment.user.avatar} size={30} /> : null}
                <Text className={cls.username} title={comment.user.username} />
            </AppLink>
            <Text text={comment.text} />
        </VStack>
    );
});
