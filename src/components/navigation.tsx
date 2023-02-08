import { useContext } from "react";
import { FavouriteContextType, FavouriteContext } from "./favouritesContext";
import { DisneyCharacter } from "../disney_character";

interface NavigationProps {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  currentShow: boolean;
  setCurrentShow: (currentShow: boolean) => void;
  setCharacters: (characters: DisneyCharacter[]) => void;
  getCharacters: (pageNumber: number) => void;
}

const Navigation: React.FC<NavigationProps> = ({
  currentPage,
  setCurrentPage,
  currentShow,
  setCurrentShow,
  setCharacters,
  getCharacters,
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

  // toggleFavourites
  const { characterFavourites, toggleFavouriteForCharacter } = useContext(
    FavouriteContext
  ) as FavouriteContextType;

  const toggleFavourites = () => {
    if (currentShow) {
      setCharacters(characterFavourites);
      setCurrentShow(false);
    } else {
      getCharacters(currentPage);
      setCurrentShow(true);
    }
  };

  const display = !currentShow ? { display: "none" } : {};

  return (
    <div className="navigation">
      <div className="navigation__item" style={display}>
        <button className="navigation__button" onClick={prevPage}>
          Prev Page
        </button>
      </div>
      <div className="navigation__item">
        <button className="navigation__button" onClick={toggleFavourites}>
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
