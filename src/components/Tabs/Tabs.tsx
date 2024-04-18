import React from 'react';
import {
  BuildingOfficeIcon,
  PhotoIcon,
  UsersIcon,
} from '@heroicons/react/20/solid';

// const tabs = [
//   {
//     name: 'Property Details',
//     href: '#',
//     icon: BuildingOfficeIcon,
//     current: true,
//   },
//   { name: 'Photos', href: '#', icon: PhotoIcon, current: false },
//   { name: 'Tenant(s)', href: '#', icon: UsersIcon, current: false },
// ];

interface Tab {
  name: string;
}

interface TabsProps {
  tabs: Tab[];
  onTabClick: (index: number) => void;
  currentTab: number;
}

const Tabs: React.FC<TabsProps> = ({ tabs, onTabClick, currentTab }) => {
  return (
    <div>
      <div className="sm:hidden">
        <label
          htmlFor="tabs"
          className="sr-only"
        >
          Select a tab
        </label>
        <select
          id="tabs"
          name="tabs"
          className="block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          value={currentTab}
          onChange={(e) => onTabClick(Number(e.target.value))}
        >
          {tabs.map((tab, index) => (
            <option
              key={index}
              value={index}
            >
              {tab.name}
            </option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <nav
          className="flex space-x-4"
          aria-label="Tabs"
        >
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => onTabClick(index)}
              className={`${
                currentTab === index
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-500 hover:text-gray-700'
              } rounded-md group inline-flex items-center px-3 py-2 text-sm font-medium`}
              aria-current={currentTab === index ? 'page' : undefined}
            >
              {tab.name}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Tabs;
