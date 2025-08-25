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
    <div className="bg-gray-500 p-4 flex justify-between items-center">
      <div className="text-white text-2xl">
        <Link href="/">The Salty Devs</Link>
      </div>
      <div className="flex gap-4">
        <div>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Home</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <NavigationMenuLink>Home</NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>About</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <NavigationMenuLink>About</NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <DarkModeToggle />
      </div>
    </div>
  );
};

export default Navbar;
