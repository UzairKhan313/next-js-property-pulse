import React from "react";
import Link from "next/link";

const MobileMenu = ({ pathName, session }) => {
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
        {session && (
          <Link
            href="/properties/add"
            className={`${
              pathName === "/properties/add" ? "bg-black" : ""
            }  text-white block rounded-md px-3 py-2 text-base font-medium`}
          >
            Add Property
          </Link>
        )}
        {!session && (
          <button className="flex items-center text-white bg-gray-700 hover:bg-gray-900 hover:text-white rounded-md px-3 py-2 my-4">
            <Link href="/login">
              <span>Login or Register</span>
            </Link>
          </button>
        )}
      </div>
    </div>
  );
};

export default MobileMenu;
