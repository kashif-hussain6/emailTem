"use client";

import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between">
      <div className="text-lg font-bold">
        <Link href="/">My Resume App</Link>
      </div>
      <div className="space-x-4">
        <Link href="/" className="hover:text-gray-400">Home</Link>
        <Link href="/template-1" className="hover:text-gray-400">Template 1</Link>
      </div>
    </nav>
  );
};

export default Navbar;
