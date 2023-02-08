import React, { useContext } from "react";
import { FavouriteContext } from "./favouritesContext";
import { DisneyCharacter } from "../disney_character";

interface NavigationProps {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  currentShow: boolean;
  toggleFavourites: (characterFavourites: DisneyCharacter[]) => void;
}

const Navigation: React.FC<NavigationProps> = ({
  currentPage,
  setCurrentPage,
  currentShow,
  toggleFavourites,
}) => {
  const nextPage = () => {
    const newPageNumber = currentPage + 1;
    setCurrentPage(newPageNumber);
  };

  const prevPage = () => {
    if (currentPage > 1) {
      const newPageNumber = currentPage - 1;
      setCurrentPage(newPageNumber);
    }
  };

  const characterFavourites = useContext(FavouriteContext).characterFavourites;
  const display = !currentShow ? { display: "none" } : {};

  return (
    <div className="navigation">
      <div className="navigation__item" style={display}>
        <button className="navigation__button" onClick={prevPage}>
          Prev Page
        </button>
      </div>
      <div className="navigation__item">
        <button
          className="navigation__button"
          onClick={() => toggleFavourites(characterFavourites)}
        >
          {currentShow ? "Show Favourites" : "Show All"}
        </button>
      </div>
      <div className="navigation__item" style={display}>
        <button className="navigation__button" onClick={nextPage}>
          Next Page
        </button>
      </div>
    </div>
  );
};

export default Navigation;
