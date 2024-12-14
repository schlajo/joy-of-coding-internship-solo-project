'use client';

import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation';
import classNames from 'classnames';

const Navbar = () => {
  const currentPath = usePathname();

  const links = [
    { label: 'All Tasks', href: '/tasks' },
    { label: 'Important', href: '/important' },
    { label: 'Completed', href: '/completed' },
    { label: 'Do It Now', href: '/do-it-now' },
  ];

  return (
    <nav className="bg-zinc-800 text-white h-14 flex items-center px-6 shadow-md">
      <ul className="flex space-x-6">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={classNames('hover:text-green-400', {
                'text-green-400': currentPath === link.href,
                'text-gray-300': currentPath !== link.href,
              })}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
