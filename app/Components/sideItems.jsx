import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SideItems({ name, href, collapsed, icon }) {
  const pathname = usePathname();
  const isActive = href == pathname;

  return (
    <>
      <Link href={href}>
        <div
          className={`relative group flex sm:flex-col sm:items-center lg:mr-5 transition-all duration-300 ${
            isActive
              ? "bg-white text-gray-900 py-3.5 sm:pb-2 rounded-t-xl after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-1 after:w-full after:bg-green-700 pb-3 lg:rounded-r-xl lg:rounded-tl-none lg:after:h-full lg:after:w-1 lg:after:top-0 lg:after:left-0"
              : "text-gray-300"
          } px-6   lg:py-4 lg:flex-row lg:gap-5 ${
            collapsed ? "lg:px-0" : "lg:px-10"
          }  
          `}
        >
          <Image
            alt={`${name} icon`}
            src={icon}
            width={20}
            height={20}
            className={`${collapsed ? "ml-4" : " "}`}
          />
          <p
            className={`hidden sm:inline-block sm:text-preset-5 font-bold lg:text-preset-3 ${
              collapsed ? "opacity-0 " : "opacity-100"
            } transition-opacity duration-700 ease-in-out`}
          >
            {name}
          </p>

          {collapsed && (
            <span className=" hidden lg:inline-block absolute left-full top-1/2 -translate-y-1/2 ml-2 whitespace-nowrap rounded bg-black px-2 py-1 text-sm text-white opacity-0 group-hover:opacity-80 transition-opacity duration-300 z-10">
              {name}
            </span>
          )}
        </div>
      </Link>
    </>
  );
}
