'use server';

import { redirect } from 'next/navigation';
import { createClient } from '../server';
import { headers } from 'next/headers';
import { getAuth } from './auth';

type Props = {
	children: React.ReactNode;
};

export default async function AuthProvider({ children }: Props): Promise<any> {
	const sb = await createClient();
	const user = await getAuth(sb);
	const headersList = await headers();
	const path = headersList.get('x-pathname') ?? '';

	const noAuthRoutes = ['/sign-in', '/sign-up'];

	if (user && noAuthRoutes.includes(path)) redirect('/');
	if (!user && !noAuthRoutes.includes(path)) redirect('/sign-up');

	return children;
}
