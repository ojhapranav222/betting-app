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
import useSmallScreen from '../../../../ui/SmallScreen';

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

  async function cancelMatchHandler (gameId) {
    try {
        const { data } = await axios.patch(
            `${baseUrl}/api/v1/game/cancel`,
            { gameId },
            {
              headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
              }
            }
        );

        if (data.success) {
            alert("Match canceled and bets refunded.");
            // Optionally refresh match list or UI state
        } else {
            alert("Error cancelling match.");
        }
    } catch (error) {
        console.error("Cancel match error:", error);
        alert("Something went wrong.");
    }
};

  return (
    <TableCell>
      <div className="relative">
        {winner ? (
          // Display Winner Team Name
          <span className={`p-2 rounded-md ${
            winner === "team_a" ? "bg-yellow-500 text-white" 
            : winner === "team_b" ? "bg-blue-500 text-white" 
            : "bg-transparent text-red-700 font-bold"
          }`}>
            {winner === "team_a" ? game.team_a 
            : winner === "team_b" ? game.team_b
            : "Match Cancelled"}
          </span>
        ) : (
          // Dropdown for Selecting Winner
          <span
            className="cursor-pointer text-red-500 font-semibold p-1 text-center rounded-md"
            onClick={() =>
              setActiveDropdown(activeDropdown === game.id ? null : game.id)
            }
          >
            Not <br /> Finished
          </span>
        )}

        {/* Dropdown (only shows when match is undecided & clicked) */}
        {activeDropdown === game.id && !winner && (
          <div className="absolute z-50 top-full left-0 mt-2 w-32 bg-gray-800 shadow-lg rounded-md">
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
            <button
              className="block w-full text-left px-4 py-2 text-white hover:bg-red-600"
              onClick={() => cancelMatchHandler(game.id)}  
            >❌ Cancel</button>
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
  const [activeDropdown, setActiveDropdown] = useState(null);
  const navigate = useNavigate();
  const isSmallScreen = useSmallScreen();
  const [editingGame, setEditingGame] = useState(null);
  const [editedValues, setEditedValues] = useState({});
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
  
  function handleSelectAll() {
    if (selectedGame.length === gameData.length) {
        setSelectedGame([]);
        setIsAllSelected(false);
    } else {
        setSelectedGame(gameData.map((game) => game.id));  // Select all game IDs
        setIsAllSelected(true);
    }
}

function handleGameSelect(gameId) {
    setSelectedGame((prevSelected) => {
        if (prevSelected.includes(gameId)) {
            return prevSelected.filter(id => id !== gameId);
        } else {
            return [...prevSelected, gameId];
        }
    });
}

  function handlePageChange(page) {
    setCurrentPage(page);
    setSelectedGame([]); // Clear selections when changing pages
    setIsAllSelected(false);
  }

  async function toggleBet(gameId) {
    try {
        await axios.put(`${baseUrl}/api/v1/game/${gameId}/toggle-bet`, {}, {  // Empty object for data
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        fetchGameData();  // Refresh the games list after update
    } catch (error) {
        console.error(error);
    }
}

function handleEdit(game) {
  setEditingGame(game.id);
  setEditedValues({
    match_name: game.match_name,
    team_a: game.team_a,
    team_b: game.team_b,
    end_time: game.end_time,
    additional_notes: game.additional_notes || "",
  });
}

function handleChange(field, value) {
  setEditedValues((prev) => ({ ...prev, [field]: value }));
}

async function handleSave(event, gameId) {
  if (event.key === "Enter") {
    try {
      const updatedData = {
        matchName: editedValues.match_name || gameData.find(g => g.id === gameId)?.match_name,
        teamA: editedValues.team_a || gameData.find(g => g.id === gameId)?.team_a,
        teamB: editedValues.team_b || gameData.find(g => g.id === gameId)?.team_b,
        endTime: editedValues.end_time || gameData.find(g => g.id === gameId)?.end_time,
        additionalNotes: editedValues.additional_notes || gameData.find(g => g.id === gameId)?.additional_notes,
      };

      await axios.put(`${baseUrl}/api/v1/game/edit/${gameId}`, updatedData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });

      fetchGameData();  // Refresh data
      setEditingGame(null);  // Exit edit mode
    } catch (error) {
      console.error("Error updating game:", error);
    }
  }
}



  return (
    <div className="flex flex-col min-h-screen bg-gray-100 overflow-hidden">
      <Header />
      <div className="flex flex-row items-start mt-16">
        {/* Sidebar */}
        <Sidebar />
        {/* Main Content */}
        <div className="flex-1 sm:ml-64">
          <main className="p-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-semibold">Games</h1>
              <div className="w-[250px] flex justify-evenly mr-6">
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

            {/* Games Table */}
            <div className="w-screen sm:w-[100%] mt-6 overflow-hidden sm:overflow-auto">
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
                  </div>
                </CardHeader>
                <CardContent>
                <Table className="w-[100%] max-w-[100%] sm:table-fixed overflow-x-scroll">
  <TableHeader className="border-b-2">
    <TableRow>
      <TableHead>#</TableHead>
      <TableHead>Team A</TableHead>
      <TableHead>Team B</TableHead>
      <TableHead>Type</TableHead>
      <TableHead>Ending In</TableHead>
      <TableHead>Additional Notes</TableHead>
      <TableHead>Betting</TableHead>
      <TableHead>Winner</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {gameData && gameData.length > 0 ? (
      gameData.map((game) => (
        <TableRow key={game.id}>
          <TableCell>{game.id}</TableCell>

          {/* Editable Row */}
          {editingGame === game.id ? (
            <>
              <TableCell>
                <input
                  type="text"
                  value={editedValues.team_a}
                  onChange={(e) => handleChange("team_a", e.target.value)}
                  onKeyDown={(e) => handleSave(e, game.id)}
                  className="bg-gray-200 px-2 py-1 rounded sm:w-24"
                />
              </TableCell>
              <TableCell>
                <input
                  type="text"
                  value={editedValues.team_b}
                  onChange={(e) => handleChange("team_b", e.target.value)}
                  onKeyDown={(e) => handleSave(e, game.id)}
                  className="bg-gray-200 px-2 py-1 rounded sm:w-24"
                />
              </TableCell>
              <TableCell>
                <input
                  type="text"
                  value={editedValues.match_name}
                  onChange={(e) => handleChange("match_name", e.target.value)}
                  onKeyDown={(e) => handleSave(e, game.id)}
                  className="bg-gray-200 px-2 py-1 rounded sm:w-24"
                />
              </TableCell>
              <TableCell>
                <input
                  type="datetime-local"
                  value={editedValues.end_time}
                  onChange={(e) => handleChange("end_time", e.target.value)}
                  onKeyDown={(e) => handleSave(e, game.id)}
                  className="bg-gray-200 px-2 py-1 rounded sm:w-24"
                />
              </TableCell>
              <TableCell>
                <input
                  type="text"
                  value={editedValues.additional_notes}
                  onChange={(e) => handleChange("additional_notes", e.target.value)}
                  onKeyDown={(e) => handleSave(e, game.id)}
                  className="bg-gray-200 px-2 py-1 rounded sm:w-24"
                />
              </TableCell>
            </>
          ) : (
            <>
              <TableCell onClick={() => handleEdit(game)}>{game.team_a}</TableCell>
              <TableCell onClick={() => handleEdit(game)}>{game.team_b}</TableCell>
              <TableCell onClick={() => handleEdit(game)}>{game.match_name}</TableCell>
              <TableCell onClick={() => handleEdit(game)}>
                {new Date(new Date(game.end_time).getTime() + 19800000).toISOString().replace("T", ", ").split(".")[0]}
              </TableCell>
              <TableCell onClick={() => handleEdit(game)}>{game.additional_notes}</TableCell>
              <TableCell>
                <button
                  onClick={() => toggleBet(game.id)}
                  className={`px-4 py-2 rounded text-sm text-white ${
                    game.bet ? "bg-green-500" : "bg-red-500"
                  }`}
                >
                  {game.bet ? "Enabled" : "Disabled"}
                </button>
              </TableCell>
              <WinnerCell game={game} activeDropdown={activeDropdown} setActiveDropdown={setActiveDropdown} />
            </>
          )}
        </TableRow>
      ))
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