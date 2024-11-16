import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function updateSession(request: NextRequest) {
	// Add current path to headers
	const _headers = request.headers;
	_headers.set('x-pathname', request.nextUrl.pathname);

	let supabaseResponse = NextResponse.next({
		request: {
			...request,
			headers: _headers,
		},
	});

	const supabase = createServerClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!, {
		cookies: {
			getAll() {
				return request.cookies.getAll();
			},
			setAll(cookiesToSet) {
				cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
				supabaseResponse = NextResponse.next({
					request,
				});
				cookiesToSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options));
			},
		},
	});

	// refreshing the auth token
	await supabase.auth.getUser();

	return supabaseResponse;
}
