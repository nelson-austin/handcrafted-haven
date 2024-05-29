const year = new Date();

export default function Footer() {
  return (
    <footer>
      <div className="h-25 shrink-0 bg-green-800 rounded-lg m-3 md:h-40">
        <p className="text-sky-100 p-10">
          &bull; Handcrafted Haven &copy; <span>{year.getFullYear()}</span> All
          Rights Reserved &bull;
        </p>
      </div>
    </footer>
  );
}
