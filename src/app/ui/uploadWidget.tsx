import { CldUploadButton } from 'next-cloudinary';
import { CameraIcon, CheckIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useState } from 'react';

export default function Page({
    imageId,
    imageUrl,
    setImageId,
    setImageUrl,
}: {
    imageId: string;
    imageUrl: string;
    setImageId: React.Dispatch<React.SetStateAction<string>>;
    setImageUrl: React.Dispatch<React.SetStateAction<string>>;
}) {

    const [message, setMessage] = useState('');
    // setMessage(''); // reset message on new page load

    return (
    <CldUploadButton
        options={{
            publicId: imageId,
            sources: ["local", "unsplash", "url", "google_drive", "dropbox", "camera"],
            multiple: false,
        }}
        signatureEndpoint="/api/sign-cloudinary-params"
        onSuccess={(result: any) => {
            if (result.info) { 
                setImageUrl(result.info.secure_url);
                setImageId(result.info.public_id);
                setMessage('Upload Success! ');
                console.log(result.info); 
            }
        }}
        uploadPreset="ml_default"
    >
        <div className="grid">
            <div className={`col-[1] row-[1] z-[2] relative flex justify-center items-center 
                ${imageUrl ? 'opacity-0 hover:opacity-80' : ''}`}>
                <CameraIcon className="w-28 m-auto h-28 p-7 bg-slate-200 hover:bg-slate-100 rounded-[50%]" />
            </div>
            {imageUrl
                ?
                <Image key={Date.now()} className="col-[1] row-[1] z-[1] relative m-auto"
                src={imageUrl}
                width={300}
                height={300}
                alt="my image"
                />
                : <p className='text-[1.2em] p-3'>Upload Image</p>}

            {message
                ? <span className='text-[1.2em] p-3 text-green-900'>{message}<CheckIcon className='w-8 inline'/></span>
                : <></>}
        </div>
        </CldUploadButton>
    )
}