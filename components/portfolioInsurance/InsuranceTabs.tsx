"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const InsuranceTabs = () => {
  const pathname = usePathname();

  const tabs = [
    { name: "Personal Protection", href: "/portfolio-insurance" },
    { name: "Asset Protection", href: "/portfolio-insurance/asset-protection" },
  ];

  return (
    <div className="border-b border-gray-200 mb-6 md:mb-8">
      <nav className="-mb-px flex space-x-8" aria-label="Tabs">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href;
          return (
            <Link
              key={tab.name}
              href={tab.href}
                    className={`
                    py-3 text-sm md:text-base whitespace-nowrap
                  border-b-2 transition-colors
                  ${
                    isActive
                      ? 'border-primary-dark text-primary-dark font-medium'
                      : 'border-transparent text-gray-900 hover:text-gray-900'
                  }
                `}
            >
              {tab.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default InsuranceTabs;
