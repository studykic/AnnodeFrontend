import { useState } from "react";

function useForm(initValue) {
  const [resultForm, setResultForm] = useState(initValue);

  // 인자를 하나만 사용하면 자동으로 name, value를 찾아서 매핑을하고
  // overLoading , value가 둘다 존재하면 key, value를 커스텀으로 처리한다
  const updateForm = (overLoading, value) => {
    if (overLoading && value === undefined) {
      setResultForm((prev) => ({ ...prev, [overLoading.target.name]: overLoading.target.value }));
    } else if (overLoading && value !== undefined) {
      setResultForm((prev) => ({ ...prev, [overLoading]: value }));
    } else {
      console.log("overLoading 이 없음");
    }
  };

  // initValue를 사용해서 특정 Form값을 초기화한다
  const resetEntry = (event) => {
    setResultForm((prev) => ({ ...prev, [event]: initValue[event] }));
  };

  // initValue를 사용해서 전체 Form값을 초기화한다
  const resetAll = () => {
    setResultForm(initValue);
  };

  return { resultForm, updateForm, resetEntry, resetAll };
}

export default useForm;
