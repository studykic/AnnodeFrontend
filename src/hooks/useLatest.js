import { useRef, useState } from "react";

// latestValueRef는 항상 즉시 변경되는 상태값을 가리킨다.
function useLatest(initialValue) {
  const [value, setValue] = useState(initialValue);
  const latestValueRef = useRef(initialValue);

  // newValue는 함수표현식이거나, 값이다.
  function setValueAndUpdateLatest(newValue) {
    // newValue가 함수인 경우
    if (typeof newValue === "function") {
      setValue((prevValue) => {
        const updatedValue = newValue(prevValue);
        latestValueRef.current = updatedValue;
        return updatedValue;
      });
    } else {
      // newValue가 값인 경우
      latestValueRef.current = newValue;
      setValue(newValue);
    }
  }

  return [value, setValueAndUpdateLatest, latestValueRef];
}

export default useLatest;
