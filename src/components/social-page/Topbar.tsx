"use client";

import { socialtopbarLinks } from "@/constants";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

function SocialTopBar() {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <nav className="socialtopbar">
      <div className="flex items-center w-full justify-center">
        {socialtopbarLinks.map((link) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;
          return (
            <Link
              href={link.route}
              key={link.label}
              className={`${isActive && "bg-gray-200 text-black"}`}
            >
              <p className="text-black-1 text-[20px] px-10 mx-lg:hidden">
                {link.label}
              </p>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export default SocialTopBar;
