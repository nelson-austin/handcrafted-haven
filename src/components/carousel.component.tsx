export default function Carousel({ slides }: any) {
  return (
    <div className="">
      {slides.map((slide: any) => {
        return <div>{slide}</div>;
      })}
    </div>
  );
}
