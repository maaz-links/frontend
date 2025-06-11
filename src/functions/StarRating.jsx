export const StarRating = ({ rating, size = 'text-[24px]' }) => {
    // Ensure rating is between 0 and 5
    const clampedRating = Math.min(Math.max(parseFloat(rating) || 0), 5);
    const fullStars = Math.floor(clampedRating);
    const hasHalfStar = clampedRating % 1 >= 0.5 && clampedRating % 1 <= 0.99;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
        <p className={`${size} text-[#BDBDBD] flex items-center`}>
            {/* Full stars */}
            {[...Array(fullStars)].map((_, i) => (
                <span key={`full-${i}`} className="text-yellow-500">★</span>
            ))}

            {/* Half star */}
            {hasHalfStar && (
                <span className="relative" style={{ width: '1em' }}>
                    <span className="absolute overflow-hidden text-yellow-500" style={{ width: '45%' }}>★</span>
                    <span className="text-[#BDBDBD]">★</span>
                </span>
            )}

            {/* Empty stars */}
            {[...Array(emptyStars)].map((_, i) => (
                <span key={`empty-${i}`} className="text-[#BDBDBD]">★</span>
            ))}

            {/* Optional numeric value */}
            <span className="ml-1 text-sm text-[#BDBDBD]">({clampedRating.toFixed(1)})</span>
        </p>
    );
};