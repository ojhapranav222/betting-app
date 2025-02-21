import React from "react";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { CiMobile1 } from "react-icons/ci";
import { VscGraph } from "react-icons/vsc";
import { IoShieldCheckmarkOutline } from "react-icons/io5";

function Features() {
  return (
    <div className="bg-white text-gray-900 py-16">
      {/* Title */}
      <h1 className="text-5xl font-extrabold text-center uppercase">
        Why <span className="text-yellow-500 drop-shadow-md">NXT Gamer?</span>
      </h1>

      {/* Features Grid */}
      <div className="grid sm:grid-cols-2 grid-cols-1 sm:grid-rows-2 grid-rows-4 mt-12 px-6 gap-8">
        {[
          {
            icon: <AiOutlineThunderbolt />,
            title: "Instant Payouts",
            desc: "Withdraw your winnings instantly, no delays!",
            bg: "bg-yellow-400",
          },
          {
            icon: <VscGraph />,
            title: "Best Odds",
            desc: "Win BIG with the best betting odds available!",
            bg: "bg-blue-400",
          },
          {
            icon: <IoShieldCheckmarkOutline />,
            title: "100% Secure",
            desc: "Your funds and data are completely safe with us.",
            bg: "bg-green-400",
          },
          {
            icon: <CiMobile1 />,
            title: "Mobile Betting",
            desc: "Bet from anywhere, anytime with our mobile app!",
            bg: "bg-red-400",
          },
        ].map((feature, index) => (
          <div
            key={index}
            className="flex flex-col justify-center items-center gap-4 bg-gray-100 p-6 rounded-xl shadow-lg border-2 border-gray-300 hover:scale-105 transition-transform duration-300"
          >
            <div
              className={`text-5xl h-20 w-20 flex justify-center items-center rounded-full text-white shadow-md ${feature.bg}`}
            >
              {feature.icon}
            </div>
            <h2 className="text-2xl font-bold text-gray-800">{feature.title}</h2>
            <p className="text-lg font-semibold text-gray-600">{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Features;