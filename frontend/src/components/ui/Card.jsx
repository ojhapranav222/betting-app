import React, { useState } from 'react';
import SpotlightCard from './Spotlight';
import { CgMediaLive } from "react-icons/cg";
import { IoIosTimer } from "react-icons/io";

function Card({ country1, country2, point1, point2, isLive, startingIn, type, onCardClick }) {

  return (
      <SpotlightCard className='border border-gray-400 bg-gray-950' onClick={onCardClick}>
        <div className="text-white">
          <div className='flex justify-between'>
            <h2 className="font-bold bg-gray-900 rounded-xl text-gray-400 px-6 py-1">{type}</h2>
            <div>
              {isLive ? (
                <span className="text-red-500 font-bold flex items-center gap-2 text-sm">
                  <CgMediaLive /> LIVE
                </span>
              ) : (
                <span className="text-gray-400 flex items-center gap-2 text-sm">
                  <IoIosTimer /> Start Time: {startingIn}
                </span>
              )}
            </div>
          </div>
          <p className="flex justify-between text-xl mt-4">
            <span className="font-semibold">{country1}</span> <span>vs{" "}</span>
            <span className="font-semibold">{country2}</span>
          </p>
          <div className='flex justify-between mt-2'>
            <p className="text-white bg-green-600 py-1 px-6 rounded-lg">{point1}</p>
            <p className="text-white bg-green-600 py-1 px-6 rounded-lg">{point2}</p>
          </div>
        </div>
      </SpotlightCard>
  );
}

export default Card;