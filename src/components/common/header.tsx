"use client";

import { icons, LogInIcon, LogOutIcon, MenuIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { authClient } from "@/lib/auth-client";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

const Header = () => {
  const { data: session } = authClient.useSession();
  return (
    <header className="flex items-center justify-between p-5">
      <Link href="/">
        <Image src="/logo.svg" alt="BEWEAR" width={100} height={26.14} />
      </Link>

      <div className="flex items-center">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            {session?.user ? (
              <>
                <div className="flex justify-between space-y-6 p-5">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage
                        src={session?.user?.image as string | undefined}
                      />
                      <AvatarFallback>
                        {session?.user?.name?.split(" ")?.[0]?.[0]}
                        {session?.user?.name?.split(" ")?.[1]?.[0]}
                      </AvatarFallback>
                    </Avatar>

                    <div>
                      <h3 className="font-semibold">{session?.user?.name}</h3>
                      <span className="text-muted-foreground block text-xs">
                        {session?.user?.email}
                      </span>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => authClient.signOut()}
                  >
                    <LogOutIcon />
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex items-center">
                <div className="items-center p-5">
                  <h2 className="font-semibold">
                    You are not logged into any account... :(
                  </h2>
                  <h3 className="font-extralight">
                    If you want the complete experience of BEWEAR, please create
                    your account or log in.
                  </h3>
                </div>
                <div className="p-5">
                  <Button size="icon" asChild variant="outline">
                    <Link href="/authentication">
                      <LogInIcon />
                    </Link>
                  </Button>
                </div>
              </div>
            )}
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
