export function CharacterCard({ character }) {
  const infoWanted = [
    "name",
    "age",
    "occupation",
    "relatives",
    "firstEpisode",
    "wikiUrl",
  ];

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function formatItem(item) {
    const age = /(^\d\d)/.test(item);
    const link = /(https:\/\/)/.test(item)
    if (Array.isArray(item) && item.length !== 0) {
      const infoList = item.map((obj) => obj.name);
      return infoList.join(", ");
    } else if (age) {
      return parseInt(item);
    } else if (link) {
      return <a href={item}>{item}</a>
    } else {
      return item;
    }
  }

  return (
    <div className="infoBlock">
      <div>
        <img
          src={character.image}
          alt="character"
          className="characterImg"
        ></img>
      </div>

      <div>
        {Object.keys(character).map((key) => {
          if (infoWanted.includes(key) && character[key].length !== 0) {
            return (
              <div key={key} className="line">
                <p className="head">{capitalizeFirstLetter(key)}: </p>
                <p className="info">{formatItem(character[key])}</p>
              </div>
            );
          }
          return null;
        })}
      </div>

      {/* .name, .image, .hairColor, .age, .gender, .allOccupations, .occupation, .relatives, .firstEpisode, .voicedBy  */}
    </div>
  );
}
