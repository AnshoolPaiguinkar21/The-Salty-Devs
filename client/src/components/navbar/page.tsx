import React from 'react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { DarkModeToggle } from '@/components/DarkModeToggle/page';
import Link from 'next/link';

const Navbar = () => {
  return (
    <div className="bg-gray-500 p-4 px-10 flex justify-between items-center gap-10">
      <div className="text-white text-3xl flex gap-4 items-center hover:text-blue-400">
        <Link href="/">The Salty Devs</Link>
      </div>
      <div>
        <NavigationMenu>
          <NavigationMenuList className="flex gap-10">
            <NavigationMenuItem>
              <NavigationMenuTrigger>Home</NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink>Home</NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <DarkModeToggle />
    </div>
  );
};

export default Navbar;
