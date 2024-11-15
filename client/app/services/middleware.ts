// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('accessToken')?.value || '';
  const isAuthPage = request.nextUrl.pathname.startsWith('/login') || 
                     request.nextUrl.pathname.startsWith('/register');

  // Si no hay token y no es una página de auth, redirige a login
  if (!token && !isAuthPage) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Si hay token y es una página de auth, redirige a dashboard
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

// Configurar las rutas que queremos proteger
export const config = {
  matcher: [
    '/dashboard',
    '/profile/:path*',
    '/settings/:path*',
    '/login',
    '/register'
  ]
};
