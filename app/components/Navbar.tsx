"use client";

import { Menu, X } from "lucide-react";
import { useState, useMemo } from "react";
import Link from "next/link";
import { navbarLinks } from "../../data/navbarLinks";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session, status } = useSession();

  const filteredNavbarLinks = useMemo(() => {
    return navbarLinks.map((link) => {
      if (link.title === "Hobbyliga") {
        return {
          ...link,
          submenu: link.submenu?.filter(
            (sublink) => sublink.title !== "Editor" || status === "authenticated"
          ),
        };
      }
      return link;
    });
  }, [status]);

  return (
    <>
      <header className="absolute top-0 left-0 right-0 z-40 bg-linear-to-b from-black/80 to-transparent pb-14 flex justify-center">
        <div className="container px-6 flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex justify-center items-center">
              <img
                src={"/logos/sfn_logo.webp"}
                className="h-10"
                alt="Sportfreunde Nofels Logo"
              />
              <span className="font-bold text-xl ml-2 text-white">
                Sportfreunde Nofels
              </span>
            </Link>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex gap-6 relative items-center">
            {filteredNavbarLinks.map((link) => (
              <div key={link.title} className="relative group flex items-center gap-4">
                <Link
                  href={link.href}
                  className="text-md font-semibold text-white transition-colors hover:text-primary"
                >
                  {link.title}
                </Link>

                {/* Submenu */}
                {link.submenu && (
                  <div className="absolute left-0 top-full hidden group-hover:flex z-50">
                    <div className="flex flex-col mt-2 bg-white shadow-lg border border-gray-200 rounded-xl min-w-[12rem]">
                      {link.submenu.map((sublink) => (
                        <Link
                          key={sublink.title}
                          href={sublink.href}
                          className="px-4 py-3 text-sm hover:bg-gray-100 rounded-xl text-black hover:text-primary"
                        >
                          {sublink.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Logout button (desktop, outside submenu) */}
            {status === "authenticated" && (
              <button
                onClick={() => signOut()}
                className="text-md font-semibold text-white hover:text-primary transition-colors ml-4"
              >
                Logout
              </button>
            )}
          </nav>

          {/* Mobile toggle */}
          <div className="flex md:hidden items-center gap-4">
            <button
              type="button"
              className="relative z-20"
              onClick={() => setIsOpen(!isOpen)}
            >
              <Menu className="h-6 w-6 text-white" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className="fixed right-0 top-0 z-50 flex h-full flex-col overflow-x-hidden bg-white duration-500"
        style={{ width: isOpen ? "75vw" : "0vw" }}
      >
        <button
          type="button"
          className={`ml-auto mr-6 mt-6 text-[50px] duration-300 ${
            isOpen ? "delay-200" : ""
          }`}
          style={{ color: isOpen ? "black" : "transparent" }}
          onClick={() => setIsOpen(false)}
        >
          <X className="h-6 w-6 text-black" />
        </button>

        <div className="text-black flex w-full pl-10 basis-full flex-col justify-center gap-5 text-2xl font-bold">
          {filteredNavbarLinks.map((link) => (
            <div key={link.title}>
              <Link href={link.href} onClick={() => setIsOpen(false)}>
                <h3
                  className={`duration-300 ${
                    isOpen ? "delay-200 text-black" : "text-transparent"
                  }`}
                >
                  {link.title}
                </h3>
              </Link>

              {/* Submenu (mobile) */}
              {link.submenu && isOpen && (
                <div className="pl-4 mt-1 flex flex-col gap-2 text-lg">
                  {link.submenu.map((sublink) => (
                    <Link
                      key={sublink.title}
                      href={sublink.href}
                      onClick={() => setIsOpen(false)}
                      className="font-medium text-black hover:text-primary"
                    >
                      {sublink.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Logout button (mobile, outside submenu) */}
          {status === "authenticated" && isOpen && (
            <button
              onClick={() => {
                signOut();
                setIsOpen(false);
              }}
              className="mt-2 font-medium text-black hover:text-primary"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </>
  );
}
