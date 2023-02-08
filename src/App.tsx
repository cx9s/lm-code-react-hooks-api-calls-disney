import "./App.css";
import React, { useState, useEffect, useContext } from "react";
import Header from "./components/header";
import CharacterContainer from "./components/character_container";
import Navigation from "./components/navigation";
import { DisneyCharacter } from "./disney_character";
import FavouriteProvider, {
  FavouriteContext,
} from "./components/favouritesContext";

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [characters, setCharacters] = useState<DisneyCharacter[]>([]);
  const [currentShow, setCurrentShow] = useState<boolean>(true);

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

  const characterFavourites = useContext(FavouriteContext).characterFavourites;

  const toggleFavourites = (characterFavourites: DisneyCharacter[]) => {
    if (currentShow) {
      setCharacters(characterFavourites);
      setCurrentShow(false);
    } else {
      getCharacters(currentPage);
      setCurrentShow(true);
    }
  };

  return (
    <FavouriteProvider>
      <div className="page">
        <Header currentPage={currentPage} />
        <Navigation
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          currentShow={currentShow}
          toggleFavourites={toggleFavourites}
        />
        <CharacterContainer characters={characters} />
      </div>
    </FavouriteProvider>
  );
};

export default App;
