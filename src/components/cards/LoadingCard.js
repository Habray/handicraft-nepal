import React from "react";
import { Card, Skeleton } from "antd";

const LoadingCard = ({ count }) => {
  const cards = () => {
    let totalCards = [];

    // each time for loop loops it will return arry of skeleton loading card
    for (let i = 0; i < count; i++) {
      totalCards.push(
        <Card className="col-md-3" key={i}>
          <Skeleton active ></Skeleton>
        </Card>
      );
    }

    return totalCards;
  };

  // return the loading cards in a row
  return <div className="row pb-5">{cards()}</div>;
};

export default LoadingCard;
