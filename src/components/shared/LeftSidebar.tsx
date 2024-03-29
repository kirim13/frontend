"use client";
import { sidebarLinks } from "@/constants";
import Image from "next/image";
import Link, { LinkProps } from "next/link";
import { usePathname, useRouter } from "next/navigation";

function LeftSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <section className="custom-scrollbar leftsidebar">
      <div className="flex w-full flex-1 flex-col gap-6 px-6">
        {sidebarLinks.map((link) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;
          return (
            <>
              <Link
                href={link.route}
                key={link.label}
                className={`leftsidebar_link ${
                  isActive && "bg-blue-700 text-white"
                }`}
              >
                <Image
                  src={link.imgURL}
                  alt={link.label}
                  width={24}
                  height={24}
                />
                <p className="text-black-1 mx-lg:hidden">{link.label}</p>
              </Link>
            </>
          );
        })}
      </div>

      <div className="mt-10 px-6">
        <div className="flex cursor-pointer gap-4 p-4">
          <Image
            src="/assets/log-out.png"
            alt="logout"
            width={24}
            height={24}
          />
          <p className="text-dark-2 max-lg:hidden">Logout</p>
        </div>
      </div>
    </section>
  );
}

export default LeftSidebar;
