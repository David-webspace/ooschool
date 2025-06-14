const categories = [
  { name: "New Releases", slug: "new" },
  { name: "Bestsellers", slug: "bestsellers" },
  { name: "Children's Books", slug: "children" },
  { name: "Foreign Books", slug: "foreign" },
  { name: "Fiction", slug: "fiction" },
  { name: "Non-Fiction", slug: "nonfiction" },
  { name: "Comics", slug: "comics" },
  { name: "Lifestyle", slug: "lifestyle" },
];

export default function CategoryMenu() {
  return (
    <nav className="w-full bg-white shadow-md py-2 px-4 flex flex-wrap gap-4 justify-center mb-6">
      {categories.map((cat) => (
        <a
          key={cat.slug}
          href={`/category/${cat.slug}`}
          className="text-green-800 hover:bg-green-100 px-3 py-1 rounded transition-colors"
        >
          {cat.name}
        </a>
      ))}
    </nav>
  );
}
