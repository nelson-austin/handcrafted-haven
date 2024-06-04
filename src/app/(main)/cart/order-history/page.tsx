import { fetchOrderHistory } from "@/app/lib/data";
import OrderHistoryCard from "./orderHistoryCard";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Order History",
};

export default async function OrderHistoryPage() {
  const orderHistory = await fetchOrderHistory();

  return (
    <>
      <div className="pt-[10px] pb-10">
        <h2 className="text-center text-[33px] font-bold">
          Your Order History
        </h2>
        {orderHistory.length === 0 ? (
          <Link href={"/"}>
            <p className="text-center text-[23px]">
              You have no order history available.
            </p>
            <div className="flex items-center justify-center gap-3 pt-1 text-gray-400 md:hover:text-gray-500">
              {/* SVG icon for the continue shopping link */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-9 h-9"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
                />
              </svg>
              <p className="text-[38px]">Continue Shopping</p>
            </div>
          </Link>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 place-items-center">
            {orderHistory.map((order) => {
              return (
                <OrderHistoryCard
                  image_id={""}
                  id={""}
                  user_id={""}
                  quantity_available={0}
                  product_id={""}
                  //quantity={0} TODO: Fix this
                  //total_price={0} TODO: Fix this
                  name={""}
                  image={""}
                  description={""}
                  price={0}
                  key={order.id}
                  {...order}
                />
              );
            })}
            <Link href={"/cart"}>
              <div className="flex items-center justify-center gap-3 pt-1 text-gray-400 md:hover:text-gray-500">
                {/* SVG icon for the back to cart link */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-9 h-9"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
                  />
                </svg>
                <p className="text-[38px]">Back to cart</p>
              </div>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
