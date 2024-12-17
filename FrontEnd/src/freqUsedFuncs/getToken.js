import { jwtDecode } from "jwt-decode";

const getTokenFromCookies = () => {
  const cookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith("jwt="));
  return cookie ? cookie.split("=")[1] : null;
};
export default getTokenFromCookies;
