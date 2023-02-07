import "./App.css";
import React, { useState, useEffect } from "react";
import Header from "./components/header";
import CharacterContainer from "./components/character_container";
import Navigation from "./components/navigation";
import { DisneyCharacter } from "./disney_character";

export const FavouritesContext = React.createContext<number[]>([]);
export const UpdateFavouritesContext = React.createContext<
  (favourites: number[]) => void
>(([]) => {});

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [characters, setCharacters] = useState<DisneyCharacter[]>([]);
  const [characterFavourites, setCharacterFavourites] = useState<number[]>([]);

  const getCharacters = async (pageNumber: number) => {
    const apiResponse = await fetch(
      `http://api.disneyapi.dev/characters?page=${pageNumber}`
    );
    const json = (await apiResponse.json()) as { data: DisneyCharacter[] };
    setCharacters(json.data);
  };

  useEffect(() => {
    getCharacters(currentPage);
  }, [currentPage]);

  return (
    <FavouritesContext.Provider value={characterFavourites}>
      <UpdateFavouritesContext.Provider value={setCharacterFavourites}>
        <div className="page">
          <Header currentPage={currentPage} />
          <Navigation
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
          <CharacterContainer characters={characters} />
        </div>
      </UpdateFavouritesContext.Provider>
    </FavouritesContext.Provider>
  );
};

export default App;
