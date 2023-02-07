import React, { useContext } from "react";
import { FavouritesContext } from "../App";
import { DisneyCharacter } from "../disney_character";

interface CharacterProps {
  character: DisneyCharacter;
  updateFavourites: (favourites: number[]) => void;
}

const Character: React.FC<CharacterProps> = ({
  character,
  updateFavourites,
}) => {
  const characterFavourites = useContext(FavouritesContext);

  let imageSrc = character.imageUrl
    ? character.imageUrl
    : "https://picsum.photos/300/200/?blur";

  if (imageSrc.indexOf("/revision") !== -1) {
    imageSrc = imageSrc.substring(0, imageSrc.indexOf("/revision"));
  }

  const toggleFavouriteForCharacter = (characterId: number) => {
    if (!characterFavourites.includes(characterId)) {
      updateFavourites([...characterFavourites, characterId]);
    } else {
      const updatedFavourites = characterFavourites.filter(
        (id) => id !== characterId
      );
      updateFavourites(updatedFavourites);
    }
  };

  return (
    <article className="character-item">
      <h2>{character.name}</h2>

      <div
        className="character-item__actions"
        onClick={() => toggleFavouriteForCharacter(character._id)}
      >
        {characterFavourites.includes(character._id)
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
