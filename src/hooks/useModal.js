import { useState } from "react";

function useModal(init) {
  const [modal, setModal] = useState(init);

  function setModalHook() {
    if (modal === "none") {
      setModal("block");
    } else {
      setModal("none");
    }
  }

  return [modal, setModalHook];
}

export default useModal;
