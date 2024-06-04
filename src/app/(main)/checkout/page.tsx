import CheckForm from "./CheckForm";
import CheckoutCarousel  from "./checkoutCarousel";
import CheckoutCard from "./checkoutCard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout",
};

export default function CheckOutPage() {
  return (
    <>
      <div className=" overflow-y-clip">
        <div className="flex items-center justify-center rounded-xl  p-3 bg-blue-100 mt-5">
          <div className="flex flex-col md:flex-row-reverse ">
            <div className="block bg-gray-50  rounded-xl overflow-hidden shadow-lg mx-4 my-4 p-5 md:min-w-[25rem] lg:w-[30rem]">
              <h2 className="pl-[20px] text-[2rem] font-semibold text-gray-800 flex justify-center">
                Review Your Order
              </h2>
              <section className="p-[0.5rem]">
                <CheckForm />
              </section>
            </div>

            <div className="hidden md:block pb-10">
              <CheckoutCard />
            </div>
            <div className="block pb-10 md:hidden">
              <CheckoutCarousel />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
