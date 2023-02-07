import { DisneyCharacter } from "../disney_character";

const Character: React.FC<{ character: DisneyCharacter }> = ({ character }) => {
  let imageSrc = character.imageUrl
    ? character.imageUrl
    : "https://picsum.photos/300/200/?blur";

  if (imageSrc.indexOf("/revision") !== -1) {
    imageSrc = imageSrc.substring(0, imageSrc.indexOf("/revision"));
  }

  return (
    <article className="character-item">
      <h2>{character.name}</h2>

      <div className="character-item__actions">Add to Favourites</div>

      <img
        className="character-item__img"
        src={imageSrc}
        alt={character.name}
      />
    </article>
  );
};

export default Character;
