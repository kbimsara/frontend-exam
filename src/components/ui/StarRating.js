import React from 'react';
import { Star } from 'lucide-react';

const StarRating = ({ rating, showValue = true }) => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) {
      stars.push(
        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
      );
    } else if (i - 0.5 <= rating) {
      stars.push(
        <Star key={i} className="w-4 h-4 fill-amber-400/50 text-amber-400" />
      );
    } else {
      stars.push(
        <Star key={i} className="w-4 h-4 text-slate-300" />
      );
    }
  }

  return (
    <div className="flex items-center gap-1">
      <div className="flex">{stars}</div>
      {showValue && (
        <span className="text-sm text-slate-500 ml-1">({rating})</span>
      )}
    </div>
  );
};

export default StarRating;
