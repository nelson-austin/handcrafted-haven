import { Inter } from "next/font/google";
import styles from "./page.module.css";
import RegisterButton from "./register-button";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function HeroImageContent() {
  return (
    <div
      className={`${styles.heroContent} flex flex-col w-[385px] items-start mx-3 bg-blue-200 p-4 rounded-lg shrink-0 md:w-[640px] lg:w-[63%] mx-3`}
    >
      <p
        className={`${inter.className} text-xl text-gray-900 md:text-3xl md:leading-normal flex-col`}
      >
        <strong>Handcrafted Haven </strong>is an innovative web application that
        aims to provide a platform for artisans and crafters to showcase and
        sell their unique handcrafted items.
      </p>
      <RegisterButton />
    </div>
  );
}
