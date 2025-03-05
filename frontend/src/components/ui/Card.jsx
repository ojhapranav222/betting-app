import React, { useEffect, useState } from "react";
import { IoIosTimer } from "react-icons/io";

function Card({ country1, country2, endTime, type, onBetClick, bet }) {
  const [betActive, setBetActive] = useState(false);

  useEffect(() => {
    const checkBetStatus = () => {
      const now = new Date().getTime();
      const betEndTime = new Date(endTime).getTime();
      setBetActive(now < betEndTime);
    };

    checkBetStatus();
    const interval = setInterval(checkBetStatus, 1000);

    return () => clearInterval(interval);
  }, [endTime]);

  return (
    <div className={`bg-yellow-50 border border-gray-300 rounded-2xl p-6 shadow-lg transition ${
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
          <IoIosTimer className="text-gray-700 text-lg" /> Bet End Date:{" "}
          <span className="font-semibold">{new Date(endTime).toISOString().split("T")[0]}</span>
        </p>
        <p className="text-gray-500 flex items-center gap-2 text-sm">
          <IoIosTimer className="text-gray-700 text-lg" /> Bet End Time:{" "}
          <span className="font-semibold">{new Date(endTime).toISOString().split("T")[1].split(".")[0]}</span>
        </p>
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