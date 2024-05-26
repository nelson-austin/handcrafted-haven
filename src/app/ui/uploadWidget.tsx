import { CldUploadButton } from 'next-cloudinary';
import { CameraIcon, PhotoIcon } from "@heroicons/react/24/outline";

export default function Page({
    imageId,
    setImageId,
    setImageUrl,
}: {
    imageId: string;
    setImageId: React.Dispatch<React.SetStateAction<string>>;
    setImageUrl: React.Dispatch<React.SetStateAction<string>>;
}) {
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
                setImageId(result.info.public_id) 
                console.log(result.info); 
            }
        }}
        uploadPreset="ml_default"
    >
        <CameraIcon className="w-28 m-auto h-28 p-7 bg-slate-200 hover:bg-slate-100 rounded-[50%]" />
        </CldUploadButton>
    )
}