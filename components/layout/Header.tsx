"use client";

import { useState } from "react";
import { Menu, X, ChevronDown, LogOut } from "lucide-react";
import Image from "next/image";
import sbLogo from "@/assets/sb-logo.png";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type MenuItem = {
  label: string;
  hasDropdown: boolean;
  dropdownItems?: Array<{ label: string; href: string }>;
  href?: string;
};

type Props = {};

const Header = (props: Props) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileActiveDropdown, setMobileActiveDropdown] = useState<
    string | null
  >(null);

  const navigationItems: MenuItem[] = [
    {
      label: "JAMES SMITH",
      hasDropdown: true,
      dropdownItems: [
        { label: "Sons Name", href: "#" },
        { label: "Wifes Name", href: "#" },
        { label: "View Family Structure", href: "#" }
      ],
    },
    {
      label: "OVERVIEW",
      hasDropdown: false,
      href: "#"
    },
    {
      label: "PORTFOLIO",
      hasDropdown: true,
      dropdownItems: [
        { label: "Investments", href: "#" },
        { label: "Life Insurance", href: "#" },
        { label: "Short Term Insurance", href: "#" }
      ],
    },
    {
      label: "GOALS",
      hasDropdown: true,
      dropdownItems: [
        { label: "Overview", href: "#" },
        { label: "Wizard", href: "#" },
        { label: "Retirement", href: "#" },
        { label: "Investment", href: "#" },
        { label: "Risk Management", href: "#" },
        { label: "Estate Planning", href: "#" }
      ],
    },
    {
      label: "FINANCIALS",
      hasDropdown: true,
      dropdownItems: [
        { label: "Assets & Liabilities", href: "#" },
        { label: "Income & Expenses", href: "#" },
        { label: "Scenario Planning", href: "#" }
      ],
    },
    {
      label: "MANAGE",
      hasDropdown: true,
      dropdownItems: [
        { label: "Investment", href: "#" },
        { label: "Life Insurance", href: "#" },
        { label: "Claims", href: "#" },
        { label: "Beneficiaries", href: "#" },
        { label: "Bank Accounts", href: "#" },
        { label: "Debit Orders", href: "#" },
        { label: "Transfers", href: "#" }
      ],
    },
    {
      label: "ESTATE PLANNING",
      hasDropdown: false,
      href: "#"
    },
    {
      label: "MANDATES",
      hasDropdown: true,
      dropdownItems: [
        { label: "Mandate 1", href: "#" },
        { label: "Mandate 2", href: "#" },
        { label: "Mandate 3", href: "#" }
      ],
    },
    {
      label: "DOCUMENTS",
      hasDropdown: true,
      dropdownItems: [
        { label: "Document 1", href: "#" },
        { label: "Document 2", href: "#" },
        { label: "Document 3", href: "#" }
      ],
    },
    {
      label: "OTHER SCREENS",
      hasDropdown: true,
      dropdownItems: [
        { label: "Financial Planning", href: "/financial-planning" },
        { label: "Compliance (SA)", href: "/compliance" },
        { label: "Risk Appetite", href: "/risk-appetite" }
      ],
    },
  ];

  const serviceItems: MenuItem[] = [
    {
      label: "LOYALTY",
      hasDropdown: false,
      href: "#"
    },
    {
      label: "SERVICE",
      hasDropdown: true,
      dropdownItems: [
        { label: "Service 1", href: "#" },
        { label: "Service 2", href: "#" },
        { label: "Service 3", href: "#" }
      ],
    },
  ];

  return (
    <header className="w-full">
      {/* Top Bar */}
      <div className="bg-white">
        <div className="px-2 sm:px-4 py-1.5 sm:py-2 flex justify-between items-center">
          <div className="text-gray-600 text-xs sm:text-sm truncate">
            <span className="hidden md:inline">
              Digital Wealth and Investment
            </span>
            <span className="md:hidden">DWI</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <button className="text-gray-600 hover:text-gray-900 flex items-center gap-1">
              <span className="text-xs sm:text-sm">
                Message<span className="hidden sm:inline"> Centre</span>
              </span>
              <span className="bg-red-600 text-white rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center text-[10px] sm:text-xs">
                1
              </span>
            </button>
            <button className="text-gray-600 hover:text-gray-900 text-xs sm:text-sm">
              <span className="hidden sm:inline">Contact Us</span>
              <span className="sm:hidden">Contact</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Header */}
      {/* Logo and User Section */}
      <div className="bg-primary-dark h-12 sm:h-14 md:h-16 px-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src={sbLogo}
            alt="Standard Bank Logo"
            width={158}
            height={42}
            className="h-6 w-auto sm:h-8 md:h-10"
            priority
          />
        </Link>

        {/* User Controls */}
        <div className="flex items-center gap-2 sm:gap-4 h-full">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="text-white hover:text-gray-200 flex items-center gap-1 outline-none text-xs sm:text-sm">
                <span className="hidden sm:inline">James Smith</span>
                <span className="sm:hidden">User</span>
                <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="min-w-[180px] sm:min-w-[250px] bg-white"
              sideOffset={5}
            >
              <DropdownMenuItem className="px-4 py-3 flex items-center justify-between cursor-pointer">
                <span className="text-gray-900 text-sm">James Smith</span>
                <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full font-medium">
                  Client
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem className="px-4 py-3 flex items-center justify-between cursor-pointer">
                <span className="text-gray-900 text-sm">Sarah Conner</span>
                <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full font-medium">
                  Advisor
                </span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <button className="h-full bg-[#003FCA] text-white px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 text-xs hover:bg-primary transition-colors">
            <span className="hidden sm:inline">SIGN OUT</span>
            <LogOut className="sm:hidden" size={16} />
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="relative">
        {/* Mobile Menu Button */}
        <div className="lg:hidden bg-[#003FCA] px-4">
          <button
            className="text-white py-3 flex items-center gap-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <>
                <X className="w-5 h-5" /> <span className="text-sm">Close</span>
              </>
            ) : (
              <>
                <Menu className="w-5 h-5" />{" "}
                <span className="text-sm">Menu</span>
              </>
            )}
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="bg-[#003FCA] hidden lg:flex justify-between items-stretch">
          <div className="flex items-stretch">
            {navigationItems.map((item, index) => (
              <div key={index} className="relative group flex items-stretch">
                {item.hasDropdown ? (
                  <>
                    <button className="bg-transparent text-white hover:bg-primary-dark px-3 xl:px-4 py-3 text-xs whitespace-nowrap flex items-center gap-1.5 transition-colors">
                      {item.label}
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    <div className="absolute left-0 top-full opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 pointer-events-none group-hover:pointer-events-auto">
                      <ul className="min-w-[200px] bg-white shadow-xl border border-gray-200 rounded-md overflow-hidden mt-0">
                        {item.dropdownItems?.map(
                          (dropdownItem, dropdownIndex) => (
                            <li key={dropdownIndex}>
                              <Link
                                href={dropdownItem.href}
                                className="block px-4 py-2.5 text-sm text-gray-900 hover:bg-primary hover:text-white transition-colors"
                              >
                                {dropdownItem.label}
                              </Link>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  </>
                ) : (
                  <button className="bg-transparent text-white hover:bg-primary-dark px-3 xl:px-4 py-3 text-xs whitespace-nowrap transition-colors">
                    {item.label}
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="flex items-stretch border-l border-[#0047BB]">
            {serviceItems.map((item, index) => (
              <div key={index} className="relative group flex items-stretch">
                {item.hasDropdown ? (
                  <>
                    <button className="bg-transparent text-white hover:bg-primary-dark px-3 xl:px-4 py-3 text-xs whitespace-nowrap flex items-center gap-1.5 transition-colors">
                      {item.label}
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    <div className="absolute right-0 top-full opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 pointer-events-none group-hover:pointer-events-auto">
                      <ul className="min-w-[200px] bg-white shadow-xl border border-gray-200 rounded-md overflow-hidden mt-0">
                        {item.dropdownItems?.map(
                          (dropdownItem, dropdownIndex) => (
                            <li key={dropdownIndex}>
                              <Link
                                href={dropdownItem.href}
                                className="block px-4 py-2.5 text-sm text-gray-900 hover:bg-primary hover:text-white transition-colors"
                              >
                                {dropdownItem.label}
                              </Link>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  </>
                ) : (
                  <button className="bg-transparent text-white hover:bg-primary-dark px-3 xl:px-4 py-3 text-xs whitespace-nowrap transition-colors">
                    {item.label}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed top-[7.5rem] sm:top-[8rem] md:top-[8.5rem] left-0 right-0 bg-[#003087] border-t border-[#0047BB] z-40 shadow-2xl max-h-[calc(100vh-8rem)] overflow-y-auto overscroll-contain">
            <div className="flex-col py-2">
              {navigationItems.map((item, index) => (
                <div key={index}>
                  <button
                    className="text-white hover:bg-[#0047BB] px-4 py-3 text-sm font-medium text-left flex items-center justify-between w-full"
                    onClick={() => {
                      if (item.hasDropdown) {
                        setMobileActiveDropdown(
                          mobileActiveDropdown === item.label
                            ? null
                            : item.label
                        );
                      }
                    }}
                  >
                    {item.label}
                    {item.hasDropdown && (
                      <ChevronDown
                        className={`w-3 h-3 transition-transform ${
                          mobileActiveDropdown === item.label
                            ? "rotate-180"
                            : ""
                        }`}
                      />
                    )}
                  </button>
                  {item.hasDropdown &&
                    mobileActiveDropdown === item.label &&
                    item.dropdownItems && (
                      <div className="bg-[#0047BB] pl-4">
                        {item.dropdownItems.map(
                          (dropdownItem, dropdownIndex) => (
                            <Link
                              key={dropdownIndex}
                              href={dropdownItem.href}
                              className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-[#003087]"
                            >
                              {dropdownItem.label}
                            </Link>
                          )
                        )}
                      </div>
                    )}
                </div>
              ))}
              <div className="border-t border-[#0047BB] mt-2 pt-2">
                {serviceItems.map((item, index) => (
                  <div key={index}>
                    <button
                      className="text-white hover:bg-[#0047BB] px-4 py-3 text-sm font-medium text-left w-full flex items-center justify-between"
                      onClick={() => {
                        if (item.hasDropdown) {
                          setMobileActiveDropdown(
                            mobileActiveDropdown === item.label
                              ? null
                              : item.label
                          );
                        }
                      }}
                    >
                      {item.label}
                      {item.hasDropdown && (
                        <ChevronDown
                          className={`w-3 h-3 transition-transform ${
                            mobileActiveDropdown === item.label
                              ? "rotate-180"
                              : ""
                          }`}
                        />
                      )}
                    </button>
                    {item.hasDropdown &&
                      mobileActiveDropdown === item.label &&
                      item.dropdownItems && (
                        <div className="bg-[#0047BB] pl-4">
                          {item.dropdownItems.map(
                            (dropdownItem, dropdownIndex) => (
                              <Link
                                key={dropdownIndex}
                                href={dropdownItem.href}
                                className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-[#003087]"
                              >
                                {dropdownItem.label}
                              </Link>
                            )
                          )}
                        </div>
                      )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
