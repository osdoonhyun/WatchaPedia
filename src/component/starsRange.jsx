import React, { useState } from 'react';

const StarsRange = () => {
  const [stars, setStars] = useState(0);

  const onInput = (event) => {
    const v = event.target.value;
    setStars(v);
  };
  return (
    <div>
      <input type='range' min='0.5' max='5' step='0.5' value='0' onInput={onInput} />
      <div>{stars}</div>
    </div>
  );
};

export default StarsRange;
