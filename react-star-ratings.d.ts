declare module 'react-star-ratings' {
  import React from 'react';

  interface StarRatingsProps {
    rating: number;
    starRatedColor?: string;
    starEmptyColor?: string;
    starHoverColor?: string;
    numberOfStars?: number;
    name?: string;
    starDimension?: string;
    starSpacing?: string;
    changeRating?: (newRating: number, name?: string) => void;
  }

  const StarRatings: React.FC<StarRatingsProps>;

  export default StarRatings;
}
