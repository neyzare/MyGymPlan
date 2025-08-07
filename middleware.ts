import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname

  // Public paths that don't require authentication
  const isPublicPath = path === '/login' || path === '/inscription' || path === '/'
  const isPrivatePath = path === '/login' || path === '/inscription'

  // Get the token from the cookies
  const token = request.cookies.get('authToken')?.value || ''

  // If the user is not authenticated and trying to access a protected route
  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (token && isPrivatePath) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // If the user is authenticated and trying to access login/register page


  // Clone the request headers and add the token
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-url', request.url)
  if (token) {
    requestHeaders.set('Authorization', `Bearer ${token}`)
  }

  // Return the response with the modified headers
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
