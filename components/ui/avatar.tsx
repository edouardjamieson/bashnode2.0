import { cn } from '@/lib/utils';
import Image from 'next/image';

interface AvatarProps {
	url: string;
	type: 'USER' | 'TEAM';
	className?: string;
}

const DEFAULT_TEAM_IMAGE_URL = '/images/dashboard/default-profile.svg';
const DEFAULT_USER_IMAGE_URL = '/images/dashboard/default-profile.svg';

function Avatar({ url, type, className }: AvatarProps) {
	return (
		<div className={cn('h-6 w-6 rounded-full overflow-hidden border-2 border-neutral-900', className)}>
			<Image
				className="w-full h-full object-cover object-center"
				width={100}
				height={100}
				alt=""
				src={url ? url : type == 'TEAM' ? DEFAULT_TEAM_IMAGE_URL : DEFAULT_USER_IMAGE_URL}
			/>
		</div>
	);
}

export { Avatar, type AvatarProps, DEFAULT_TEAM_IMAGE_URL, DEFAULT_USER_IMAGE_URL };
