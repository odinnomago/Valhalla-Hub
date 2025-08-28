import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  // If there's a next parameter, use it as the redirect URL, otherwise go to dashboard
  const next = searchParams.get('next') ?? '/dashboard'

  if (code) {
    try {
      const { error } = await supabase.auth.exchangeCodeForSession(code)
      if (!error) {
        const forwardedHost = request.headers.get('x-forwarded-host') // original origin before load balancer
        const isLocalEnv = process.env.NODE_ENV === 'development'
        if (isLocalEnv) {
          // For local development, redirect to the local URL
          return NextResponse.redirect(`${origin}${next}`)
        } else if (forwardedHost) {
          return NextResponse.redirect(`https://${forwardedHost}${next}`)
        } else {
          return NextResponse.redirect(`${origin}${next}`)
        }
      } else {
        console.error('Auth exchange error:', error)
        return NextResponse.redirect(`${origin}/auth/login?error=auth_failed`)
      }
    } catch (error) {
      // If there's an error, redirect to an error page or login page
      console.error('Auth callback error:', error)
      return NextResponse.redirect(`${origin}/auth/login?error=callback_failed`)
    }
  }

  // No code parameter, redirect to login
  return NextResponse.redirect(`${origin}/auth/login?error=no_code`)
}