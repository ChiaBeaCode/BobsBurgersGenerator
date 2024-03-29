import { useState, useRef } from "react";
import styles from "~/styles/index.css";
import logo from "~/images/logo.png";
import bobsburgerscharacters from "~/images/bobsburgerscharacters.jpg";
import { InvalidEntry, NotValid } from "../components/errors";
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
        `https://bobsburgers-api.herokuapp.com/characters/${userInput}`
      )
        .then((response) => {
          if (response.status !== 200) {
            console.log("Error Response Status: ", response.status);
            NotValid(response.status);
          } else {
            return response.json();
          }
        })
        .then((data) => {
          setBadEntry(false);
          return data;
        });
      setCharacter(response);
    }
  }

  return (
    <div>
      <header className="header">
        <a href="https://chiabeacode.netlify.app/">
          <img src={logo} alt="logo"></img>
        </a>
        <section>
          <h1>Bob's Burgers Generator</h1>
          <p>
            Learn more about your favorite characters! Simply input a number 1 -
            496 for a surprise character!
          </p>
        </section>
      </header>

      <div className="card">
        <section
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
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
          {badEntry ? <InvalidEntry /> : null}
        </section>

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
