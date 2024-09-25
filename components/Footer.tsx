import React from 'react';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-black via-black to-blue-900 text-white px-6 py-12 w-full">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-start">
        <div className="flex items-center mb-8 md:mb-0">
          <Image src="/logo.png" alt="RevUp AI" width={40} height={40} className="mr-2" />
          <span className="text-2xl font-semibold">Innosync AI</span>
        </div>
        <div className="flex flex-col md:flex-row md:space-x-16">
          <div className="mb-6 md:mb-0">
            <h4 className="font-bold mb-3 text-xl">Address</h4>
            <p className="text-sm mb-1">F-59i, 1st Floor, Sushant Lok 2,</p>
            <p className="text-sm mb-1">Sector-57, Gurgaon, Haryana, India 122002</p>
            <p className="text-sm mb-1 underline">business@innosync.ai</p>
            <p className="text-sm">+91 74998 37580</p>
          </div>
          <div className="mb-6 md:mb-0">
            <h4 className="font-bold mb-3 text-xl">Links</h4>
            <ul className="space-y-1">
              <li><a href="#hero" className="text-sm hover:underline">Home</a></li>
              <li><a href="#about-us" className="text-sm hover:underline">About Us</a></li>
              <li><a href="#services" className="text-sm hover:underline">Services</a></li>
              <li><a href="#footer" className="text-sm hover:underline">Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-3 text-xl">Location</h4>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3507.3374286701397!2d77.09976431507878!3d28.46897998248047!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d23e59760b021%3A0x50782ffab14b1309!2sCitywide%20Global!5e0!3m2!1sen!2sus!4v1650000000000!5m2!1sen!2sus"
              width="300"
              height="200"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
      <div className="container mx-auto mt-8">
        <hr className="border-t border-gray-600 my-4" />
        <p className="text-xs">Innosync AI ©. All rights reserved.</p>
      </div>
    </footer>
  );
}