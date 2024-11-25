import React from "react";
import Link from "next/link";
import { FaGoogle } from "react-icons/fa";

const MobileMenu = ({ pathName, isLoggedIn }) => {
  return (
    <div>
      <div className="space-y-1 px-2 pb-3 pt-2">
        <Link
          href="/"
          className={`${
            pathName === "/" ? "bg-black" : ""
          }  text-white block rounded-md px-3 py-2 text-base font-medium`}
        >
          Home
        </Link>
        <Link
          href="/properties"
          className={`${
            pathName === "/properties" ? "bg-black" : ""
          }  text-white block rounded-md px-3 py-2 text-base font-medium`}
        >
          Properties
        </Link>
        {isLoggedIn && (
          <Link
            href="/properties/add"
            className={`${
              pathName === "/properties/add" ? "bg-black" : ""
            }  text-white block rounded-md px-3 py-2 text-base font-medium`}
          >
            Add Property
          </Link>
        )}
        {!isLoggedIn && (
          <button className="flex items-center text-white bg-gray-700 hover:bg-gray-900 hover:text-white rounded-md px-3 py-2 my-4">
            <FaGoogle className="text-white mr-2" />
            <span>Login</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default MobileMenu;
