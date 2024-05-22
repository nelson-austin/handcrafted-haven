import { Lusitana } from "next/font/google";
import { Metadata } from "next";
import ProductGrid from "../ui/products/productGrid";
import RootLayout from "./layout";

export const metadata: Metadata = {
  title: "Products",
};

const lusitana = Lusitana({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const ProductPage = () => {
  return <ProductGrid />;
};

ProductPage.getLayout = function getLayout(page: any) {
  return <RootLayout>{page}</RootLayout>;
};

export default ProductPage;
