import React from "react";
import Navbar from "../Navbar";
import Waves from "../ui/WaveLines";
import GradientText from "../ui/GradientText";

function Main() {
  return (
    <div className="relative w-full h-screen overflow-hidden" style={{background: 'linear-gradient(135deg, #0D47A1, #1565C0, #2196F3, #43A047)'}}>
        <Navbar />
      {/* div overlay */}
      <div className="w-full h-screen absolute opacity-30">
      <Waves
        lineColor="#fff"
        backgroundColor="rgba(255, 255, 255, 0.2)"
        waveSpeedX={0.02}
        waveSpeedY={0.01}
        waveAmpX={40}
        waveAmpY={20}
        friction={0.9}
        tension={0.01}
        maxCursorMove={120}
        xGap={12}
        yGap={36}
        />
      </div>

      {/* Content over the video */}
      <div className="w-full h-screen flex justify-around items-center relative">
        <div className="relative z-10 flex flex-col items-center justify-center gap-4 h-full text-white">
            <h1 className="text-6xl font-bold gap-2">Welcome to the Ultimate
            <GradientText
            colors={["#40ffaa", "#FFC107", "#FFEB3B", "#FF5722", "#FDD835"]}
            animationSpeed={3}
            showBorder={false}
            className="uppercase px-6 py-1 font-bold"
            >
            Cricket Experience
            </GradientText>
            </h1>
            <p className="font-semibold text-xl text-center">Join thousands of players and experience the thrill of our premium <br /> casino games with incredible bonuses.</p>
            <div className="flex gap-4 mt-4">
                <button className="text-xl bg-transparent hover:bg-white hover:text-black border border-white rounded-full px-6 py-2 text-white transition-all duration-300">Bet Now</button>
                <button className="text-xl bg-white hover:bg-transparent hover:text-white border border-white rounded-full px-6 py-2 text-black transition-all duration-300">View Live Matches</button>
            </div>
        </div>
        <img src="/cricket.png" alt="" className="w-[30rem]" />
      </div>
    </div>
  );
};

export default Main;