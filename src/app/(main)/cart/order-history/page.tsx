import { fetchOrderHistory } from "@/app/lib/data";
import OrderHistoryCard from "./orderHistoryCard";
import { Order } from "@/app/lib/interface";  // Make sure you have the Order interface defined

export default async function OrderHistoryPage() {
  const orderHistory: Order[] | undefined = await fetchOrderHistory();

  return (
    <>
      <section className="pt-[150px] pb-20 md:pt-[160px]">
        <h2 className="text-center text-[33px] font-bold">Order History</h2>
        {orderHistory ? (
          orderHistory.map((order) => (
            <OrderHistoryCard key={order.id} {...order} />
          ))
        ) : (
          <p className="text-center">No order history available.</p>
        )}
      </section>
    </>
  );
}
