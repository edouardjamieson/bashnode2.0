'use client';

import { signInWithProvider } from '@/supabase/auth/auth';

export default function Page() {
	const signup = () => {
		signInWithProvider('github');
	};

	return (
		<div>
			<button type="button" onClick={() => signup()}>
				singup
			</button>
		</div>
	);
}
