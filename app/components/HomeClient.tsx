"use client";
import SearchBar from "./SearchBar";
import Banner from "./Banner";
import BookList from "./BookList";
import { useState } from "react";

export default function HomeClient() {
  const [search, setSearch] = useState("");
  return (
    <>
      <SearchBar onSearch={setSearch} />
      <Banner />
      <BookList search={search} />
    </>
  );
}
