export default function Banner() {
  return (
    <section className="w-full bg-yellow-100 py-8 px-4 flex flex-col items-center gap-4 text-center">
      <h2 className="text-3xl font-bold text-green-800">Welcome to BookStore!</h2>
      <p className="max-w-2xl text-lg text-green-900">
        Discover bestsellers, new releases, and exclusive deals. Find your next favorite book today!
      </p>
      <div className="flex gap-4 flex-wrap justify-center">
        <button className="bg-green-700 text-white px-6 py-2 rounded hover:bg-green-800">Shop Now</button>
        <button className="bg-white border border-green-700 text-green-700 px-6 py-2 rounded hover:bg-green-50">See Promotions</button>
      </div>
    </section>
  );
}
