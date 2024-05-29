"use client"

import { FormEvent } from "react"
import { getSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { User } from "@/app/lib/interface"
import { useParams } from "next/navigation"
import { setTimeout } from "timers" 

export default function ReviewForm() {
    const router = useRouter()
    const params = useParams()
    var errorMessage = null
    const [user, setUser] = useState({} as User);
    const [review, setReview] = useState('')
    const [rating, setRating] = useState(0)

    async function sendReview(e: FormEvent<HTMLFormElement>) {
        const formData = new FormData(e.currentTarget)
        errorMessage = null
        const response = await fetch("/api/auth/review", {
            method: "POST",
            body: JSON.stringify({
                product_id: formData.get("product_id"),
                user_id: formData.get("user_id"),
                comment: formData.get("review"),
                rating: formData.get("rating"),
            }),
        })
        if(response.ok) {
            setTimeout(() => {
                console.log("Loading...")
              }, 800)
            router.push(`/product/${params.id}`)
            setReview("")
            setRating(0)
        } else {
            errorMessage = response.statusText;
        }
    }
    
    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        errorMessage = null
        {!!user.id || (
            alert("You need to log in!")
        )}
        {!!user.id || router.push(`/login`)}
        {!!user.id && sendReview(e)}
        
    }
    if (user.id === undefined) {
        getSession().then((session) => {
          if (session) {
            setUser(session.user as User);
          }
        });
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    <input type="hidden" name="product_id" value={params.id} />
                </label>
                <label>
                    <input type="hidden" name="user_id" value={user.id || ""} />
                </label>
                <label>
                    <h3>How was the product for you?</h3>
                    <input className="mb-5 shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-[44px] w-[100%] " required type="text" onChange={(e) => setReview(e.target.value)} value={review} name="review" placeholder="Write here..."/>
                </label>
                <label>
                    <h3>How many stars does it deserve?</h3>
                    <div className="flex justify-center space-x-2 mb-4">
                        {[1, 2, 3, 4, 5].map((star) => (
                        <label key={star} className="cursor-pointer">
                            <input
                            type="radio"
                            name="rating"
                            value={star}
                            checked={rating === star}
                            onChange={() => setRating(star)}
                            className="hidden"
                            />
                            <svg
                            className={`w-8 h-8 ${rating >= star ? 'text-yellow-500' : 'text-gray-300'}`}
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            >
                            <path d="M12 .587l3.668 7.568 8.332 1.151-6 5.798 1.415 8.296-7.415-4.08-7.415 4.08 1.415-8.296-6-5.798 8.332-1.151z" />
                            </svg>
                        </label>
                        ))}
                    </div>
                </label>
                <div className="flex justify-center">
                <button className="bg-green-800 w-[100%] m-3 ml-0 mr-0 text-2xl rounded-lg p-2 flex justify-center items-center md:hover:bg-green-700 text-sky-100 md:w-[200px] lg:w-[270px]">Send Review</button>
                </div>
                
            </form>
        </div>
    )
}