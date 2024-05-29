"use client";

import {
  ArrowRightIcon,
  DocumentChartBarIcon,
  ExclamationCircleIcon,
  KeyIcon,
} from "@heroicons/react/20/solid";
import { useFormStatus } from "react-dom";
import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/app/ui/button";
import { useRef, useState, useEffect } from "react";
import UploadWidget from "@/app/ui/uploadWidget";
import { User } from "@/app/lib/interface";

export default function SignupForm({user}: {user: User}) {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");
    const formData = new FormData(e.currentTarget);
    const response = await fetch("/api/auth/update", {
      method: "POST",
      body: JSON.stringify({
        id: user.id,
        name: user.name,
        email: user.email,
        oldPassword: formData.get("oldPassword"),
        password: formData.get("password"),
        business_name: formData.get("business_name"),
        image: formData.get("image"),
        image_id: formData.get("image_id"),
        is_seller: true,
      }),
    });
    if (response.ok) {
      router.push('/dashboard');
      router.refresh();
    }
    
    response.json().then((data) => {
      setErrorMessage(data.message);
    });
  };
    

  const [image, setImage] = useState('');
  const imageRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
      imageRef.current!.value = image;
  }, [image]);

  const [image_id, setImage_id] = useState('');
  const imageIdRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
      imageIdRef.current!.value = image_id;
  }, [image_id]);

  return (
    <form onSubmit={handleSubmit} className="pb-20">
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className={`mb-3 text-2xl`}>Please describe your business.</h1>
        <div className="w-full">
            
            <UploadWidget imageId={image_id} setImageId={setImage_id} imageUrl={image} setImageUrl={setImage} />
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
                  type="text"
                  name="business_name"
                  placeholder="Enter your business name"
                  required
                />
                <DocumentChartBarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>

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
            
            <input ref={imageIdRef} id="image_id" name="image_id" type="hidden"></input>
            <input ref={imageRef} id="image" name="image" type="hidden"></input>
        </div>
        <SignupButton />
        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {errorMessage && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{errorMessage}</p>
            </>
          )}
        </div>
      </div>
    </form>
  );
}

function SignupButton() {
  const { pending } = useFormStatus();

  return (
    <Button className="font-bold bg-green-900 text-white m-5 p-2 rounded-md hover:bg-green-300 hover:text-black" aria-disabled={pending}>
      Register Selling Account <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
    </Button>
  );
}
