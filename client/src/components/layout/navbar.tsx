import { useAuth } from "@/hooks/use-auth";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Bell, 
  Menu,
  MessageSquare,
  Search,
  User
} from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navbar() {
  const { user, logoutMutation } = useAuth();
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  const navLinks = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Find Work", href: "/jobs" },
    { name: "Browse Freelancers", href: "/freelancers" },
    { name: "Messages", href: "/messages" },
  ];

  const isActive = (path: string) => {
    return location === path;
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
                    <span className="text-white font-bold text-lg">S</span>
                  </div>
                  <span className="text-foreground font-semibold text-xl">SASSED</span>
                </div>
              </Link>
            </div>
            
            {user && (
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                {navLinks.map((link) => (
                  <Link 
                    key={link.name} 
                    href={link.href}
                    className={`${
                      isActive(link.href)
                        ? "border-primary text-foreground"
                        : "border-transparent text-muted-foreground hover:border-gray-300 hover:text-foreground"
                    } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
          
          {user ? (
            <div className="hidden sm:flex sm:items-center sm:justify-end sm:flex-1">
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" className="text-muted-foreground">
                  <Bell className="h-5 w-5" />
                </Button>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8 bg-primary text-white">
                        <AvatarFallback>
                          {getInitials(user.name)}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/profile">
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/messages">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        <span>Messages</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      onClick={() => logoutMutation.mutate()}
                      disabled={logoutMutation.isPending}
                    >
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ) : (
            <div className="hidden sm:flex sm:items-center gap-4">
              <Link href="/auth">
                <Button variant="outline">Log in</Button>
              </Link>
              <Link href="/auth">
                <Button>Sign up</Button>
              </Link>
            </div>
          )}
          
          <div className="-mr-2 flex items-center sm:hidden">
            <Button
              variant="ghost"
              className="inline-flex items-center justify-center p-2 rounded-md text-muted-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {user ? (
              <>
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`${
                      isActive(link.href)
                        ? "bg-primary/10 border-primary text-foreground"
                        : "border-transparent text-muted-foreground"
                    } block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
                
                <div className="border-t border-gray-200 pt-4 pb-3">
                  <div className="flex items-center px-4">
                    <div className="flex-shrink-0">
                      <Avatar className="h-10 w-10 bg-primary text-white">
                        <AvatarFallback>
                          {getInitials(user.name)}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium text-foreground">{user.name}</div>
                      <div className="text-sm font-medium text-muted-foreground">{user.email}</div>
                    </div>
                    <Button variant="ghost" size="icon" className="ml-auto text-muted-foreground">
                      <Bell className="h-5 w-5" />
                    </Button>
                  </div>
                  <div className="mt-3 space-y-1">
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-base font-medium text-muted-foreground hover:bg-primary/10 hover:text-foreground"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Profile
                    </Link>
                    <Link
                      href="/messages"
                      className="block px-4 py-2 text-base font-medium text-muted-foreground hover:bg-primary/10 hover:text-foreground"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Messages
                    </Link>
                    <button
                      className="block w-full text-left px-4 py-2 text-base font-medium text-muted-foreground hover:bg-primary/10 hover:text-foreground"
                      onClick={() => {
                        logoutMutation.mutate();
                        setMobileMenuOpen(false);
                      }}
                      disabled={logoutMutation.isPending}
                    >
                      Log out
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="pt-4 pb-3 border-t border-gray-200">
                <div className="flex items-center justify-around">
                  <Link href="/auth">
                    <Button variant="outline" onClick={() => setMobileMenuOpen(false)}>
                      Log in
                    </Button>
                  </Link>
                  <Link href="/auth">
                    <Button onClick={() => setMobileMenuOpen(false)}>
                      Sign up
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
