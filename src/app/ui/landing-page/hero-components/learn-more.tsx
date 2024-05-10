import styles from "../landing-page.module.css";
import LearnMoreButton from "../buttons/learn-more-button";
import { source_sans_3 } from "@/app/lib/fonts";

export default function LearnMore() {
  return (
    <div
      className={`${styles.heroContent} flex flex-col w-[385px] items-start mx-3 bg-blue-200 p-4 rounded-lg shrink-0 md:w-[640px] lg:w-[63%] mx-3`}
    >
      <p
        className={`${source_sans_3.className} text-xl text-gray-900 md:text-3xl md:leading-normal flex-col`}
      >
        <strong>Handcrafted Haven </strong>is an innovative web application that
        aims to provide a platform for artisans and crafters to showcase and
        sell their unique handcrafted items.
      </p>
      <LearnMoreButton />
    </div>
  );
}
