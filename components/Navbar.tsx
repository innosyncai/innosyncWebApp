'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [activeItem, setActiveItem] = useState('Home');
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState('');
  const [openNestedSubMenu, setOpenNestedSubMenu] = useState('');

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navItems = [
    { name: 'Home', href: '#hero' },
    { name: 'About Us', href: '#about-us' },
    { 
      name: 'Services', 
      href: '#services',
      subItems: [
        { 
          name: 'Intelligent Document Processing', 
          href: '#services',
          nestedSubItems: [
            { name: 'MultiLingual Document Support', href: '#services' },
            { name: 'All documents support ranging from Banking, Finance, Lending , Legal, Insurance, etc.', href: '#services' },
            { name: 'Document Classification & Information Retrieval', href: '#services' },
            { name: 'Document Agents', href: '#services' },
          ]
        },
        { name: 'Intelligent Data Digitization from documents', href: '#services' },
        { name: 'Data Analytics & ML Solutions', href: '#services' },
      ]
    },
    { name: 'Contact', href: '#footer' },
  ];

  const NavLinks = ({ mobile = false }) => (
    <>
      {navItems.map((item) => (
        <div key={item.name} className={`relative group ${mobile ? 'mb-2' : ''}`}>
          <a
            href={item.href}
            className={`text-white text-base hover:text-blue-500 transition duration-300 relative cursor-pointer ${
              activeItem === item.name ? 'font-semibold' : ''
            }`}
            onClick={(e) => {
              if (item.subItems) {
                e.preventDefault();
              }
              setActiveItem(item.name);
              if (mobile) {
                if (item.subItems) {
                  setOpenSubMenu(openSubMenu === item.name ? '' : item.name);
                  setOpenNestedSubMenu('');
                } else {
                  setIsMenuOpen(false);
                  setOpenSubMenu('');
                  setOpenNestedSubMenu('');
                }
              }
            }}
          >
            {item.name}
            <span className={`absolute left-0 bottom-0 w-full h-0.5 bg-blue-500 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100 ${
              activeItem === item.name ? 'scale-x-100' : ''
            }`}></span>
          </a>
          {item.subItems && (mobile ? openSubMenu === item.name : true) && (
            <div className={`${mobile ? 'mt-2 ml-4' : 'absolute right-0 mt-2 w-56'} bg-gray-900 rounded-md shadow-lg ${mobile ? '' : 'opacity-0 invisible group-hover:opacity-100 group-hover:visible'} transition-all duration-300`}>
              {item.subItems.map((subItem) => (
                <div key={subItem.name} className="relative group/nested">
                  <div
                    className="block px-4 py-3 text-base text-white hover:bg-gray-800 cursor-pointer"
                    onClick={() => {
                      if (mobile && subItem.nestedSubItems) {
                        setOpenNestedSubMenu(openNestedSubMenu === subItem.name ? '' : subItem.name);
                      } else if (!subItem.nestedSubItems) {
                        setIsMenuOpen(false);
                        setOpenSubMenu('');
                        setOpenNestedSubMenu('');
                      }
                    }}
                  >
                    {subItem.name}
                  </div>
                  {subItem.nestedSubItems && (mobile ? openNestedSubMenu === subItem.name : true) && (
                    <div className={`${mobile ? 'mt-2 ml-4' : 'absolute right-full top-0 w-56'} bg-gray-900 rounded-md shadow-lg ${mobile ? '' : 'opacity-0 invisible group-hover/nested:opacity-100 group-hover/nested:visible'} transition-all duration-300`}>
                      {subItem.nestedSubItems.map((nestedItem) => (
                        <Link
                          key={nestedItem.name}
                          href={nestedItem.href}
                          className="block px-4 py-3 text-base text-white hover:bg-gray-800"
                          onClick={() => {
                            setIsMenuOpen(false);
                            setOpenSubMenu('');
                            setOpenNestedSubMenu('');
                          }}
                        >
                          {nestedItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </>
  );

  return (
    <nav className="bg-black py-4 px-4 md:px-12 relative z-40 w-full">
      <div className="flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image src="/logo.png" alt="INDATA CORE" width={40} height={40} />
          <span className="text-white text-xl font-bold ml-4">Innosync AI</span>
        </Link>
        {isMobile ? (
          <button
            className="text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        ) : (
          <div className="flex items-center space-x-8">
            <NavLinks />
          </div>
        )}
      </div>
      {isMobile && isMenuOpen && (
        <div className="mt-4 space-y-4">
          <NavLinks mobile={true} />
        </div>
      )}
    </nav>
  );
}