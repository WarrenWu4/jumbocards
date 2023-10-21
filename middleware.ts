import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";

const middleware = async(req: NextRequest) => {
    const res = NextResponse.next();

    // create middlewareclient for supabase
    const supabase = createMiddlewareClient({req, res})

    // get user from supabase
    const { data: { user } } = await supabase.auth.getUser()

    // if user is not logged in redirect to login page
    if(!user && req.nextUrl.pathname !== "/login") {
        return NextResponse.redirect(new URL("/login", req.url))
    }

    return res
}

export default middleware
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}