import { getAuth, logOut } from '@/supabase/auth/auth';

export default async function Home() {
	const user = await getAuth();

	return (
		<div>
			<button type="button" onClick={logOut}>
				sign out
			</button>
		</div>
	);
}
