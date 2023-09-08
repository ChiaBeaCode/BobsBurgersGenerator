import { useState, useRef } from "react";
import styles from "~/styles/index.css";
import logo from "~/images/logo.png";
import bobsburgerscharacters from "~/images/bobsburgerscharacters.jpg";
import { NotValid } from "../components/errors";
import { BiSearch } from "react-icons/bi";
import { CharacterCard } from "../components/card";

export const meta = () => {
  return [{ title: "Bobs Burgers Generator" }];
};

export default function App() {
  const [character, setCharacter] = useState();
  const [badEntry, setBadEntry] = useState(false);
  const userInputRef = useRef();

  async function searchCharacters() {
    const userInput = userInputRef.current.value;

    if (!userInput || isNaN(userInput) || userInput < 1 || userInput > 496) {
      setBadEntry(true);
    } else {
      const response = await fetch(
        `https://bobsburgers-api.herokuapp.com/v2/characters/${userInput}`
      )
        .then((response) => {
          if (response.status != 200) {
            NotValid(response.status);
          } else {
            return response.json();
          }
        })
        .then((data) => {
          setBadEntry(false);
          return data;
        });
      console.log(response);
      setCharacter(response);
    }
  }

  return (
    <div>
      <div className="header">
        <a href="https://chiabeacode.netlify.app/">
          <img src={logo} alt="logo"></img>
        </a>
        <h1>Bob's Burger Generator</h1>
        <p>
          Learn more about your favorite characters! Simply input a number 1 -
          496 for a surprise character!
        </p>
      </div>

      <div className="card">
        <div className="search">
          <input
            id="getCharacter"
            ref={userInputRef}
            type="text"
            placeholder="Enter random number...."
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === "Return") {
                searchCharacters();
              }
            }}
          ></input>
          <button onClick={searchCharacters}>
            <BiSearch />
          </button>
        </div>
        {badEntry ? (
          <p style={{ color: "red" }}>
            Invalid entry, please input a number 1 - 496
          </p>
        ) : (
          <div></div>
        )}

        <div>
          {character ? (
            <CharacterCard character={character} />
          ) : (
            <img
              src={bobsburgerscharacters}
              alt="Bob's Burgers cast logo"
              className="castLogo"
            ></img>
          )}
        </div>
      </div>
    </div>
  );
}
export function links() {
  return [{ rel: "stylesheet", href: styles }];
}
