import React from 'react';
import { useEffect, useState } from "react";
import logo from './logo.svg';
import close from './close.svg';
import './App.css';
import axios from "axios";
import "react-widgets/styles.css";
import Multiselect from "react-widgets/Multiselect";



function App() {

  const [character, setCharacter] = useState<[] | Character[]>([]);
  const [valueQery, setValueQery] = useState('');

   // Api sonucu tamamlandıgında
  fetchCharacters().then(characters => {
    if (character.length==0) {
      setCharacter(characters);
    }
  });

 
 function search(params:string) {
  setValueQery(params)
 }

function highlightSearchTerm (text:string){
    // Arama kelimesi varsa, bulunduğu her yeri kalın yap
    let term=valueQery;
    if (term !== '' && text.toLowerCase().includes(term.toLowerCase())) {
      const parts = text.split(new RegExp(`(${term})`, 'gi'));
      return (
        <p>
          {parts.map((part, index) =>
            part.toLowerCase() === term.toLowerCase() ? (
              <b key={index}>{part}</b>
            ) : (
              part
            )
          )}
        </p>
      );
    }
    // Arama kelimesi yoksa, sadece metni döndür
    return  (<p> {text} </p>);
  };
  return (
    <div className="App">
      <h1 className="h1">React + Typescript Senior Frontend Developers [Next Turkish Unicorn] </h1>
    <div className="selectContent"> 
 
    <Multiselect
   data={character}
   filter='contains'
   textField='name'
   onSearch={search}
   renderListItem={({ item }) => (
    <div className="renderItem" >
      <div className="renderCheck"> <input type="checkbox" /></div>
      <div className="renderImg"> <img src={item.image} />
      </div>
      <div className="renderDesc"> 
      {highlightSearchTerm(item.name)}
      {item.episode.length+" Episodes" }
     
      </div>
    </div>
  )}
/>
    </div>
    </div>

  );
}
//start-- Api Model Clasları--
interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string | null;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

interface CharacterInfo {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

interface ApiResponse {
  info: CharacterInfo;
  results: Character[];
}
//end-- Api Model Clasları--

async function fetchCharacters(): Promise<Character[]> {
  try {
    const response = await axios.get<ApiResponse>('https://rickandmortyapi.com/api/character');
    return response.data.results;
  } catch (error) {
    console.error('Error fetching characters:', error);
    return [];
  }
}
export default App;
