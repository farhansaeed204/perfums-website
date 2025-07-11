"use client"
import Image from "next/image";
import React, { useState, useMemo } from "react";

const mensPerfumes = [
  {
    id: 1,
    name: "Ocean Breeze",
    image: "/pictures/mens1.png",
    price: 2000,
    discountPrice: 1500,
  },
  {
    id: 2,
    name: "Mountain Mist",
    image: "/pictures/mens2.png",
    price: 1800,
    discountPrice: 1400,
  },
];

const womensPerfumes = [
  {
    id: 1,
    name: "Rose Blossom",
    image: "/pictures/womens1.png",
    price: 2200,
    discountPrice: 1700,
  },
  {
    id: 2,
    name: "Lavender Dream",
    image: "/pictures/womens2.png",
    price: 2100,
    discountPrice: 1600,
  },
];

const whatsappNumber = "03402558440"; // Replace with your WhatsApp number including country code without '+' sign

function openWhatsApp(productName: string) {
  const message = `Hello, I am interested in buying the perfume: ${productName}`;
  const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Combine all perfumes into one list for searching
  const allPerfumes = useMemo(() => [...mensPerfumes, ...womensPerfumes], []);

  // Filter perfumes based on search term (case insensitive)
  const filteredPerfumes = useMemo(() => {
    if (!searchTerm.trim()) return allPerfumes;
    return allPerfumes.filter((perfume) =>
      perfume.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, allPerfumes]);

  // Suggestions for autocomplete dropdown (limit to 5)
  const suggestions = useMemo(() => {
    if (!searchTerm.trim()) return [];
    return allPerfumes
      .filter((perfume) =>
        perfume.name.toLowerCase().startsWith(searchTerm.toLowerCase())
      )
      .slice(0, 5);
  }, [searchTerm, allPerfumes]);

  function handleSuggestionClick(name: string) {
    setSearchTerm(name);
    setShowSuggestions(false);
  }

  return (
    <>
      <div className="min-h-screen bg-gray-100 text-gray-900 font-sans">
<div className="flex items-center justify-between mb-12 border-b border-gray-700 pb-6 shadow-lg bg-gray-800 px-6">
<div className="flex items-end gap-6">
<Image
  src="/pictures/logo.png"
  alt="Fragnace Logo"
  width={60}
  height={60}
  className="mb-0 mt-4 object-contain"
/>
<h1 className="text-lg xs:text-xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-wide font-serif">
              SK Fragnance
            </h1>
          </div>
          {/* Search input */}
          <div className="relative w-full max-w-xs sm:max-w-sm mt-4">
            <input
              type="text"
              placeholder="Search perfumes..."
              className="w-full px-3 py-2 rounded-lg border border-gray-600 bg-gray-800 text-white text-sm focus:outline-none focus:ring-4 focus:ring-green-500 shadow-md transition duration-300"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => {
                // Delay hiding suggestions to allow click
                setTimeout(() => setShowSuggestions(false), 150);
              }}
            />
            {showSuggestions && suggestions.length > 0 && (
              <ul className="absolute z-20 w-full bg-gray-800 border border-gray-600 rounded-lg mt-1 max-h-52 overflow-auto shadow-xl">
                {suggestions.map((suggestion) => (
                  <li
                    key={suggestion.id + suggestion.name}
                    className="px-5 py-3 cursor-pointer text-white hover:bg-green-700 transition duration-200 rounded-lg"
                    onMouseDown={() => handleSuggestionClick(suggestion.name)}
                  >
                    {suggestion.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
          <main className="max-w-6xl mx-auto px-2 sm:px-4">
          {/* Hero Section */}
          <section className="hero-section flex items-center justify-center text-center text-white mb-16 mt-4 px-2 sm:px-0">
            <div className="px-4 max-w-2xl">
              <h1 className="text-3xl xs:text-4xl md:text-6xl font-serif font-bold mb-4 text-gray-800">
                Timeless Scents for Every Mood
              </h1>
              <p className="text-lg xs:text-xl mb-8 text-gray-800">
                Discover our exquisite collection of premium perfumes crafted with passion
              </p>
              {/* Removed the Explore Collections button as requested */}
            </div>
          </section>

          {/* Men's Collection */}
          <section className="mb-16 px-2 sm:px-0">
            <h2 className="text-2xl xs:text-3xl font-semibold mb-8 text-gray-800 tracking-wide font-serif">
              Men's Collection
            </h2>
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 xs:gap-8">
              {mensPerfumes.map((perfume) => (
                <div
                  key={perfume.id}
                  className="bg-gray-800 rounded-xl shadow-lg p-4 xs:p-6 flex flex-col items-center transform transition duration-300 hover:scale-105 hover:shadow-2xl"
                >
                  <Image
                    src={perfume.image}
                    alt={perfume.name}
                    width={140}
                    height={140}
                    className="rounded-xl object-cover"
                  />
                  <h3 className="mt-4 text-base xs:text-lg sm:text-xl md:text-2xl font-semibold text-white font-serif">
                    {perfume.name}
                  </h3>
                  <div className="mt-2 xs:mt-3">
                    <span className="text-gray-500 line-through mr-2 xs:mr-3 text-sm xs:text-lg">
                      ₹{perfume.price}
                    </span>
                    <span className="text-red-600 font-bold text-sm xs:text-lg">
                      ₹{perfume.discountPrice}
                    </span>
                  </div>
                  <button
                    onClick={() => openWhatsApp(perfume.name)}
                    className="mt-4 xs:mt-6 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 xs:py-3 px-6 xs:px-8 rounded-lg shadow-lg transition duration-300"
                  >
                    Buy Now
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Women's Collection */}
          <section className="px-2 sm:px-0">
            <h2 className="text-2xl xs:text-3xl font-semibold mb-8 text-gray-800 tracking-wide font-serif">
              Women's Collection
            </h2>
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 xs:gap-8">
              {womensPerfumes.map((perfume) => (
                <div
                  key={perfume.id}
                  className="bg-gray-800 rounded-xl shadow-lg p-4 xs:p-6 flex flex-col items-center transform transition duration-300 hover:scale-105 hover:shadow-2xl"
                >
                  <Image
                    src={perfume.image}
                    alt={perfume.name}
                    width={140}
                    height={140}
                    className="rounded-xl object-cover"
                  />
                  <h3 className="mt-4 text-base xs:text-lg sm:text-xl md:text-2xl font-semibold text-white font-serif">
                    {perfume.name}
                  </h3>
                  <div className="mt-2 xs:mt-3">
                    <span className="text-gray-500 line-through mr-2 xs:mr-3 text-sm xs:text-lg">
                      ₹{perfume.price}
                    </span>
                    <span className="text-red-600 font-bold text-sm xs:text-lg">
                      ₹{perfume.discountPrice}
                    </span>
                  </div>
                  <button
                    onClick={() => openWhatsApp(perfume.name)}
                    className="mt-4 xs:mt-6 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 xs:py-3 px-6 xs:px-8 rounded-lg shadow-lg transition duration-300"
                  >
                    Buy Now
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* About Section */}
<section
  id="about"
  className="mb-16 bg-gray-800 rounded-xl shadow-lg p-8 max-w-4xl mx-auto mt-4"
>
            <h2 className="text-4xl font-bold mb-6 text-gray-100 text-center tracking-wide font-serif">
              About Luxe Perfumes
            </h2>
            <p className="text-gray-300 text-center text-lg leading-relaxed font-serif">
              Luxe Perfumes is dedicated to providing high-quality, unique fragrances for
              both men and women. Our carefully curated collections are designed to
              evoke emotions and create lasting impressions. Experience the essence
              of elegance and charm with every scent.
            </p>
          </section>
        </main>
        <footer className="bg-gray-900 border-t border-gray-700 py-8 mt-16">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center px-6">
            <p className="text-gray-400 mb-6 sm:mb-0 font-serif">
              &copy; {new Date().getFullYear()} Luxe Perfumes. All rights reserved.
            </p>
            <div className="flex gap-8">
              <a
                href="https://instagram.com/luxeperfumes"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-600 hover:text-pink-400 transition duration-300"
                aria-label="Instagram"
              >
                Instagram
              </a>
              {/* <a
                href="https://example.comt"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-400 transition duration-300"
                aria-label="Contact"
              >
                Contact
              </a> */}
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
