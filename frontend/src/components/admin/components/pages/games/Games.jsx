import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "../../ui/button";
import { FiSearch, FiPlus, FiTrash } from "react-icons/fi";
import { FaArrowLeft, FaArrowRight, FaSortAlphaDown } from "react-icons/fa";
import { RiEditLine } from "react-icons/ri";
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../ui/table";
import axios from 'axios';
import Sidebar from '../../ui/Sidebar';
import Header from '../../ui/Header';

const CardIcon = () => (
  <div className="flex items-center justify-center h-14 w-14 rounded-full bg-[#f7f7d8] absolute top-[40px] right-[50px]">
    <img src="./dollar.png" className="h-6 w-6" alt="icon" />
  </div>
);

function WinnerCell({ game, activeDropdown, setActiveDropdown }) {
  const [winner, setWinner] = useState(game.winner);
  const baseUrl = import.meta.env.VITE_BACKEND_URL

  const handleWinnerSelection = async (selectedWinner) => {
    try {
      await axios.post(`${baseUrl}/api/v1/game/winner`, {
        gameId: game.id,
        winner: selectedWinner,
      }, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
          }
      });

      setWinner(selectedWinner); // Update UI
      setActiveDropdown(null); // Close dropdown
    } catch (error) {
      console.error("Error updating winner:", error);
      alert("Failed to update winner. Please try again.");
    }
  };

  return (
    <TableCell>
      <div className="relative">
        {winner ? (
          // Display Winner Team Name
          <span className="bg-black p-2 rounded-md text-white">
            {winner === "team_a" ? game.team_a : game.team_b}
          </span>
        ) : (
          // Dropdown for Selecting Winner
          <span
            className="bg-yellow-500 cursor-pointer p-1 text-center rounded-md"
            onClick={() =>
              setActiveDropdown(activeDropdown === game.id ? null : game.id)
            }
          >
            Not <br /> Finished
          </span>
        )}

        {/* Dropdown (only shows when match is undecided & clicked) */}
        {activeDropdown === game.id && !winner && (
          <div className="absolute top-full left-0 mt-2 w-32 bg-gray-800 shadow-lg rounded-md">
            <button
              className="block w-full text-left px-4 py-2 text-white hover:bg-green-600"
              onClick={() => handleWinnerSelection("team_a")}
            >
              🏆 {game.team_a}
            </button>
            <button
              className="block w-full text-left px-4 py-2 text-white hover:bg-blue-600"
              onClick={() => handleWinnerSelection("team_b")}
            >
              🏆 {game.team_b}
            </button>
          </div>
        )}
      </div>
    </TableCell>
  );
}

export default function Games() {
  // State to hold all game data from events.json or localStorage
  const [gameData, setGameData] = useState([]);
  // State for the selected game(s); here we use the absolute index as an ID
  const [selectedGame, setSelectedGame] = useState([]);
  const [isAllSelected, setIsAllSelected] = useState(false);
  // For pagination: current page
  const [currentPage, setCurrentPage] = useState(1);
  const [gamesPerPage, setGamesPerPage] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_BACKEND_URL

  // Fetch game data from localStorage if available, otherwise from the JSON file
  async function fetchGameData() {
    try{
      const response = await axios.get(`${baseUrl}/api/v1/game/all`, {headers: {'Authorization' : `Bearer ${localStorage.getItem('token')}`}}); 
      setGameData(response.data.games);
    } catch(err){
      console.error(err)
    }
  }
  useEffect(() => {
    fetchGameData()
  }, [gameData.id]);  
  
  // ----- Selection Handlers -----
  function handleSelectAll() {
    if (selectedGame.length === gameData.length) {
      setSelectedGame([]);
      setIsAllSelected(false);
    } else {
      // Compute absolute indices for games on the current page
      const indices = gameData.map((_, index) => (currentPage - 1) * perPage + index);
      setSelectedGame(indices);
      setIsAllSelected(true);
    }
  }

  function handleGameSelect(absoluteIndex) {
    setSelectedGame((prevSelected) => {
      if (prevSelected.includes(absoluteIndex)) {
        return prevSelected.filter(id => id !== absoluteIndex);
      } else {
        return [...prevSelected, absoluteIndex];
      }
    });
  }

  // ----- Delete / Edit Handlers -----
  function deleteSelectedGames() {
    if (selectedGame.length === 0) {
      alert("No game selected");
      return;
    }
    // Remove the selected games from the gameData array
    const newGameData = gameData.filter((_, index) => !selectedGame.includes(index));
    setGameData(newGameData);
    // Update localStorage so the deletion persists (for this prototype)
    localStorage.setItem('gameData', JSON.stringify(newGameData));
    setSelectedGame([]);
    alert("Selected games deleted");
  }

  function editSelectedGame() {
    if (selectedGame.length === 0) {
      alert("No game selected");
      return;
    } else if (selectedGame.length > 1) {
      alert("Please select only one game to edit");
      return;
    }
    // Navigate to the edit page using the absolute index as the game ID
    const gameIndex = selectedGame[0];
    navigate(`/admin/games/edit/${gameIndex}`);
  }

  function handlePageChange(page) {
    setCurrentPage(page);
    setSelectedGame([]); // Clear selections when changing pages
    setIsAllSelected(false);
  }

  async function toggleBet(gameId) {
    try {
        await axios.put(`${baseUrl}/api/v1/game/${gameId}/toggle-bet`);
        fetchGameData();  // Refresh the games list after update
    } catch (error) {
        console.error(error);
    }
  }


  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <div className="flex flex-row items-start mt-16">
        {/* Sidebar */}
        <Sidebar />
        {/* Main Content */}
        <div className="flex-1 ml-64">
          <main className="p-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-semibold">Games</h1>
              <div className="w-[250px] flex justify-evenly">
                <Link to="/admin/games/add">
                  <Button
                    variant="secondary"
                    className="w-auto bg-[#e0382a] text-white hover:text-[#e0382a] hover:border-2 hover:bg-white"
                  >
                    <FiPlus />
                    Add Game
                  </Button>
                </Link>
                <Button
                  variant="secondary"
                  className="w-auto bg-white text-[#e0382a] border-2"
                >
                  Export
                </Button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="h-[150px] rounded-tl-lg rounded-bl-lg rounded-tr-none rounded-br-none border-none relative overflow-hidden">
                <div className="h-full w-[1.3px] bg-gray-100 absolute right-0 top-0"></div>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 relative">
                  <CardTitle className="text-2xl font-semibold">
                    3
                  </CardTitle>
                  <CardIcon />
                </CardHeader>
                <CardContent>
                  <div className="text-sem font-semibold text-gray-500 pb-2">
                    Total Games
                  </div>
                </CardContent>
              </Card>
              <Card className="rounded-none border-none relative">
                <div className="h-full w-[1.3px] bg-gray-100 absolute right-0 top-0"></div>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 relative">
                  <CardTitle className="text-2xl font-semibold">
                    1
                  </CardTitle>
                  <CardIcon />
                </CardHeader>
                <CardContent>
                  <div className="text-sm font-semibold text-gray-500 pb-2">
                    Live Games
                  </div>
                </CardContent>
              </Card>
              <Card className="rounded-none border-none relative">
                <div className="h-full w-[1.3px] bg-gray-100 absolute right-0 top-0"></div>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 relative">
                  <CardTitle className="text-2xl font-semibold">
                    2
                  </CardTitle>
                  <CardIcon />
                </CardHeader>
                <CardContent>
                  <div className="text-sm font-semibold text-gray-500 pb-2">
                    Scheduled Games
                  </div>
                </CardContent>
              </Card>
              <Card className="rounded-tl-none rounded-bl-none rounded-tr-lg rounded-br-lg relative border-none">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 relative">
                  <CardTitle className="text-2xl font-semibold">
                    {/* You can add another stat here */}
                    -
                  </CardTitle>
                  <CardIcon />
                </CardHeader>
                <CardContent>
                  <div className="text-sm font-semibold text-gray-500 pb-2">
                    Other Stats
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Games Table */}
            <div className="w-full mt-6">
              <Card className="border-none">
                <CardHeader>
                  <div className="header flex justify-between">
                    <div className="left flex items-center">
                      <div className="relative">
                        <FiSearch className="w-5 h-5 text-gray-400 absolute left-3 top-2" />
                        <input
                          type="text"
                          placeholder="Search games..."
                          className="w-[360px] h-10 pl-10 pr-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
                        />
                      </div>
                    </div>
                    <div className="right flex text-[#e0382a]">
                      <FaSortAlphaDown className="border-2 mx-1 h-9 w-9 p-2 rounded-md" />
                      <FiTrash className="border-2 mx-1 h-9 w-9 p-2 rounded-md cursor-pointer" onClick={deleteSelectedGames} />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader className="border-b-2">
                      <TableRow>
                        <TableHead>
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              className="mx-2 h-4 w-4"
                              checked={isAllSelected}
                              onChange={handleSelectAll}
                            />
                            <span>#</span>
                          </label>
                        </TableHead>
                        <TableHead>Country 1</TableHead>
                        <TableHead>Country 2</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Starting In</TableHead>
                        <TableHead>Betting</TableHead>
                        <TableHead>Winner</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {gameData && gameData.length > 0 ? (
                        gameData.map((game, index) => {
                          // Compute the absolute index in gameData (for selection and keys)
                          return (
                            <TableRow key={game.id}>
                              <TableCell className="font-medium">
                                <label className="flex items-center">
                                  <input
                                    type="checkbox"
                                    className="mx-2 h-4 w-4"
                                    checked={game.id}
                                    onChange={() => handleGameSelect(game.id)}
                                  />
                                  {game.id}
                                </label>
                              </TableCell>
                              <TableCell>{game.team_a}</TableCell>
                              <TableCell>{game.team_b}</TableCell>
                              <TableCell>{game.match_name}</TableCell>
                              <TableCell>
                                <span
                                  className={`inline-flex items-center rounded-md px-4 py-1 text-white text-md ${game.is_live ? "bg-green-600" : "bg-blue-600"}`}
                                >
                                  {game.is_live ? "Live" : "Scheduled"}
                                </span>
                              </TableCell>
                              <TableCell>
                                {(!game.is_live && game.start_time) ? game.start_time : "-"}
                              </TableCell>
                              <TableCell>
                              <button 
                                  onClick={() => toggleBet(game.id)}
                                  className={`px-4 py-2 rounded text-sm text-white ${game.bet ? "bg-green-500" : "bg-red-500"}`}
                              >
                                  {game.bet ? "Enabled" : "Disabled"}
                              </button>
                              </TableCell>
                              <WinnerCell
                                game={game}
                                activeDropdown={activeDropdown}
                                setActiveDropdown={setActiveDropdown}
                              />
                            </TableRow>
                          );
                        })
                      ) : (
                        <TableRow>
                          <TableCell colSpan={8} align="center">
                            No game data available
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FaArrowLeft
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        className="cursor-pointer hover:text-gray-400"
                      />
                      {[...Array(1)].map((_, index) => (
                        <Button
                          key={index + 1}
                          variant={index + 1 === currentPage ? "contained" : "outlined"}
                          onClick={() => handlePageChange(index + 1)}
                          className={`mx-1 ${index + 1 === currentPage
                            ? "bg-blue-100 text-blue-600"
                            : "bg-white text-gray-400"
                          }`}
                        >
                          {index + 1}
                        </Button>
                      ))}
                      <FaArrowRight
                        onClick={() => setCurrentPage(next => Math.min(next + 1, totalPages))}
                        className="cursor-pointer hover:text-gray-400"
                      />
                    </div>
                    <div>
                      {gameData.length} results on this page
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}