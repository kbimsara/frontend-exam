import React from 'react';
import { Star } from 'lucide-react';

const StarRating = ({ rating, showValue = true, size = 'sm' }) => {
  const iconSize = size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4';

  return (
    <div className="flex items-center gap-1">
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            className={`${iconSize} ${
              i <= Math.floor(rating)
                ? 'fill-amber-400 text-amber-400'
                : i - 0.5 <= rating
                ? 'fill-amber-400/40 text-amber-400'
                : 'text-slate-200'
            }`}
          />
        ))}
      </div>
      {showValue && (
        <span className="text-xs text-slate-400 ml-0.5 tabular-nums">{rating}</span>
      )}
    </div>
  );
};

export default StarRating;
