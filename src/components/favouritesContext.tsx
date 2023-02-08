import React, { useState } from "react";
import { DisneyCharacter } from "../disney_character";

export interface FavouriteContextType {
  characterFavourites: DisneyCharacter[];
  toggleFavouriteForCharacter: (character: DisneyCharacter) => void;
}

interface FavouriteProviderProps {
  children: React.ReactNode;
}

// export FavouriteContext
export const FavouriteContext = React.createContext<FavouriteContextType>({
  characterFavourites: [],
  toggleFavouriteForCharacter: () => {},
});

// FavouriteProvider
const FavouriteProvider: React.FC<FavouriteProviderProps> = ({ children }) => {
  const [characterFavourites, setCharacterFavourites] = useState<
    DisneyCharacter[]
  >([]);

  const toggleFavouriteForCharacter = (character: DisneyCharacter) => {
    const isIncluded = characterFavourites.some(
      (char) => char._id === character._id
    );
    if (!isIncluded) {
      setCharacterFavourites([...characterFavourites, character]);
    } else {
      const updatedFavourites = characterFavourites.filter(
        (char) => char._id !== character._id
      );
      setCharacterFavourites(updatedFavourites);
    }
  };

  return (
    <>
      <FavouriteContext.Provider
        value={{ characterFavourites, toggleFavouriteForCharacter }}
      >
        {children}
      </FavouriteContext.Provider>
    </>
  );
};

export default FavouriteProvider;
