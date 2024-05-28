'use client';

import { useParams } from "next/navigation";

export default function OrderDetail() {
    const params = useParams();

    return (
        <div>
        <h1>Order Detail</h1>
        </div>
    );
}