import HeaderWrapper from "./components/HeaderWrapper";
import CategoryMenu from "./components/CategoryMenu";
import HomeClient from "./components/HomeClient";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <HeaderWrapper />
      <CategoryMenu />
      <HomeClient />
      <footer className="mt-auto bg-green-900 text-white py-6 px-4 text-center text-sm">
        &copy; {new Date().getFullYear()} BookStore. All rights reserved.
      </footer>
    </div>
  );
}
