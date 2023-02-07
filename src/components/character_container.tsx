import React from "react";
import { DisneyCharacter } from "../disney_character";
import Character from "./character";

interface CharacterContainerProps {
  characters: DisneyCharacter[];
  characterFavourites: number[];
  updateFavourites: (favourites: number[]) => void;
}

const CharacterContainer: React.FC<CharacterContainerProps> = ({
  characters,
  characterFavourites,
  updateFavourites,
}) => {
  const buildRows = () => {
    let rows: Array<JSX.Element> = [],
      cols: Array<JSX.Element> = [];

    characters.forEach((character, index) => {
      cols.push(
        <Character
          key={character._id}
          character={character}
          characterFavourites={characterFavourites}
          updateFavourites={updateFavourites}
        />
      );
      if ((index + 1) % 5 === 0) {
        rows.push(
          <div className="character-row" key={index}>
            {cols}
          </div>
        );
        cols = [];
      }
    });

    if (cols.length > 0) {
      rows.push(
        <div className="character-row" key={characters.length}>
          {cols}
        </div>
      );
    }

    return rows;
  };

  return <div className="character-container">{buildRows()}</div>;
};

export default CharacterContainer;
