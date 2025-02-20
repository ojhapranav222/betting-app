import React, { useEffect, useState } from "react";
import SpotlightCard from "./Spotlight";
import { IoIosTimer } from "react-icons/io";

function Card({ country1, country2, endTime, type, onBetClick, bet }) {
  function calculateTimeLeft() {
    if (!endTime) {
        console.error("endTime is undefined or null");
        return { days: 0, hours: 0, minutes: 0, seconds: 0, isActive: false };
    }

    // Manually extract year, month, day, hours, minutes, and seconds
    const [year, month, day, hours, minutes, seconds] = endTime
        .replace("T", " ") // Ensure format consistency
        .replace("Z", "") // Remove trailing Z if present
        .split(/[- :]/); // Split by -, space, or :

    // Construct a date in IST (manually)
    const end = new Date(year, month - 1, day, hours, minutes, seconds);

    console.log("Stored End Time:", endTime);
    console.log("Parsed End Time (IST):", end);

    const now = new Date();
    const difference = end - now;

    if (difference > 0) {
        return {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / (1000 * 60)) % 60),
            seconds: Math.floor((difference / 1000) % 60),
            isActive: true,
        };
    } else {
        return { days: 0, hours: 0, minutes: 0, seconds: 0, isActive: false };
    }
  }


  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [betActive, setBetActive] = useState(bet);

  useEffect(() => {
    const timer = setInterval(() => {
        const time = calculateTimeLeft();
        
        setTimeLeft(prevTime => {
            if (JSON.stringify(prevTime) !== JSON.stringify(time)) {
                return time; // Only update if there's a change
            }
            return prevTime; // Prevent unnecessary re-renders
        });

        if (!time.isActive) {
            setBetActive(false);
            clearInterval(timer); // Stop interval when expired
        }
    }, 1000);

    return () => clearInterval(timer); // Cleanup on unmount
  }, []); // ✅ Empty dependency array, runs only once



  return (
    <SpotlightCard
      className={`border-2 border-black transition bg-custom-gradient ${
        !betActive ? "opacity-50 cursor-not-allowed" : ""
      }`
    }
    >
      <div className="text-white">
        <div className="flex justify-between">
          <h2 className="font-bold bg-gray-900 rounded-xl text-gray-400 px-6 py-1">
            {type}
          </h2>
        </div>
        <p className="flex justify-between text-xl mt-4 text-gray-900">
          <span className="font-semibold">{country1}</span> <span>vs</span>
          <span className="font-semibold">{country2}</span>
        </p>

        <div className="flex justify-center mt-4 gap-4">
          <span className="text-gray-400 flex items-center gap-2 text-sm">
            <IoIosTimer /> Bet Ends In:
          </span>

          {timeLeft?.days !== 0 && (<div className="text-white bg-gray-800 p-2 rounded-lg text-center w-12">
            <p className="text-xl font-bold">{timeLeft.days}</p>
            <p className="text-sm">Days</p>
          </div>)}
          {timeLeft?.hours != 0 && (<div className="text-white bg-gray-800 p-2 rounded-lg text-center w-12">
            <p className="text-xl font-bold">{timeLeft.hours}</p>
            <p className="text-sm">Hrs</p>
          </div>)}
          {timeLeft?.minutes != 0 && (
          <div className="text-white bg-gray-800 p-2 rounded-lg text-center w-12">
            <p className="text-xl font-bold">{timeLeft.minutes}</p>
            <p className="text-sm">Min</p>
          </div>)}
          <div className="text-white bg-gray-800 p-2 rounded-lg text-center w-12">
            <p className="text-xl font-bold">{timeLeft.seconds}</p>
            <p className="text-sm">Sec</p>
          </div>
        </div>

        {betActive ? (
          <button
            onClick={onBetClick}
            className="mt-4 w-full bg-gray-900 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition-all ease-in-out"
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