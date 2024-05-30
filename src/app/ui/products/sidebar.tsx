"use client";

import { useState } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { Category } from '@/app/lib/interface';


export default function CollapsibleMenu({ categories } : {categories: Category[]} ) {
  const [isOpen, setIsOpen] = useState(false);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  
  const [searchPhrase, setSearchPhrase] = useState(searchParams.get('query') || '');
  const [category, setCategory] = useState(searchParams.get('category') || '');
  const [priceRange, setPriceRange] = useState({
    min: searchParams.get('minPrice') || '',
    max: searchParams.get('maxPrice') || ''
  });

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams(searchParams);
    if (category) {
      params.set('category', category);
    } else {
      params.delete('category');
    }
    replace(`${pathname}?${params.toString()}`);
  };

  const handlePriceChange = (type:string, value:string) => {
    if (parseInt(value) < 0 || parseInt(value) > 5000) return;
    
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(type, value);
    } else {
      params.delete(type);
    }
    replace(`${pathname}?${params.toString()}`);
  };

  const resetFilters = () => {
    setSearchPhrase('');
    setCategory('');
    setPriceRange({ min: '', max: '' });

    const params = new URLSearchParams();
    replace(`${pathname}?${params.toString()}`);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <div className="flex">
        <button
          onClick={toggleMenu}
          className="ml-auto p-4"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#000000" d="M3.9 54.9C10.5 40.9 24.5 32 40 32H472c15.5 0 29.5 8.9 36.1 22.9s4.6 30.5-5.2 42.5L320 320.9V448c0 12.1-6.8 23.2-17.7 28.6s-23.8 4.3-33.5-3l-64-48c-8.1-6-12.8-15.5-12.8-25.6V320.9L9 97.3C-.7 85.4-2.8 68.8 3.9 54.9z"/></svg>Filter
        </button>
      </div>
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-white bg-opacity-90 flex flex-col p-8 lg:p-48 z-50">
        <button
          onClick={toggleMenu}
          className="self-end mb-4 p-2 rounded-md"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#CC3333" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/></svg>Close
        </button>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Search Phrase
            </label>
            <input
              type="text"
              value={searchPhrase}
              placeholder="Search for..."
              onChange={(e) => {
                setSearchPhrase(e.target.value);
                handleSearch(e.target.value);
              }}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                handleCategoryChange(e.target.value);
              }}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Price Range
            </label>
            <div className="flex space-x-2">
              <input
                type="number"
                placeholder="Min"
                min="0"
                max="5000"
                value={priceRange.min}
                onChange={(e) => {
                  const newMin = e.target.value;
                  setPriceRange({ ...priceRange, min: newMin });
                  handlePriceChange('minPrice', newMin);
                }}
                className="block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
              />
              <input
                type="number"
                placeholder="Max"
                min="0"
                max="5000"
                value={priceRange.max}
                onChange={(e) => {
                  const newMax = e.target.value;
                  setPriceRange({ ...priceRange, max: newMax });
                  handlePriceChange('maxPrice', newMax);
                }}
                className="block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
          </div>
          <button
            onClick={toggleMenu}
            className="bg-blue-500 text-white p-2 mb-4 ml-auto rounded-md w-full"
          >
            Apply Filters
          </button>
          <button
            onClick={resetFilters}
            className="bg-red-500 text-white p-2 mt-4 ml-auto rounded-md w-full"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
