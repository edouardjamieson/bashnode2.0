'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown, LogOut, Settings } from 'lucide-react';
import { User } from '@supabase/supabase-js';
import { Avatar } from '@/components/ui/avatar';
import { logOut } from '@/supabase/auth/auth';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

type Props = {
	children: React.ReactNode;
	user: User | null;
};

const dashboardNavigation = [
	{
		path: '',
		name: 'Home',
	},
	{
		path: 'servers',
		name: 'Servers',
	},
	{
		path: 'scripts',
		name: 'Scripts',
	},
	{
		path: 'usage',
		name: 'Usage',
	},
	{
		path: 'settings',
		name: 'Settings',
	},
];

export default function Dashboard({ children, user }: Props) {
	if (!user) return null;

	const path = usePathname() + '/';
	const currentPathName = path.split('/')[path.split('/').length - 1];

	return (
		<main className="w-full h-screen bg-neutral-50 flex flex-col overflow-hidden">
			{/* Header */}
			<header className="w-full px-4 border-b border-neutral-200 bg-white">
				{/* Main menu */}
				<div className="w-full flex items-center py-2">
					{/* Logo */}
					<Link href={'/'}>
						<Image src="/images/logo-icon.png" width={300} height={300} alt="Bashnode" className="w-8" />
					</Link>

					{/* Team selector */}
					<div className="h-4 bg-neutral-300 rotate-[30deg] w-[2px] mx-3"></div>
					<DropdownMenu>
						<DropdownMenuTrigger className="flex items-center gap-2 group transition-all hover:bg-neutral-100 px-2 py-1.5 rounded-md">
							<Avatar type="TEAM" url="" />
							<span className="text-sm font-medium text-neutral-500 transition-all group-hover:text-neutral-900">My team</span>
							<ChevronDown size={18} className="text-neutral-300" />
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuItem>yo</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>

					{/* Profile */}
					<DropdownMenu>
						<DropdownMenuTrigger className="ml-auto rounded-full">
							<Avatar type="TEAM" url={user.user_metadata.avatar_url} className="w-8 h-8" />
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end" className="min-w-[200px]">
							<DropdownMenuLabel>{user.user_metadata.full_name}</DropdownMenuLabel>
							<DropdownMenuSeparator />

							{/* Settings */}
							<DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
								<Settings size={20} className="text-neutral-500" />
								<span>Settings</span>
							</DropdownMenuItem>

							{/* Logout */}
							<DropdownMenuSeparator />
							<DropdownMenuItem className="flex items-center gap-2 cursor-pointer" onClick={logOut}>
								<LogOut size={20} className="text-red-500" />
								<span>Sign out</span>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
				{/* Main navigation */}
				<nav className="w-full flex items-center gap-2">
					{dashboardNavigation.map((n) => {
						const active = n.path == currentPathName;
						return (
							<Link
								key={n.path}
								href={`/t/xd/${n.path}`}
								className={cn('group py-2 px-1 border-b border-transparent', {
									'border-neutral-900': active,
								})}
							>
								<span
									className={cn('text-sm transition-all px-2 py-1 rounded-md text-neutral-500 font-medium', {
										'group-hover:bg-neutral-100 group-hover:text-neutral-900': !active,
										'text-neutral-900': active,
									})}
								>
									{n.name}
								</span>
							</Link>
						);
					})}
				</nav>
			</header>

			{/* Content */}
			<div className="w-full h-full p-6 overflow-auto">
				<div className="mx-auto w-full max-w-[1400px]">{children}</div>
			</div>
		</main>
	);
}
