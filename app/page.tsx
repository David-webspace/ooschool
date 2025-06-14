import HeaderWrapper from "./components/HeaderWrapper";
import CategoryMenu from "./components/CategoryMenu";
import SearchBar from "./components/SearchBar";
import Banner from "./components/Banner";
import BookList from "./components/BookList";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <HeaderWrapper />
      <CategoryMenu />
      <SearchBar />
      <Banner />
      <BookList />
      <footer className="mt-auto bg-green-900 text-white py-6 px-4 text-center text-sm">
        &copy; {new Date().getFullYear()} BookStore. All rights reserved.
      </footer>
    </div>
  );
}
