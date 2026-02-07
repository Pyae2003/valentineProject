import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { Flower2Icon, Music2Icon, Music3Icon } from "lucide-react";
import { Separator } from "./ui/separator";
import {
  aboutUsPath,
  addmusic,
  addPath,
  contentsPath,
  reasonPath,
  SaveCouplePhotoPath,
  SaveMemoryPath,
} from "@/constants/routes";
import Link from "next/link";
const Header = () => {
  return (
    <div>
      <div className="flex flex-row justify-between">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-pink-500 rounded-full"></span>
          <span className="font-semibold text-pink-600 tracking-wide">
            THWE ZIN MIN THANT
          </span>
        </div>
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
                <NavigationMenuLink href={reasonPath}>
                  Reasons
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button className="text-pink-500" variant={"link"}>
                      News
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-30 text-pink-500"
                    align="start"
                  >
                    <DropdownMenuGroup>
                      <DropdownMenuItem>
                        <Link href={addmusic}>Add Music</Link>
                        <DropdownMenuShortcut>
                          <Music3Icon />{" "}
                        </DropdownMenuShortcut>
                      </DropdownMenuItem>
                      <Separator />
                      <DropdownMenuItem>
                        See Music
                        <DropdownMenuShortcut>
                          <Music2Icon />
                        </DropdownMenuShortcut>
                      </DropdownMenuItem>
                      <Separator />
                      <DropdownMenuItem>
                        <Link href={SaveMemoryPath}>Save Memory</Link>
                        <DropdownMenuShortcut>
                          <Flower2Icon />
                        </DropdownMenuShortcut>
                      </DropdownMenuItem>
                      <Separator />
                      <DropdownMenuItem>
                        <Link href={addPath}>Save Photo</Link>
                        <DropdownMenuShortcut>
                          <Flower2Icon />
                        </DropdownMenuShortcut>
                      </DropdownMenuItem>
                      <Separator />
                      <DropdownMenuItem>
                        <Link href={SaveCouplePhotoPath}>Save Our Couple Photo</Link>
                        <DropdownMenuShortcut>
                          <Flower2Icon />
                        </DropdownMenuShortcut>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </div>
  );
};

export default Header;
