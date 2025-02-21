import React from "react";
import { AiFillStar } from "react-icons/ai";

const reviews = [
  {
    name: "Rahul Sharma",
    rating: 5,
    review: "Absolutely love the platform! Fast payouts and great odds.",
    img: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Priya Verma",
    rating: 4,
    review: "Good experience overall, but customer support could be faster.",
    img: "https://randomuser.me/api/portraits/women/45.jpg",
  },
  {
    name: "Amit Patel",
    rating: 5,
    review: "Best betting site! Secure, reliable, and easy to use.",
    img: "https://randomuser.me/api/portraits/men/64.jpg",
  },
  {
    name: "Sneha Gupta",
    rating: 4,
    review: "The odds are better than other platforms, but withdrawal takes time.",
    img: "https://randomuser.me/api/portraits/women/30.jpg",
  },
  {
    name: "Vikram Joshi",
    rating: 3,
    review: "Decent platform, but needs improvement in live betting features.",
    img: "https://randomuser.me/api/portraits/men/75.jpg",
  },
  {
    name: "Anjali Mehta",
    rating: 5,
    review: "Super smooth UI and instant deposits. Highly recommended!",
    img: "https://randomuser.me/api/portraits/women/22.jpg",
  },
];

function ReviewSection() {
  return (
    <div className="bg-white py-16 px-6 text-center">
      <h2 className="text-4xl font-bold text-gray-900">What Our Users Say</h2>
      <p className="text-gray-600 text-lg mt-2">Trusted by thousands of players</p>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((user, index) => (
          <div
            key={index}
            className="bg-gray-100 p-6 rounded-lg shadow-md flex flex-col items-center text-center"
          >
            <img
              src={user.img}
              alt={user.name}
              className="w-16 h-16 rounded-full border-2 border-yellow-500"
            />
            <h3 className="text-xl font-semibold mt-3">{user.name}</h3>
            <div className="flex text-yellow-400 text-xl mt-2">
              {[...Array(user.rating)].map((_, i) => (
                <AiFillStar key={i} />
              ))}
              {[...Array(5 - user.rating)].map((_, i) => (
                <AiFillStar key={i} className="opacity-30" />
              ))}
            </div>
            <p className="text-gray-700 mt-3">{user.review}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReviewSection;