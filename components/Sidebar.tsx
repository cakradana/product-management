import Image from "next/image";
import Link from "next/link";
import React from "react";

const Sidebar = () => {
  return (
    <div className="drawer-side">
      <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
      <div className="menu p-4 w-40 h-full bg-base-200 flex flex-col justify-between">
        <div>
          <div className="mb-4">
            <Image
              src="/img/logo.png"
              alt="logo"
              width={100}
              height={100}
              priority={true}
            />
          </div>
          <ul className="space-y-1 font-semibold text-base">
            <li>
              <Link href="/" className="active">
                Home
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
