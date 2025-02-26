import React, { useEffect, useState } from "react";
import { IoIosTimer } from "react-icons/io";

function Card({ country1, country2, endTime, type, onBetClick, bet }) {
  const [timeLeft, setTimeLeft] = useState({});
  const [betActive, setBetActive] = useState(bet);

  useEffect(() => {
    function calculateTimeLeft() {
      if (!endTime) return { days: 0, hours: 0, minutes: 0, seconds: 0, isActive: false };

      const end = parseLocalDate(endTime);
      const now = new Date();
      const difference = end - now - 19800000;

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

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      const newTime = calculateTimeLeft();
      setTimeLeft((prevTime) => (JSON.stringify(prevTime) !== JSON.stringify(newTime) ? newTime : prevTime));

      if (!newTime.isActive) {
        setBetActive(false);
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  return (
    <div className={`bg-white border border-gray-300 rounded-2xl p-6 shadow-lg transition ${
      !betActive ? "opacity-50 cursor-not-allowed" : ""
    }`}>
      <div className="flex justify-between items-center">
        <span className="text-sm font-semibold bg-gray-900 text-white px-4 py-1 rounded-lg">{type}</span>
      </div>

      <div className="text-center mt-4">
        <h3 className="text-xl font-bold text-gray-900">
          {country1} <span className="text-gray-600">vs</span> {country2}
        </h3>
      </div>

      <div className="mt-4 flex flex-col items-center">
        <p className="text-gray-500 flex items-center gap-2 text-sm">
          <IoIosTimer className="text-gray-700 text-lg" /> Bet Ends In:
        </p>

        <div className="mt-2 flex justify-center gap-3">
          {timeLeft?.days > 0 && (
            <div className="bg-gray-800 text-white p-2 rounded-lg text-center w-12">
              <p className="text-xl font-bold">{timeLeft.days}</p>
              <p className="text-sm">Days</p>
            </div>
          )}
          <div className="bg-gray-800 text-white p-2 rounded-lg text-center w-12">
            <p className="text-xl font-bold">{timeLeft.hours}</p>
            <p className="text-sm">Hrs</p>
          </div>
          <div className="bg-gray-800 text-white p-2 rounded-lg text-center w-12">
            <p className="text-xl font-bold">{timeLeft.minutes}</p>
            <p className="text-sm">Min</p>
          </div>
          <div className="bg-gray-800 text-white p-2 rounded-lg text-center w-12">
            <p className="text-xl font-bold">{timeLeft.seconds}</p>
            <p className="text-sm">Sec</p>
          </div>
        </div>
      </div>

      <div className="mt-4">
        {betActive ? (
          <button
            onClick={onBetClick}
            className="w-full bg-gray-900 text-white font-bold py-2 px-4 rounded-xl hover:bg-blue-700 transition-all ease-in-out"
          >
            Bet Now
          </button>
        ) : (
          <button
            className="w-full bg-gray-500 text-gray-300 font-bold py-2 px-4 rounded-xl cursor-not-allowed"
            disabled
          >
            Betting Closed
          </button>
        )}
      </div>
    </div>
  );
}

export default Card;