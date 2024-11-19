import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const loggedInRoutes = [
  "/",
  "/action-plan",
  "/asset-types",
  "/assets",
  "/controls",
  "/risk_type",
  "/risks",
  "/threats",
  "/vulnerability",
];

const loggedInAsAdminRoutes = [
  "/asset-types",
  "/assets",
  "/controls",
  "/risk_type",
  "/threats",
  "/vulnerability",
];

const loggedOutRoutes = ["/auth/login", "auth/register"];

export const myCookie = cookies();

const ProtectedRoutes = async (req: NextRequest): Promise<NextResponse> => {
  if (
    !loggedInRoutes.some((path) => req.nextUrl.pathname.startsWith(path)) &&
    !loggedOutRoutes.some((path) => req.nextUrl.pathname.startsWith(path))
  ) {
    return NextResponse.next();
  } else {
    let token: string | null = null;
    if (myCookie.get("jwt")) {
      token = myCookie.get("jwt")!.value;
    }

    if (
      !token &&
      loggedInAsAdminRoutes.some((path) =>
        req.nextUrl.pathname.startsWith(path)
      )
    ) {
      return NextResponse.redirect("/auth/login");
    } else if (
      token &&
      loggedOutRoutes.some((path) => req.nextUrl.pathname.startsWith(path))
    ) {
      return NextResponse.redirect("/");
    }
  }

  return NextResponse.next();
};

export default ProtectedRoutes;
