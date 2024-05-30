import Link from "next/link"
export default function ThankYouPage() {
    return ( 
    <div>
        <div className="pl-3 pr-3 overflow-y-clip">
            <div className="flex flex-col rounded-xl items-left justify-left p-3 bg-blue-100 mt-5">
                <p className="flex justify-center pt-10 pl-10 pr-10 text-center  text-[3rem]">Your purchase has been successful!</p>
                <p className="flex justify-center text-center pl-10 pr-10 pb-0 text-[2rem]">Thank for buying our products.</p> 
                <p className="flex justify-center text-center  pl-10 pr-10 pb-10 text-[2rem]">Do not for get to check out our new products!</p>
            </div>
        </div>
        <Link href={"/"}>
                <div className="flex items-center justify-center pt-4 text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
                    />
                  </svg>
                  <p>Continue Shopping</p>
                </div>
        </Link>
    </div> 
)}