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


dotenv.config()

const userService = new UserService();
const jwtService = new JwtService();

export default class AuthService {
  private readonly userService: UserService;
  private readonly jwtService: JwtService;
  constructor() {
    this.userService = userService;
    this.jwtService = jwtService;
  }
  async login(data: LoginUserInput): Promise<AuthTokens> {
    let user;
    if (data.username) user = await this.userService.getByKey("username", data.username);
    else user = await this.userService.getByKey("email", data.email);
    if (!user || !(await bcrypt.compare(data.password, user.password)))
      throw new HttpException(400, "Wrong credentials");
    const { id, email, role } = user;
    const { accessToken, refreshToken } = this.jwtService.genAuthTokens({ id, email, role });
    await this.userService.update(user.id, { refreshToken });
    return { accessToken, refreshToken };
  }
  async register(data: RegisterUserInput): Promise<AuthTokens> {
    const newUser = await this.userService.create(data);
    const { id, email, role } = newUser;
    const { accessToken, refreshToken } = this.jwtService.genAuthTokens({ id, email, role });
    await this.userService.update(newUser.id, { refreshToken });
    return { accessToken, refreshToken };
  }
  async refresh(refreshToken: string): Promise<{ accessToken: string }> {
    const user = await this.userService.getByKey("refreshToken", refreshToken);
    if (!user) throw new HttpException(403, "Forbidden");
    const decoded = await this.jwtService.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET as string
    );
    const isRolesMatch = user.role.every((role: Role) => decoded.role.includes(role));
    if (decoded.email !== user.email || !isRolesMatch)
      throw new HttpException(403, "Forbidden");
    const { accessToken } = this.jwtService.genAuthTokens({ email: user.email, role: user.role });
    return { accessToken };
  }
  async logout(refreshToken: string) {
    const user = await this.userService.getByKey("refreshToken", refreshToken);
    if (user) return await this.userService.update(user.id, { refreshToken: "" });
  }
}
