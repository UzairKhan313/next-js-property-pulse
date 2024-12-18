import React from "react";
import Image from "next/image";

import Logo from "@/assets/images/logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-gray-200 py-4 mt-24">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-4">
        <div className="mb-4 md:mb-0">
          <Image src={Logo} alt="Property-pulse" className="h-8 w-auto" />
        </div>

        <div>
          <p className="text-sm text-gray-500 mt-2 md:mt-0">
            &copy; {currentYear} PropertyPulse. All rights reserved By Uzair
            khan.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
