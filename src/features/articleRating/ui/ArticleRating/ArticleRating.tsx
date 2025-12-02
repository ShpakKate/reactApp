import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { RatingCard } from '@/entities/Rating';
import { useArticleRating, useRateArticle } from '../../api/articleRatingApi';
import { getUserAuthData } from '@/entities/User';
import { Skeleton } from '@/shared/ui/Skeleton';

export interface ArticleRatingProps {
    className?: string;
    articleId: string;
}

const ArticleRating = memo((props: ArticleRatingProps) => {
    const { className, articleId } = props;
    const { t } = useTranslation();
    const user = useSelector(getUserAuthData);

    const { data: articleRating, isLoading } = useArticleRating({
        userId: user?.id ?? '',
        articleId,
    });

    const [rateArticleMutation] = useRateArticle();

    const handleArticleMutation = useCallback((starsCount: number, feedback?: string) => {
        try {
            rateArticleMutation({
                userId: user?.id ?? '',
                articleId,
                rate: starsCount,
                feedback,
            });
        } catch (e) {
            console.log(e);
        }
    }, [articleId, rateArticleMutation, user?.id]);

    const onCancel = useCallback((starsCount: number) => {
        handleArticleMutation(starsCount);
    }, [handleArticleMutation]);

    const onAccept = useCallback((starsCount: number, feedback?: string) => {
        handleArticleMutation(starsCount, feedback);
    }, [handleArticleMutation]);

    if (isLoading) {
        return (
            <Skeleton width="100%" height={120} />
        );
    }

    const rating = articleRating?.[0];

    return (
        <RatingCard
            className={className}
            title={t('Оцените статью')}
            feedbackTitle={t('Оставьте свой отзыв о статье. Это поможет улучшить качество.')}
            hasFeedback
            rate={rating?.rate}
            onCancel={onCancel}
            onAccept={onAccept}
        />
    );
});

export default ArticleRating;
