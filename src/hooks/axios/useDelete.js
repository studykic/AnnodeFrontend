import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { removeCookie } from "../../Util/Cookie";

function useDelete(setGlobalMsg) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const deleteReq = (requestObj) => {
    setLoading(true);

    console.log("delete 요청 : ", requestObj);
    return axios
      .delete(requestObj.url, requestObj.config)
      .then((res) => {
        requestObj?.successCallback?.(res);
      })
      .catch((error) => {
        requestObj?.errorCallback?.(error);

        if (error.response.data) {
          const newErrorMessage = error.response.data;
          setGlobalMsg((prev) => [...prev, newErrorMessage]);
        }
        if (error.response.status === 401) {
          removeCookie("anonode_jwt");
          navigate("/");
        }
      })
      .finally(() => {
        requestObj?.finalCallback?.();
        setLoading(false);
      });
  };

  return { loading, deleteReq };
}

export default useDelete;
