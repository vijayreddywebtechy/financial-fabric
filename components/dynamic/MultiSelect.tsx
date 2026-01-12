import React, { useState, useRef, useEffect } from "react";
import { Search, X, ChevronDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

interface Item {
  id: number;
  label: string;
}

interface Category {
  category: string; 
  items: Item[];
}

const MultiSelect: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedItems, setSelectedItems] = useState<Item[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const options: Category[] = [
    {
      category: "Retirement Funds",
      items: [
        { id: 1, label: "SB Pension (29%)" },
        { id: 2, label: "Stanlib RA (15%)" },
      ],
    },
    {
      category: "Investments",
      items: [
        { id: 5, label: "TFSA (4%)" },
        { id: 6, label: "Endowment (7%)" },
        { id: 7, label: "Unit Trust (15%)" },
        { id: 8, label: "Shyft Shares (15%)" },
      ],
    },
    {
      category: "Liquid Capital",
      items: [
        { id: 9, label: "Cash (15%)" },
      ],
    },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggle = (item: Item): void => {
    const isSelected = selectedItems.find(
      (selected) => selected.id === item.id
    );

    if (isSelected) {
      setSelectedItems(selectedItems.filter((i) => i.id !== item.id));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const handleRemove = (itemId: number): void => {
    setSelectedItems(selectedItems.filter((item) => item.id !== itemId));
  };

  const handleClear = (): void => {
    setSelectedItems([]);
    setSearchTerm("");
  };

  const isItemSelected = (itemId: number): boolean => {
    return selectedItems.some((item) => item.id === itemId);
  };

  const filteredOptions: Category[] = options
    .map((category) => ({
      ...category,
      items: category.items.filter((item) =>
        item.label.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }))
    .filter((category) => category.items.length > 0);

  return (
    <div className="w-full">
      <div className="space-y-2" ref={dropdownRef}>
        {/* Select Input */}
        <div className="relative">
          <div
            className="w-full min-h-[48px] px-3 py-2 bg-white border border-[#5C6C80] rounded-lg cursor-pointer hover:border-[#0062E1] focus-within:border-[#0062E1] transition-colors flex items-center justify-between gap-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="flex items-center gap-2 flex-1">
              <Search className="w-4 h-4 text-[#5C6C80] flex-shrink-0" />
              <input
                type="text"
                placeholder="All Accounts"
                value={searchTerm}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setSearchTerm(e.target.value);
                  setIsOpen(true);
                }}
                onClick={(e: React.MouseEvent<HTMLInputElement>) => {
                  e.stopPropagation();
                  setIsOpen(true);
                }}
                className="flex-1 outline-none bg-transparent text-[15px] md:text-base text-[#1A314D] placeholder:text-[#5C6C80]"
              />
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              {selectedItems.length > 0 && (
                <>
                  <span className="text-sm text-[#5C6C80] font-medium">
                    {selectedItems.length}{" "}
                    {selectedItems.length === 1 ? "item" : "items"} selected
                  </span>
                  <button
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                      e.stopPropagation();
                      handleClear();
                    }}
                    className="p-1 hover:bg-[#f3f4f6] rounded transition-colors"
                  >
                    <X className="w-4 h-4 text-[#5C6C80]" />
                  </button>
                </>
              )}
              <ChevronDown
                className={`w-4 h-4 text-[#5C6C80] transition-transform ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </div>
          </div>

          {/* Dropdown */}
          {isOpen && (
            <div className="absolute z-10 w-full mt-2 bg-white border border-[#e5e7eb] rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.1)] max-h-64 overflow-y-auto">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((category, idx) => (
                  <div key={idx}>
                    <div className="px-3 py-2 bg-[#f9fafb] border-b border-[#e5e7eb] text-xs font-semibold text-[#5C6C80] uppercase tracking-wide">
                      {category.category}
                    </div>
                    {category.items.map((item) => {
                      const isSelected = isItemSelected(item.id);
                      return (
                        <div
                          key={item.id}
                          onClick={() => handleToggle(item)}
                          className="px-3 py-2 hover:bg-[#f3f4f6] cursor-pointer transition-colors flex items-center gap-3"
                        >
                          <Checkbox
                            checked={isSelected}
                            onCheckedChange={() => handleToggle(item)}
                            className="cursor-pointer"
                          />
                          <span
                            className={`text-[15px] md:text-base ${
                              isSelected
                                ? "text-[#1A314D] font-medium"
                                : "text-[#1A314D]"
                            }`}
                          >
                            {item.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                ))
              ) : (
                <div className="px-3 py-4 text-sm text-[#5C6C80] text-center">
                  No options found
                </div>
              )}
            </div>
          )}
        </div>

        {/* Selected Count */}
        {/* {selectedItems.length > 0 && (
          <div className="text-sm text-gray-600 font-medium px-1">
            {selectedItems.length}{" "}
            {selectedItems.length === 1 ? "item" : "items"} selected
          </div>
        )} */}

        {/* Selected Items Pills */}
        {selectedItems.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {selectedItems.map((item) => (
              <div
                key={item.id}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#e6f0ff] text-[#0062E1] rounded-full text-sm font-medium"
              >
                <span>{item.label}</span>
                <button
                  onClick={() => handleRemove(item.id)}
                  className="p-0.5 hover:bg-[#cce0ff] rounded-full transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiSelect;
