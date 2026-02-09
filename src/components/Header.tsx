import Link from "next/link";
import { Menu } from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import { allmusic, dashboard } from '../constants/routes';

import {
  aboutUsPath,
  addmusic,
  addPath,
  contentsPath,
  SaveCouplePhotoPath,
} from "@/constants/routes";

const Header = () => {
  return (
    <header className="w-full px-4 py-3 bg-pink-100 border-b backdrop-blur">
      <div className="flex items-center bg-pink-100 justify-between max-w-7xl mx-auto">

        <div className="flex items-center gap-2 bg-pink-100 rounded-4xl  ">
          <span className="w-3 h-3 bg-pink-500 rounded-full" />
          <span className="font-semibold text-pink-600 tracking-wide">
            THWE ZIN MIN THANT
          </span>
        </div>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex gap-8 text-sm text-pink-500 font-medium">
          <NavigationMenu>
            <NavigationMenuList>

              <NavigationMenuItem>
                <NavigationMenuLink href={aboutUsPath}>
                  About Us
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink href={contentsPath}>
                  Content
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink href={dashboard}>
                  Dashboard
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="link"
                      className="text-pink-500 px-0"
                    >
                      Memories
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent className="w-56 text-pink-600">
                    <DropdownMenuItem asChild>
                      <Link href={addmusic}>🎵 Add Music</Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild>
                      <Link href={allmusic}>💌 All Music</Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild>
                      <Link href={addPath}>📸 Save Photo</Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild>
                      <Link href={SaveCouplePhotoPath}>
                        💑 Our Couple Photo
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </NavigationMenuItem>

            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* MOBILE MENU */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="w-6 h-6 text-pink-500" />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-[85%] sm:w-[380px]
                         rounded-l-3xl
                         bg-gradient-to-b from-pink-50 via-white to-pink-100
                         border-l border-pink-200"
            >
              <SheetHeader className="text-center">
                <SheetTitle className="text-pink-600 text-xl font-semibold tracking-wide">
                  💖 Menu
                </SheetTitle>
                <p className="text-xs text-pink-400 mt-1">
                  Our little love space
                </p>
              </SheetHeader>

              <nav className="mt-8 flex flex-col gap-2 text-pink-600 font-medium">

                {/* MAIN LINKS */}
                {[
                  { label: "About Us", href: aboutUsPath },
                  { label: "Content", href: contentsPath },
                  { label: "Dashboard", href: dashboard },
                ].map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="rounded-xl px-4 py-3
                               hover:bg-pink-100
                               transition-all duration-200"
                  >
                    {item.label}
                  </Link>
                ))}

                {/* DIVIDER */}
                <div className="flex items-center gap-3 my-4">
                  <span className="flex-1 h-px bg-pink-200" />
                  <span className="text-xs text-pink-400">💞 Memories</span>
                  <span className="flex-1 h-px bg-pink-200" />
                </div>

                {/* MEMORY LINKS */}
                {[
                  { label: "🎵 Add Music", href: addmusic },
                  { label: "💌 All Music", href: allmusic },
                  { label: "📸 Save Photo", href: addPath },
                  { label: "💑 Our Couple Photo", href: SaveCouplePhotoPath },
                ].map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="rounded-xl px-4 py-3
                               bg-white/60 backdrop-blur
                               shadow-sm
                               hover:bg-pink-100
                               transition-all duration-200"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              {/* FOOTER */}
              <div className="absolute bottom-6 left-0 right-0 text-center text-xs text-pink-400">
                Made with 💖 for us
              </div>
            </SheetContent>
          </Sheet>
        </div>

      </div>
    </header>
  );
};

export default Header;
