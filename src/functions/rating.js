import React from "react";
import StarRating from "react-star-ratings";

export const showAverage = (p) => {

  // make sure we get the ratings
  if (p && p.ratings) {

    // ratings array from backend
    let ratingsArray = p && p.ratings;

    // to store all the reting from individual products in array
    let total = [];

    // how many ratings we have
    let length = ratingsArray.length;
    console.log("length", length);

    // all the products rating we map though each of them and store/push to total array
    ratingsArray.map((r) => total.push(r.star));

    // adding the values of total array with reduce
    // reduce works as it will add previouse(p) and next(n) value. 
    // Eg. in 1 4 6 7 if 1st iteration it will add 1 & 4 in 2nd 5 & 6 and so on
    // [1, 4, 6, 7]
    // 1 + 4 = 5
    // 5 + 6 = 11
    // 11 + 7 = 18
    let totalReduced = total.reduce((p, n) => p + n, 0); // 0 is intital value here
    console.log("totalReduced", totalReduced);

    // for highest possible result, i.e. if everyone give 5 star rating
    let highest = length * 5;
    console.log("highest", highest);

    // calculating average rating with total value in array * 5 by highet possible value
    let result = (totalReduced * 5) / highest;
    console.log("result", result);

    return (

      // display average star value with StarRating plugin
      <div className="text-center pt-1 pb-3">
        <span>
          <StarRating
              starDimension="20px"
              starSpacing="2px"
              starRatedColor="red"
              rating={result}
              editing={false}
          />{" "}
          ({p.ratings.length})
        </span>
      </div>
    );
  }
};
