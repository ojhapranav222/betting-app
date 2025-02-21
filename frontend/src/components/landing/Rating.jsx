import React from "react";
import { AiFillStar } from "react-icons/ai";

function RatingsHero() {
  const ratingData = [
    { stars: 5, count: 1200, color: "bg-yellow-400" },
    { stars: 4, count: 100, color: "bg-blue-400" },
    { stars: 3, count: 50, color: "bg-green-400" },
    { stars: 2, count: 25, color: "bg-orange-400" },
    { stars: 1, count: 10, color: "bg-red-400" },
  ];

  const totalReviews = ratingData.reduce((acc, item) => acc + item.count, 0);

  return (
    <div className="bg-white py-20 px-8 flex flex-col sm:flex-row items-center justify-around shadow-lg">
      {/* Left Side: Large Rating */}
      <div className="text-center sm:text-left">
        <h2 className="text-5xl font-extrabold text-gray-900">User Ratings</h2>
        <div className="flex items-center gap-4 mt-6">
          <span className="text-6xl sm:text-8xl font-extrabold text-yellow-500">4.5</span>
          <div className="flex text-yellow-400 text-5xl sm:text-6xl">
            {[...Array(5)].map((_, i) => (
              <AiFillStar key={i} className={i === 4 ? "opacity-50" : ""} />
            ))}
          </div>
        </div>
        <p className="text-xl text-gray-600 mt-2">{totalReviews} Reviews</p>
      </div>

      {/* Right Side: Rating Breakdown */}
      <div className="mt-8 sm:mt-0 w-full max-w-md">
        {ratingData.map((item, index) => (
          <div key={index} className="flex items-center gap-4 mb-3">
            <span className="font-bold text-lg w-8">{item.stars}★</span>
            <div className="w-full bg-gray-300 rounded-full h-5 relative">
              <div
                className={`h-5 rounded-full ${item.color}`}
                style={{
                  width: `${(item.count / totalReviews) * 100}%`,
                }}
              ></div>
            </div>
            <span className="font-semibold text-gray-700">{item.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RatingsHero;