import React, { useState } from "react";

export interface FavouriteContextType {
  characterFavourites: number[];
  toggleFavouriteForCharacter: (characterId: number) => void;
}

interface FavouriteProviderProps {
  children: React.ReactNode;
}

// export FavouriteContext
export const FavouriteContext =
  React.createContext<FavouriteContextType | null>(null);

// FavouriteProvider
const FavouriteProvider: React.FC<FavouriteProviderProps> = ({ children }) => {
  const [characterFavourites, setCharacterFavourites] = useState<number[]>([]);

  const toggleFavouriteForCharacter = (characterId: number) => {
    if (!characterFavourites.includes(characterId)) {
      setCharacterFavourites([...characterFavourites, characterId]);
    } else {
      const updatedFavourites = characterFavourites.filter(
        (id) => id !== characterId
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
