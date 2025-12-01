'use client'
import { EIconColor } from '@/modules/shared/icons/type/icon-type'
import { Button } from '@/components/ui/button'
import { MessageIcon, PeopleIcon, ProfileIcon, FeedIcon } from '@/modules/shared'

import React, { useState } from 'react'
import Link from 'next/link'

interface SideBarItemProps {
    path: 'people' | 'messages' | 'profile' | 'feed';
    label: string;
}

export default function SideBarItem({ path, label }: SideBarItemProps) {
    const [isHovered, setIsHovered] = useState(false);
    const iconColor = isHovered ? EIconColor.RED : EIconColor.DARK;

    return (
        <Link href={`/network/${path}`} passHref >
            <Button
                variant="ghost"
                className={`justify-start w-full gap-2  `}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {
                    path === 'people' && <PeopleIcon size={50} color={iconColor} />
                }
                {
                    path === 'messages' && <MessageIcon size={50} color={iconColor} />
                }
                {
                    path === 'profile' && <ProfileIcon size={50} color={iconColor} />
                }
                {
                    path === 'feed' && <FeedIcon size={50} color={iconColor} />
                }
                <p className={`text-xs ${isHovered ? 'text-primary' : 'text-dark'} font-bold`}>{label}</p>
            </Button>
        </Link>
    )
}
