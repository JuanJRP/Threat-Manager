import type { Role } from "@prisma/client";
import bcrypt from "bcrypt";
import UserService from "../user/user.services";
import { JwtService, type AuthTokens } from "../../services/JwtService";
import type {
  LoginUserInput,
  RegisterUserInput,
} from "../../validations/UserValidations";
import { HttpException } from "../../utils/HttpExceptions";
import dotenv from "dotenv";

dotenv.config();

const userService = new UserService();
const jwtService = new JwtService();

export default class AuthService {
  private readonly userService: UserService;
  private readonly jwtService: JwtService;
  constructor() {
    this.userService = userService;
    this.jwtService = jwtService;
  }

  async login(userData: LoginUserInput): Promise<AuthTokens> {
    let user;
    if (userData.username)
      user = await this.userService.getByKey("username", userData.username);
    else user = await this.userService.getByKey("email", userData.email);
    if (!user || !(await bcrypt.compare(userData.password, user.password)))
      throw new HttpException(401, "Credenciales incorrectas");
    const { email, role } = user;
    const { accessToken, refresh_token } = this.jwtService.genAuthTokens({
      email,
      role,
    });
    await this.userService.update(user.id, { refresh_token });
    return { accessToken, refresh_token };
  }

  async register(user: RegisterUserInput): Promise<AuthTokens> {
    const newUser = await this.userService.create(user);
    const { email, role } = newUser;
    const { accessToken, refresh_token } = this.jwtService.genAuthTokens({
      email,
      role,
    });
    await this.userService.update(newUser.id, { refresh_token });
    return { accessToken, refresh_token };
  }

  async refresh(refreshToken: string): Promise<{ accessToken: string }> {
    const user = await this.userService.getByKey("refresh_token", refreshToken);
    if (!user) throw new HttpException(403, "Forbidden");
    const decoded = await this.jwtService.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET as string
    );
    const isRoleMatch = user.role.every((role: Role) =>
      decoded.role.incldudes(role)
    );
    if (decoded.email !== user.email || !isRoleMatch)
      throw new HttpException(403, "Forbidden");
    const { accessToken } = this.jwtService.genAuthTokens({
      email: user.email,
      role: user.role,
    });
    return { accessToken };
  }

  async logout(refresToken: string) {
    const user = await this.userService.getByKey("refresh_token", refresToken);
    if (user)
      return await this.userService.update(user.id, { refresh_token: "" });
  }
}
