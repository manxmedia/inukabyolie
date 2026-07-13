"use client";

import { useCart } from "@/context/CartContext";
import { useSearch } from "@/context/SearchContext";
import { Menu, Search, ShoppingCart, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Button } from "../ui/button";

export default function Header() {
  const { cart } = useCart();
  const { searchQuery, setSearchQuery } = useSearch();
  const router = useRouter();

  const cartCount = cart?.reduce((total, item) => total + item.quantity, 0) || 0;

  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const pathname = usePathname();
  
 

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileOpen((prev) => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileOpen(false);
  }, []);

  const isActivePath = (path: string) => pathname === path;

  const navItems = [
  { href: "/", label: "Home" },  
  { href: "/about", label: "About Us" },
];

  const navContact = [
  { href: "/contact", label: "Contact Us" },
];

const shopItems = [
  { href: "/shop/fragrances", label: "Fragrances" },
  { href: "/shop/body-care", label: "Body Care" },
  { href: "/shop/wellness", label: "Wellness" },
  { href: "/shop/home-fragrance", label: "Home Fragrance" },
  { href: "/shop/beauty", label: "Beauty" },
  { href: "/shop/bath-spa", label: "Bath & Spa" },
  { href: "/shop/hair-care", label: "Hair Care" },
  { href: "/shop/foot-care", label: "Foot Care" },
  { href: "/shop/kids-items", label: "Kids Items" },
];

const collectionItems = [
  { href: "/newArrivals", label: "New Arrivals" },
  { href: "/featured", label: "Featured" },
  { href: "/sale", label: "Sale" },
];

const supportItems = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms & Conditions" },
  { href: "/shipping", label: "Shipping & Delivery" },
  { href: "/returns", label: "Returns & Exchanges" },
  { href: "/disclaimer", label: "Disclaimer" },
  { href: "/faqs", label: "FAQs & Help Center" },
];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-xl border-b border-gray-200 shadow-lg"
          : "bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8 lg:space-x-12">
            <Link
              className="text-2xl tracking-tight text-gray-900 hover:text-gray-700 transition-colors"
              href="/"
              aria-label="INUKA by Olie"
            >
              INUKA <span className="text-primary">by Olie</span>
            </Link>

              <nav
              className="hidden md:flex items-center space-x-2"
              role="navigation"
              aria-label="Main navigation"
            >

              {/* MenuItems */}
              {navItems.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={`relative py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActivePath(href)
                      ? "bg-orange-100 shadow-md"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  {label}
                </Link>
              ))} 


              {/* Shop Dropdown */}
              <div className="relative group">
                <button
                  type="button"
                  className="py-2 px-4 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-all duration-200"
                >
                  Shop ▾
                </button>

                <div className="absolute left-0 mt-0 hidden group-hover:block w-64 rounded-xl border bg-white shadow-xl z-50">

                  {shopItems.map(({ href, label }) => (
                    <Link
                      key={href}
                      href={href}
                      className="block px-5 py-3 text-sm hover:bg-gray-100 transition"
                    >
                      {label}
                    </Link>
                  ))}

                </div>
              </div>

              {/* Collections */}
              <div className="relative group">
                <button
                  type="button"
                  className="py-2 px-4 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100"
                >
                  Collections ▾
                </button>

                <div className="absolute left-0 mt-0 hidden group-hover:block w-60 rounded-xl border bg-white shadow-xl z-50">

                  {collectionItems.map(({ href, label }) => (
                    <Link
                      key={href}
                      href={href}
                      className="block px-5 py-3 hover:bg-gray-100 text-sm"
                    >
                      {label}
                    </Link>
                  ))}

                </div>
              </div>

              {/* Support */}
              <div className="relative group">
                <button
                  type="button"
                  className="py-2 px-4 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100"
                >
                  Support ▾
                </button>

                <div className="absolute left-0 mt-0 hidden group-hover:block w-72 rounded-xl border bg-white shadow-xl z-50">

                  {supportItems.map(({ href, label }) => (
                    <Link
                      key={href}
                      href={href}
                      className="block px-5 py-3 hover:bg-gray-100 text-sm"
                    >
                      {label}
                    </Link>
                  ))}

                </div>
              </div>

              {/* Contact */}
              {navContact.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={`relative py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActivePath(href)
                      ? "bg-orange-100 shadow-md"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  {label}
                </Link>
              ))}    

            </nav>

          </div>

          <div className="hidden lg:flex flex-1 max-w-md mx-8">
            <form className="relative w-full" onSubmit={(e) => {e.preventDefault();router.push("/");}}>              <input
                type="search"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                aria-label="Search products"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </form>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="lg:hidden p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Search"
            >
              <Search className="h-5 w-5 text-gray-700" />
            </button>

            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileOpen}
            >
              {isMobileOpen ? (
                <X className="h-6 w-6 text-gray-700" />
              ) : (
                <Menu className="h-6 w-6 text-gray-700" />
              )}
            </button>

            <Link
              href="/cart"
              className="relative p-2 rounded-full hover:bg-gray-100 transition-all duration-200 group"
              aria-label={`Shopping cart with ${cartCount} items`}
            >
              <ShoppingCart className="h-6 w-6 text-gray-700 group-hover:text-gray-900 transition-colors" />
              {cartCount > 0 && (
                <span
                  className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold rounded-full min-w-[20px] h-5 flex items-center justify-center px-1"
                  aria-label={`${cartCount} items in cart`}
                >
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </Link>

            <div className="hidden sm:flex items-center space-x-2">
              <Link href="/">
                <Button variant="ghost" size="sm" className="text-sm">
                  Sign In
                </Button>
              </Link>
              <Link href="/">
                <Button size="sm" variant="default" className="text-sm">
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {isSearchOpen && (
          <div className="lg:hidden mt-4 animate-in slide-in-from-top duration-200">
            <form  className="relative"  onSubmit={(e) => { e.preventDefault(); router.push("/"); setIsSearchOpen(false);
  }}
>
              <input
                type="search"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                aria-label="Search products"
                autoFocus
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </form>
          </div>
        )}

{isMobileOpen && (
<nav
  className="md:hidden mt-4 animate-in slide-in-from-top duration-200 max-h-[75vh] overflow-y-auto"
  role="navigation"
  aria-label="Mobile navigation"
>

    <div className="flex flex-col space-y-2 pb-4 border-b">

      {navItems.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          onClick={closeMobileMenu}
          className="py-2 px-3 rounded-lg hover:bg-gray-50"
        >
          {label}
        </Link>
      ))}

      <div className="pt-4">
        <p className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
          Shop
        </p>

        {shopItems.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            onClick={closeMobileMenu}
            className="block py-2 px-6 rounded-lg hover:bg-gray-50"
          >
            {label}
          </Link>
        ))}
      </div>

      <div className="pt-4">
        <p className="px-3 mb-2 text-xs font-semibold uppercase text-gray-500">
          Collections
        </p>

        {collectionItems.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            onClick={closeMobileMenu}
            className="block py-2 px-6 rounded-lg hover:bg-gray-50"
          >
            {label}
          </Link>
        ))}
      </div>

      <div className="pt-4">
        <p className="px-3 mb-2 text-xs font-semibold uppercase text-gray-500">
          Support
        </p>

        {supportItems.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            onClick={closeMobileMenu}
            className="block py-2 px-6 rounded-lg hover:bg-gray-50"
          >
            {label}
          </Link>
        ))}
      </div>

      {navContact.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          onClick={closeMobileMenu}
          className="py-2 px-3 rounded-lg hover:bg-gray-50"
        >
          {label}
        </Link>
      ))}

    </div>

    <div className="flex flex-col space-y-3 pt-4 sm:hidden">
      <Button variant="outline" className="w-full text-sm" asChild>
        <Link href="/" onClick={closeMobileMenu}>
          Sign In
        </Link>
      </Button>

      <Button className="w-full text-sm" variant="default" asChild>
        <Link href="/" onClick={closeMobileMenu}>
          Sign Up
        </Link>
      </Button>
    </div>
  </nav>
)}

      </div>
    </header>
  );
}
