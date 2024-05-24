"use client";

import { User } from "@/app/lib/interface";
import { ExclamationCircleIcon, UserIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

//metadata.title = "Profile View";

export default function UserProfileView({
  profile,
  user,
}: {
  profile: User;
  user?: User;
}) {
  return (
    <div className="pt-[150px] pb-20">
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        {(profile && (
          <>
            <h1 className={`mb-3 text-2xl font-bold`}>{profile.name}&apos;s Profile</h1>
            <div className="w-full">
              <div>
                <label className="mb-3 mt-5 block text-xs font-medium text-gray-900">
                  Ratings 
                  </label>
                <div className="relative">
                  <input
                    className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                    id="ratings"
                    type="text"
                    name="ratings"
                    placeholder="Enter your ratings"
                    required
                  />
                  <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                  </div>
              </div>
            </div>
            {user && user.id === profile.id && (
              <EditUserLink id={user.id} />
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
