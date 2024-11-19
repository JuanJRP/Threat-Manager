import { SERVER_URL } from "../utils/envFiles";
import { useAuthStore } from "../store/authStore";
import { useMutation, useQuery } from "@tanstack/react-query";
import api from "../utils/axiosCfg";
import { decode } from "punycode";

interface LoginData {
  username: string;
  password: string;
}

interface RegisterData extends LoginData {
  email: string;
  first_name: string;
  last_name: string;
}

export const getUser = async (email: string | null) => {
  const res = await api.get(`${SERVER_URL}/users/email/${email}`);

  return res.data;
};

const login = async (credentials: LoginData) => {
  const res = await api.post(`${SERVER_URL}/auth/login`, credentials);

  return res.data;
};

const register = async (user: RegisterData) => {
  const res = await api.post(`${SERVER_URL}/auth/register`, user);

  return res.data;
};

const refreshToken = async () => {
  const res = await api.post(`${SERVER_URL}/auth/refresh`);

  return res.data;
};

export const logout = async () => {
  await api.post(`${SERVER_URL}/auth/logout`);
};

export const useLogin = () => {
  const setIsAutenticated = useAuthStore((state) => state.setIsAuthenticated);
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const accessToken = useAuthStore((state) => state.accessToken);

  return useMutation({
    mutationFn: login,
    onSuccess(data) {
      setIsAutenticated(true);
      setAccessToken(data.accessToken);

      console.log(data);
    },
    onError() {
      setIsAutenticated(false);
    },
  });
};

export const useRegister = () => {
  const setIsAutenticated = useAuthStore((state) => state.setIsAuthenticated);
  return useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      setIsAutenticated(true);
      console.log(data);
    },
  });
};

export const useRefresToken = () => {
  return useQuery({
    queryKey: ["refreshToken"],
    queryFn: refreshToken,
    refetchInterval: 1000 * 60 * 15,
  });
};
