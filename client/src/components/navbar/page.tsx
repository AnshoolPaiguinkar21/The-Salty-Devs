import React from 'react';
import DarkModeToggle from '@/components/DarkModeToggle/page';
import Link from 'next/link';

const Navbar = () => {
  return (
    <div className="bg-gray-500 p-4 px-10 flex justify-between items-center gap-10">
      <div className="text-white text-3xl flex gap-4 items-center hover:text-blue-400">
        <Link href="/">The Salty Devs</Link>
      </div>
      <nav>
        <ul className="flex gap-10">
          <li>
            <Link
              href="/"
              className="text-white hover:text-blue-400 transition-colors"
            >
              Home
            </Link>
          </li>
        </ul>
      </nav>
      <DarkModeToggle />
    </div>
  );
};

export default Navbar;
