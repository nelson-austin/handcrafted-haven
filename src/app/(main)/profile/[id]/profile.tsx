"use client";

import { Product, User } from "@/app/lib/interface";
import { ExclamationCircleIcon, UserIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Carousel from "./carousel";
import Image from "next/image";
//metadata.title = "Profile View";

export default function UserProfileView({
  profile,
  user,
  products,
}: {
  profile: User;
  user?: User;
  products?: Array<Product>;
}) {
  return (
    <div className="pb-20">
      <div className="flex flex-col rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        {(profile && (
          <>
            <div className="flex flex-col mb-2">
              <div className="flex my-5">
                { profile.image ? <Image 
                src={profile.image}
                width={100}
                height={100}
                alt="Company logo"
                className="w-[100px] rounded-full mr-4"
                /> : null }
                <h1 className={`mb-3 text-2xl font-bold self-center`}>
                {profile.name}&apos;s Profile
                </h1>
              </div>
              <h2 className={`self-start mt-3 mb-3 text-xl font-bold`}>
                About:
              </h2>
              {profile.is_seller === true && (
                <p className="text-lg">{profile.business_name}</p>
              )}
              <p className="text-lg">{profile.email}</p>
            </div>

            {profile.is_seller === true && products && (
              <>
                <h2 className={`mb-3 text-xl font-bold`}>Products:</h2>
                <Carousel products={products} />
              </>
            )}

            {user && user.id === profile.id && (
              <div className="mt-6">
                <EditUserLink id={user.id} />
              </div>
            )}
          </>
        )) ||
          (!profile && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">Profile not found!</p>
            </>
          ))}
      </div>
    </div>
  );
}

function EditUserLink({ id }: { id: string }) {
  return (
    <Link
      className="font-bold bg-green-900 text-white m-5 p-2 rounded-md hover:bg-green-300 hover:text-black"
      href={`/profile/${id}/edit`}
    >
      Edit Profile
    </Link>
  );
}
