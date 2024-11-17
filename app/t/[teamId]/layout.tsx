import Dashboard from '@/components/core/dashboard';
import { getAuth } from '@/supabase/auth/auth';

type Props = {
	children: React.ReactNode;
};

export default async function Layout({ children }: Props) {
	const user = await getAuth();
	console.log(user);

	return <Dashboard user={user}>{children}</Dashboard>;
}
