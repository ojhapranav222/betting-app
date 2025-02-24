import React from "react";
import Navbar from "../Navbar";
import GradientText from "../ui/GradientText";
import { Link } from "react-router-dom";
import useSmallScreen from "../ui/SmallScreen";

function Main() {
  const isSmallScreen = useSmallScreen();

  return (
    <div
      className="relative w-full h-screen overflow-hidden flex flex-col"
    >
      <Navbar />

      {/* Content */}
      <div className="w-full h-full flex justify-center items-center px-6 text-gray-900">
        <div className="relative z-10 flex flex-col items-center sm:items-start text-center sm:text-left gap-6">
          <h1 className="text-5xl sm:mt-0 mt-10 sm:text-7xl font-extrabold leading-tight">
            The Ultimate{" "}
            <GradientText
  colors={["#0033A0", "#0047AB", "#0085CA"]}
  animationSpeed={2}
  showBorder={false}
  className="uppercase pr-4 py-1 font-bold"
>
  Cricket Betting Arena
</GradientText>

          </h1>
          <p className="text-xl font-medium text-gray-700 max-w-xl">
            Bet on your favorite teams, predict match outcomes, and win big. Experience cricket like never before!
          </p>
          <div className="flex gap-6 mt-4">
            <Link to="/games">
              <button className="text-xl bg-green-600 hover:bg-green-500 border border-green-500 rounded-full sm:px-8 sm:py-3 px-4 py-1 text-white transition-all duration-300 shadow-md">
                Start Betting
              </button>
            </Link>
            <Link to="/games">
              <button className="text-xl bg-yellow-400 hover:bg-yellow-300 border border-yellow-500 rounded-full sm:px-8 sm:py-3 px-4 py-1 text-black transition-all duration-300 shadow-md">
                View Live Matches
              </button>
            </Link>
          </div>
        </div>

        {/* Cricket Visual */}
        {!isSmallScreen && (
          <img
            src="/cricket.png"
            alt="Cricket Stadium"
            className="w-[35rem] drop-shadow-lg"
          />
        )}
      </div>
    </div>
  );
}

export default Main;