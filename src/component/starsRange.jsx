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

{
  /* <input type=“range”>는 슬라이드 바를 조정하여 범위 내의 숫자를 선택할 수 있는 입력 필드를 정의합니다.
기본 범위는 0부터 100까지이지만, 다음 속성들과 함께 사용하면 그 범위를 설정할 수 있습니다.
- max : <input> 요소의 최댓값을 명시함.
- min : <input> 요소의 최솟값을 명시함.
- step : <input> 요소에 입력할 수 있는 숫자들 사이의 간격을 명시함.
- value : <input> 요소의 초깃값을 명시함. */
}
