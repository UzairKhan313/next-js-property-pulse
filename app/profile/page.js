"use client";
import { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";

import ProfileDefault from "@/assets/images/profile.png";
import LoadingSpinner from "@/components/LoadingSpinner";
import UserListing from "@/components/UserListing";

const ProfilePage = () => {
  const { data: session } = useSession();
  const profileImage = session?.user.image;
  const name = session?.user.name;
  const email = session?.user.email;

  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const onDeleteProperty = (pid) => {
    const updatedProperties = properties.filter(
      (property) => property._id !== pid
    );
    setProperties(updatedProperties);
  };

  useEffect(() => {
    const fetchUserProperties = async (userId) => {
      if (!userId) {
        return;
      }
      setIsLoading(true);
      try {
        const res = await fetch(`/api/properties/user/${userId}`);
        if (res.ok) {
          const data = await res.json();
          setProperties(data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    // Fetch User Properties only when there is a session.
    if (session?.user?.id) {
      fetchUserProperties(session.user.id);
    }
  }, [session]);

  return (
    <section className="bg-blue-50">
      <div className="max-w-7xl m-auto py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h1 className="text-3xl font-bold mb-4">Your Profile</h1>
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/4 mx-20 mt-10">
              <div className="mb-4">
                <Image
                  className="h-32 w-32 md:h-48 md:w-48 rounded-full mx-auto md:mx-0"
                  src={profileImage || ProfileDefault}
                  width={200}
                  height={200}
                  alt="User"
                />
              </div>
              <h2 className="text-2xl mb-4">
                <span className="font-bold block">Name: </span> {name}
              </h2>
              <h2 className="text-2xl">
                <span className="font-bold block">Email: </span> {email}
              </h2>
            </div>

            <div className="md:w-3/4 md:pl-4">
              <h2 className="text-xl font-semibold mb-4">Your Listings</h2>
              {!isLoading && properties.length === 0 && (
                <p>You have no property Listings yet.</p>
              )}
              {isLoading ? (
                <LoadingSpinner loading={isLoading} />
              ) : (
                properties.map((property) => (
                  <UserListing
                    key={property._id}
                    property={property}
                    onDeleteProperty={onDeleteProperty}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
