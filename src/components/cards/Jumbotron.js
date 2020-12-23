import React from "react";
import Typewriter from "typewriter-effect";

// what ever text you want to show with this typewritter- effect pass it as props
// since it has one element we use (), if we want to use {} we need to use return ().
const Jumbotron = ({ text }) => (
  <Typewriter
    options={{
      strings: text,
      autoStart: true,
      loop: true,
    }}
  />
);

export default Jumbotron;
