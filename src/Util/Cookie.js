import cookie from "react-cookies";

// 쿠키를 저장하는 함수
// export const setCookie = (name, value, option) => {
//   return cookie.save(name, value, { ...option });
// };

export const setCookie = (name, value) => {
  let expires = new Date();
  expires.setTime(expires.getTime() + 14 * 24 * 60 * 60 * 1000); // 만료일을 14일 후로 설정
  return cookie.save(name, value, { path: "/", expires });
};

// 쿠키를 가져오는 함수
// export const getCookie = (name) => {
//   return cookie.load(name);
// };
export const getCookie = (name) => {
  return cookie.load(name);
};

// 쿠키를 삭제하는 함수
export const removeCookie = (name) => {
  return cookie.remove(name);
};

// import { Cookies } from "react-cookie";

// const cookies = new Cookies();

// // 쿠키를 저장하는 함수
// export const setCookie = (name, value, option) => {
//   return cookies.set(name, value, { ...option });
// };

// // 쿠키를 가져오는 함수
// export const getCookie = (name) => {
//   return cookies.get(name);
// };

// // 쿠키를 삭제하는 함수
// export const removeCookie = (name, option) => {
//   return cookies.remove(name, { ...option });
// };
