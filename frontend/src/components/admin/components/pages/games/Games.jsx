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

export default function Games() {
  // State to hold all game data from events.json or localStorage
  const [gameData, setGameData] = useState([]);
  // State for the selected game(s); here we use the absolute index as an ID
  const [selectedGame, setSelectedGame] = useState([]);
  const [isAllSelected, setIsAllSelected] = useState(false);
  // For pagination: current page
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  // Fetch game data from localStorage if available, otherwise from the JSON file
  useEffect(() => {
    axios.get('/sampleData/events.json')
      .then((response) => {
        const jsonData = response.data; // Static data from events.json
        // Retrieve user-added games stored separately in localStorage
        const storedUserGamesStr = localStorage.getItem('userAddedGames');
        const userAddedGames = storedUserGamesStr ? JSON.parse(storedUserGamesStr) : [];
    
        // Optionally reverse user-added games if desired
        const reversedUserGames = userAddedGames.slice().reverse();
    
        // Merge user-added games with the static data (order as needed)
        const combinedData = [...reversedUserGames, ...jsonData];
    
        // Update state (and note: we're not storing the combined data back)
        setGameData(combinedData);
      })
      .catch((error) => {
        console.error("Error fetching game data:", error);
      });
  }, []);  
  

  // ----- Pagination -----
  const perPage = 5; // Number of games per page (adjust as needed)
  const totalPages = Math.ceil(gameData.length / perPage);
  // Slice the game data for the current page
  const paginatedGames = gameData.slice((currentPage - 1) * perPage, currentPage * perPage);

  // ----- Stats (cards) -----
  const totalGames = gameData.length;
  const liveGames = gameData.filter(game => game.isLive).length;
  const scheduledGames = totalGames - liveGames;

  // ----- Selection Handlers -----
  function handleSelectAll() {
    if (selectedGame.length === paginatedGames.length) {
      setSelectedGame([]);
      setIsAllSelected(false);
    } else {
      // Compute absolute indices for games on the current page
      const indices = paginatedGames.map((_, index) => (currentPage - 1) * perPage + index);
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
                    {totalGames}
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
                    {liveGames}
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
                    {scheduledGames}
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
                    Other Stat
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
                      <RiEditLine className="border-2 mx-1 h-9 w-9 p-2 rounded-md cursor-pointer" onClick={editSelectedGame} />
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
                        <TableHead>Point 1</TableHead>
                        <TableHead>Point 2</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Starting In</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedGames && paginatedGames.length > 0 ? (
                        paginatedGames.map((game, index) => {
                          // Compute the absolute index in gameData (for selection and keys)
                          const absoluteIndex = (currentPage - 1) * perPage + index;
                          return (
                            <TableRow key={absoluteIndex}>
                              <TableCell className="font-medium">
                                <label className="flex items-center">
                                  <input
                                    type="checkbox"
                                    className="mx-2 h-4 w-4"
                                    checked={selectedGame.includes(absoluteIndex)}
                                    onChange={() => handleGameSelect(absoluteIndex)}
                                  />
                                  {absoluteIndex + 1}
                                </label>
                              </TableCell>
                              <TableCell>{game.country1}</TableCell>
                              <TableCell>{game.country2}</TableCell>
                              <TableCell>{game.type}</TableCell>
                              <TableCell>{game.point1}</TableCell>
                              <TableCell>{game.point2}</TableCell>
                              <TableCell>
                                <span
                                  className={`inline-flex items-center rounded-md px-4 py-1 text-white text-md ${game.isLive ? "bg-green-600" : "bg-blue-600"}`}
                                >
                                  {game.isLive ? "Live" : "Scheduled"}
                                </span>
                              </TableCell>
                              <TableCell>
                                {(!game.isLive && game.startingIn) ? game.startingIn : "-"}
                              </TableCell>
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
                      {[...Array(totalPages)].map((_, index) => (
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
                      {paginatedGames.length} results on this page
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