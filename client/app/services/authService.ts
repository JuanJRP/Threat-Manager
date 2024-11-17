import axios, { AxiosError, AxiosInstance } from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export interface LoginCredentials {
  username?: string;
  email?: string;
  password: string;
}

export interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}

export interface AuthResponse {
  accessToken: string;
}

class AuthService {
  private api: AxiosInstance;
  private refreshTokenTimeout?: NodeJS.Timeout;

  constructor() {
    this.api = axios.create({
      baseURL: API_URL,
      //withCredentials: true
    });

    // Interceptor para agregar el token a todas las peticiones
    this.api.interceptors.request.use((config) => {
      const token = this.getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // Interceptor para manejar errores de token y renovación automática
    this.api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        // Si el error es 401 y no es un intento de refresh
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            // Intentar renovar el token
            const newToken = await this.refreshAccessToken();
            
            if (newToken) {
              // Actualizar el token en el request original y reintentar
              this.setToken(newToken);
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
              return this.api(originalRequest);
            }
          } catch (refreshError) {
            // Si falla la renovación, limpiar la autenticación
            this.clearAuth();
            window.location.href = '/login';
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );
  }

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await this.api.post<AuthResponse>('/auth/login', credentials);
      this.setToken(response.data.accessToken);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    try {
      const response = await this.api.post<AuthResponse>('/auth/register', credentials);
      this.setToken(response.data.accessToken);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async logout(): Promise<void> {
    try {
      await this.api.post('/auth/logout');
      this.clearAuth();
    } catch (error) {
      // Incluso si hay error, limpiamos la auth local
      this.clearAuth();
      throw this.handleError(error);
    }
  }

  private async refreshAccessToken(): Promise<string> {
    try {
      const response = await this.api.post<AuthResponse>('/auth/refresh');
      return response.data.accessToken;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async verifyToken(): Promise<boolean> {
    try {
      const token = this.getToken();
      if (!token) return false;

      // Intenta hacer una petición protegida
      await this.getCurrentUser();
      return true;
    } catch (error) {
      return false;
    }
  }

  async getCurrentUser() {
    try {
      const response = await this.api.get('/auth/me');
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  private setToken(token: string): void {
    localStorage.setItem('accessToken', token);
  }

  private clearAuth(): void {
    localStorage.removeItem('accessToken');
    if (this.refreshTokenTimeout) {
      clearTimeout(this.refreshTokenTimeout);
    }
  }

  private handleError(error: unknown): Error {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<{ message: string }>;
      if (axiosError.response?.data?.message) {
        return new Error(axiosError.response.data.message);
      }
      return new Error(axiosError.message);
    }
    return new Error('An unexpected error occurred');
  }
}

export default new AuthService();