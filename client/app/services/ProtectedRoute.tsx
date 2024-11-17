import { useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import authService from '@/app/services/authService';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Aquí puedes agregar una llamada a tu API para verificar si el token es válido
        const token = localStorage.getItem('accessToken');
        if (!token) {
          router.push('/login');
          return;
        }

        // Opcional: Verificar la validez del token con el backend
        await authService.verifyToken();
      } catch (error) {
        localStorage.removeItem('accessToken');
        router.push('/login');
      }
    };

    checkAuth();
  }, [router]);

  return <>{children}</>;
};

export default ProtectedRoute;