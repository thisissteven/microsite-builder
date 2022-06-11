import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
	const { pathname, origin } = req.nextUrl;
	const { token } = req.cookies;
	const authenticatedRoutes = ["/profile", "/links", "/microsite"];
	if (authenticatedRoutes.includes(pathname) && token === undefined) {
		return NextResponse.redirect(`${origin}/`);
	}
}
