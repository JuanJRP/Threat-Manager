import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  id: any;
  email: any;
  exp: any;
  iat: number;
  role: any[];
}

const decode = (token: string): DecodedToken => {
  return jwtDecode(token);
};

export default decode;
