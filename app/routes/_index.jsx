import { useState, useRef } from "react";
import styles from "~/styles/index.css";
import bobsburgerscharacters from "~/styles/bobsburgerscharacters.jpg";
import { NotValid } from "../components/errors";
import { BiSearch } from "react-icons/bi"


export const meta = () => {
  return [
    { title: "Bobs Burgers Generator" },
  ];
};

export default function App() {
  const [character, setCharacter] = useState();
  const [badEntry, setBadEntry] = useState(false);
  const userInputRef = useRef();
  const infoWanted = ["name", "age", "occupation", "relatives", "firstEpisode"	, "wikiUrl"]


  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

  // function grabObject(dataResponse){
  //   if (dataResponse.length === 1) {
  //     console.log("grabObject 1 ")
  //       return dataResponse[0]
  //   } else if (dataResponse.length === 0) {
  //     alert("grabObject 2")
  //     return
  //   } else {
  //     console.log("grabObject 3");
  //       return dataResponse
  //   }
  // }

  function formatItem(item) {
    const age = /(^\d\d)/.test(item)
    console.log(item, "item")
    if (Array.isArray(item) && item.length != 0){
      const charr = item.map(obj => obj.name);
      return charr.join(", ")
    } else if(age){
      return parseInt(item)
      } else {
    return item
  }
}

async function searchCharacters(){
    const userInput = userInputRef.current.value;

    if (!userInput || isNaN(userInput)|| userInput < 1 || userInput > 496) {
      setBadEntry(true);
    } else {
      const response = await fetch(`https://bobsburgers-api.herokuapp.com/v2/characters/${ userInput }`)
    .then((response) => {
      if (response.status != 200){
        NotValid(response.status)
      } else {
        return response.json();
      }
    })
    .then(data => {        
      setBadEntry(false);
      return data;
    });
    console.log(response)
    setCharacter(response)
    }
}

  return (
    <div>
      <div className="header">
            <h1>Bob's Burger Generator</h1>
        <p>Learn more about your favorite characters! Simply input 
            a number 1 - 496 for a surprise character!
            </p>
        </div>
        
        <div className="card">
            <div className="search">
                <input id="getCharacter" 
                ref={userInputRef} 
                type="text" 
                placeholder="Enter random number...."
                onKeyDown={event => {
                  if (event.key === "Enter" || event.key === "Return"){
                    searchCharacters()
                  }
                }}
                ></input>
                <button onClick={searchCharacters}><BiSearch/></button>
            </div>
            {
              badEntry ? (
                <p style={{color: "red"}} >Invalid entry, please input a number 1 - 496</p>
              ) : <div></div>
            }


            <div>
              {
                character ? (
                <div className="infoBlock">
                  <div>
                    <img src={character.image} alt="character" className="characterImg"></img>
                    </div>
                    {/* {Object.keys(character).map(i => (
                          <div key={i}>{i} - {formatItem(character[i])} </div>
                      ))
                      } */}
                    <div>
                      {Object.keys(character).map((key) => {
                        if (infoWanted.includes(key) && character[key].length != 0) {
                          return <div key={key} className="line">
                            <p className="head">{capitalizeFirstLetter(key)}: </p>
                            <p className="info">{formatItem(character[key])}</p>
                            </div>;
                            } return null;
                            })}
                    </div>  
{/* .name, .image, .hairColor, .age, .gender, .allOccupations, .occupation, .relatives, .firstEpisode, .voicedBy  */}
                </div>
                ) : (
                <img src={bobsburgerscharacters} alt="Bob's Burgers cast logo" className="castLogo"></img>
                )
              }
            </div>
        </div>
    </div>
  );
}
export function links() {
  return [{ rel: "stylesheet", href: styles }];
}
