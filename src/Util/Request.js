// axios 요청에 사용되는 클래스이며
// axios는 프로미스 객체만을 반환하고 값의 처리는 Request의 콜백함수에게 응답값을 넘겨서 위임한다.
class Request {
  url;
  config;
  requestBody;
  successCallback;
  errorCallback;
  finalCallback;

  constructor(endpoint, config, reqBody, handleSuccess, handleError, handleFinal) {
    if (arguments.length !== 6) {
      throw new Error("Request 클래스의 인자가 비어있습니다.");
    }

    this.url = process.env.REACT_APP_API_BASE_URL ? `${process.env.REACT_APP_API_BASE_URL}${endpoint}` : `${process.env.REACT_APP_LOCAL_URL}${endpoint}`;
    this.config = config;
    this.requestBody = reqBody;
    this.successCallback = handleSuccess;
    this.errorCallback = handleError;
    this.finalCallback = handleFinal;
  }
}

export default Request;
