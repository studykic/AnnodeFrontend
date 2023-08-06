import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { removeCookie } from "../../Util/Cookie";

function usePatch(setGlobalMsg) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const patchReq = (requestObj) => {
    setLoading(true);

    console.log("Patch 요청 : ", requestObj);
    return axios
      .patch(requestObj.url, requestObj.requestBody, requestObj.config)
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

  return { loading, patchReq };
}

export default usePatch;
