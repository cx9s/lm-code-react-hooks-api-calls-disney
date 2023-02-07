import React, { useContext } from "react";
import { DisneyCharacter } from "../disney_character";
import { FavouriteContextType, FavouriteContext } from "./favouritesContext";

interface CharacterProps {
  character: DisneyCharacter;
}

const Character: React.FC<CharacterProps> = ({ character }) => {
  const { characterFavourites, toggleFavouriteForCharacter } = useContext(
    FavouriteContext
  ) as FavouriteContextType;

  // handle imageUrl
  let imageSrc = character.imageUrl
    ? character.imageUrl
    : "https://picsum.photos/300/200/?blur";

  if (imageSrc.indexOf("/revision") !== -1) {
    imageSrc = imageSrc.substring(0, imageSrc.indexOf("/revision"));
  }

  // return Character
  return (
    <article className="character-item">
      <h2>{character.name}</h2>

      <div
        className="character-item__actions"
        onClick={() => toggleFavouriteForCharacter(character)}
      >
        {characterFavourites.some((char) => char._id === character._id)
          ? "Favourited"
          : "Add to Favourites"}
      </div>

      <img
        className="character-item__img"
        src={imageSrc}
        alt={character.name}
      />
    </article>
  );
};

export default Character;
