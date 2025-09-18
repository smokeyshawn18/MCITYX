export default function middleware(request) {
  const { pathname } = request.nextUrl;

  // Handle canonical URL enforcement
  const url = request.nextUrl.clone();

  // Force HTTPS in production
  if (process.env.NODE_ENV === "production" && url.protocol === "http:") {
    url.protocol = "https:";
    return Response.redirect(url, 301);
  }

  // Handle www to non-www redirect
  if (url.hostname.startsWith("www.")) {
    url.hostname = url.hostname.replace("www.", "");
    return Response.redirect(url, 301);
  }

  // Handle trailing slashes - remove them for consistency
  if (pathname !== "/" && pathname.endsWith("/")) {
    url.pathname = pathname.slice(0, -1);
    return Response.redirect(url, 301);
  }

  // Handle case sensitivity - lowercase URLs
  if (pathname !== pathname.toLowerCase()) {
    url.pathname = pathname.toLowerCase();
    return Response.redirect(url, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
