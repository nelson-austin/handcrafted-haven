"use client";

import {
  AtSymbolIcon,
  ExclamationCircleIcon,
  KeyIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { useFormStatus } from "react-dom";
import { FormEvent } from "react";
import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { getSession, useSession } from "next-auth/react";
import { Button } from "@/app/ui/button";
import { User } from "@/app/lib/interface";
import UploadWidget from "@/app/ui/uploadWidget";

export default function UpdateUserForm({
  imageUrl,
  imageId,
}: {
  imageUrl: string;
  imageId: string;
}) {
  const router = useRouter();
  const params = useParams();
  const { data: session, update, status } = useSession();

  const [user, setUser] = useState({} as User);

  if (user.id === undefined) {
    if (session !== null) setUser(session.user as User);
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");
    const formData = new FormData(e.currentTarget);
    const response = await fetch("/api/auth/update", {
      method: "POST",
      body: JSON.stringify({
        id: params.id,
        name: formData.get("name"),
        email: formData.get("email"),
        oldPassword: formData.get("oldPassword"),
        password: formData.get("password"),
        business_name: formData.get("business_name"),
        image: formData.get("image"),
        image_id: formData.get("image_id"),
        is_seller: user.is_seller,
      }),
    });
    if (response.ok) {
      await update({user: user});
      router.push(`/profile/${params.id}`);
      router.refresh();
    }

    response.json().then((data) => {
      setErrorMessage(data.message);
    });
  };
  const [image, setImage] = useState(imageUrl);
  const imageRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    imageRef.current!.value = image;
  }, [image]);

  const [image_id, setImage_id] = useState(imageId);
  const imageIdRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    imageIdRef.current!.value = image_id;
  }, [image_id]);
  // checked state and the onChange method
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <form onSubmit={handleSubmit} className="pb-20">
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className={`mb-3 text-2xl`}>Edit your profile</h1>
        {user.is_seller && (
          <UploadWidget
            imageId={image_id !== "undefined" ? image_id : ""}
            setImageId={setImage_id}
            imageUrl={image !== "undefined" ? image : ""}
            setImageUrl={setImage}
          />
        )}
        <input
          ref={imageIdRef}
          id="image_id"
          name="image_id"
          type="hidden"
        ></input>
        <input ref={imageRef} id="image" name="image" type="hidden"></input>
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="name"
            >
              Name
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="name"
                type="name"
                name="name"
                onChange={(e) => {
                  setUser({ ...user, name: e.target.value });
                }}
                value={user.name}
                placeholder="Enter your name"
                required
              />
              <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="email"
                type="email"
                name="email"
                onChange={(e) => {
                  setUser({ ...user, email: e.target.value });
                }}
                value={user.email}
                placeholder="Enter your email address"
                required
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          {user.is_seller && (
            <div>
              <label
                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                htmlFor="business_name"
              >
                Business Name
              </label>
              <div className="relative">
                <input
                  className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                  id="business_name"
                  onChange={(e) => {
                    setUser({ ...user, business_name: e.target.value });
                  }}
                  value={user.business_name}
                  type="text"
                  name="business_name"
                  placeholder="Enter your business_name"
                  required
                />
                <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
          )}
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="oldPassword"
            >
              Old Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="oldPassword"
                type="password"
                name="oldPassword"
                placeholder="Enter old password"
                required
                minLength={8}
                maxLength={50}
                pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$"
                title="Password must contain at least one uppercase letter, one lowercase letter, and one number and be between 8 and 50 characters long."
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                minLength={8}
                maxLength={50}
                pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$"
                title="Password must contain at least one uppercase letter, one lowercase letter, and one number and be between 8 and 50 characters long."
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        <UpdateUserButton />
        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {(errorMessage && errorMessage !== "Success" && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{errorMessage}</p>
            </>
          )) ||
            (errorMessage && (
              <>
                <ExclamationCircleIcon className="h-5 w-5 text-green-700" />
                <p className="text-sm text-green-700">{errorMessage}</p>
              </>
            ))}
        </div>
      </div>
    </form>
  );
}

function UpdateUserButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      className="font-bold bg-green-900 text-white m-5 p-2 rounded-md hover:bg-green-300 hover:text-black"
      aria-disabled={pending}
    >
      Update Profile <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
    </Button>
  );
}
