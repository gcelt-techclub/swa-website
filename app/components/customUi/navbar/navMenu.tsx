'use client';

// Global imports
import React from "react";
import { useParams, usePathname } from "next/navigation";
import Link from "next/link";

// Local imports
import { cn } from "@/lib/utils";
import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuLink,
    navigationMenuTriggerStyle,
} from "@/app/components/ui/navigation-menu";



export function NavMenu({
    className,
    ...props
}: React.HTMLAttributes<HTMLElement>) {
    const pathname = usePathname();
    const params = useParams();

    // Details of Nav bar Routings
    const routes = [
        {
            href: `https://gcelt.gov.in`,
            label: 'GCELT',
            active: pathname === `/`
        },
        {
            href: `/`,
            label: 'HOME',
            active: pathname === `/`
        },
        {
            href: `/events`,
            label: 'EVENTS',
            active: pathname === `/events`
        },
        {
            href: `/gallery`,
            label: 'GALLERY',
            active: pathname === `/gallery`
        },
        {
            href: `/clubs`,
            label: 'CLUBS',
            active: pathname === `/clubs`
        },
        {
            href: `/union`,
            label: 'UNION MEMBERS',
            active: pathname === `/union`
        },
        {
            href: `/students`,
            label: 'STUDENTS',
            active: pathname === `/students`
        },
        // {
        //     href: `/rotaract`,
        //     label: 'RC_GCELT',
        //     active: pathname === `/rotaract`
        // },
        {
            href: `/contact`,
            label: 'CONTACTS',
            active: pathname === `/contact`
        },
    ];

    return (
        // It is used to merge the className we passed alomg with classname we include here : cn provided by shadcn ui
        <NavigationMenu className="hidden lg:block">
            <NavigationMenuList>
                <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
                    {routes.map((route) => (
                        <NavigationMenuItem key={route.href}>
                        <Link
                            key={route.href}
                            href={route.href}
                            legacyBehavior passHref
                            className={cn("text-sm font-medium transition-colors hover:text-primary",
                                route.active ? "text-black dark:text-white":"text-muted-foreground"
                            )}
                        >
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                {route.label}
                            </NavigationMenuLink>

                        </Link>
                    </NavigationMenuItem>
                    ))}
                </nav>
            </NavigationMenuList>
        </NavigationMenu>
    )
}