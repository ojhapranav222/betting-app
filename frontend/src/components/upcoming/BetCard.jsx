import React from 'react'

function BetCard() {
  return (
    <div className='text-white w-[35%] mt-24 bg-gray-900 p-4 rounded-xl'>
        <div className='flex gap-6 font-semibold'>
            <button className='hover:bg-transparent rounded-full px-6 py-1' style={{background: 'linear-gradient(135deg, #0D47A1, #1565C0, #2196F3, #43A047)'}}>My Bets</button>
            <button className='hover:bg-transparent rounded-full px-6 py-1' style={{background: 'linear-gradient(135deg, #0D47A1, #1565C0, #2196F3, #43A047)'}}>BetSlip</button>
        </div>
        <h2 className='font-bold py-32 text-xl text-center'>Your Bet Slip is Empty</h2>
    </div>
  )
}

export default BetCard