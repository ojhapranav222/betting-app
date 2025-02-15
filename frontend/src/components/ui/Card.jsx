import React, { useEffect, useState } from "react";
import SpotlightCard from "./Spotlight";
import { IoIosTimer } from "react-icons/io";

function Card({ country1, country2, endTime, type, onBetClick, bet }) {
  const calculateTimeLeft = () => {
    const difference = new Date(endTime) - new Date();
    return difference > 0
      ? {
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / (1000 * 60)) % 60),
          seconds: Math.floor((difference / 1000) % 60),
          isActive: true, // Betting still active
        }
      : { hours: 0, minutes: 0, seconds: 0, isActive: false }; // Betting closed
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [betActive, setBetActive] = useState(bet);

  useEffect(() => {
    const timer = setInterval(() => {
      const time = calculateTimeLeft();
      setTimeLeft(time);

      if (!time.isActive) {
        setBetActive(false); // Disable betting when time is up
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  return (
    <SpotlightCard
      className={`border border-gray-400 bg-gray-950 transition ${
        !betActive ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      <div className="text-white">
        <div className="flex justify-between">
          <h2 className="font-bold bg-gray-900 rounded-xl text-gray-400 px-6 py-1">
            {type}
          </h2>
        </div>
        <p className="flex justify-between text-xl mt-4">
          <span className="font-semibold">{country1}</span> <span>vs</span>
          <span className="font-semibold">{country2}</span>
        </p>

        <div className="flex justify-center mt-4 gap-4">
          <span className="text-gray-400 flex items-center gap-2 text-sm">
            <IoIosTimer /> Bet Ends In:
          </span>
          <div className="text-white bg-gray-800 p-2 rounded-lg text-center w-12">
            <p className="text-xl font-bold">{timeLeft.hours}</p>
            <p className="text-sm">Hrs</p>
          </div>
          <div className="text-white bg-gray-800 p-2 rounded-lg text-center w-12">
            <p className="text-xl font-bold">{timeLeft.minutes}</p>
            <p className="text-sm">Min</p>
          </div>
          <div className="text-white bg-gray-800 p-2 rounded-lg text-center w-12">
            <p className="text-xl font-bold">{timeLeft.seconds}</p>
            <p className="text-sm">Sec</p>
          </div>
        </div>

        {betActive ? (
          <button
            onClick={onBetClick}
            className="mt-4 w-full bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
          >
            Bet Now
          </button>
        ) : (
          <button
            className="mt-4 w-full bg-gray-500 text-gray-300 font-bold py-2 px-4 rounded cursor-not-allowed"
            disabled
          >
            Betting Closed
          </button>
        )}
      </div>
    </SpotlightCard>
  );
}

export default Card;