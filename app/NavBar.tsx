'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import classnames from "classnames";

const Navbar = () => {
  const currentPath = usePathname();

  const links = [
    { label: "All Tasks", href: "/" },
    { label: "To Start", href: "/tasks/to-start" },
    { label: "In Progress", href: "/tasks/in-progress" },
    { label: "Completed", href: "/tasks/completed" },
  ];

  return (
    <nav className="flex border-b mb-5 px-5 h-14 items-center bg-gray-800 text-white">
      <ul className="flex space-x-6">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={classnames(
                "hover:text-gray-300 px-3 py-2 rounded-md transition-colors",
                {
                  "bg-blue-500 text-white": link.href === currentPath, // Active link style
                  "text-gray-400": link.href !== currentPath,
                }
              )}
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
