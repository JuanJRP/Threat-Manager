import jwt from "jsonwebtoken";
import { HttpException } from "../utils/HttpExceptions";
import dotenv from "dotenv";

dotenv.config();

export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};

const {
  ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRY,
  REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRY,
} = process.env as { [key: string]: string };

export class JwtService {
  genAuthTokens(payload: object): AuthTokens {
    const accessToken = this.sign(payload, ACCESS_TOKEN_SECRET, {
      expiresIn: ACCESS_TOKEN_EXPIRY,
    });
    const refreshToken = this.sign(payload, REFRESH_TOKEN_SECRET, {
      expiresIn: REFRESH_TOKEN_EXPIRY,
    });
    return { accessToken, refreshToken };
  }
  async verify(token: string, secret: string): Promise<jwt.JwtPayload> {
    const decoded: jwt.JwtPayload = await new Promise((resolve, reject) => {
      jwt.verify(token, secret, (err, decoded) => {
        if (err) reject(new HttpException(403, "Forbidden"));
        else resolve(decoded as jwt.JwtPayload);
      });
    });
    return decoded;
  }
  sign(payload: object, secret: string, options?: jwt.SignOptions): string {
    return jwt.sign(payload, secret, options);
  }
}
