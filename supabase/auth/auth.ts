'use server';

import { redirect } from 'next/navigation';
import { createClient } from '../server';
import { Provider, SupabaseClient } from '@supabase/supabase-js';

export async function signInWithProvider(provider: Provider) {
	const sb = await createClient();
	const { data, error } = await sb.auth.signInWithOAuth({
		provider,
		options: {
			redirectTo: `${process.env.NEXT_PUBLIC_URL!}/auth/callback`,
		},
	});

	if (error || !data || !data.url) return false;
	redirect(data.url);
}

export async function logOut() {
	const sb = await createClient();
	await sb.auth.signOut();
	redirect('/sign-up');
}

export async function getAuth(sb?: SupabaseClient) {
	if (!sb) sb = await createClient();

	const {
		data: { user },
	} = await sb.auth.getUser();

	return user;
}
