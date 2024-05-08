import './App.css';
import { useState, useEffect } from 'react';
import SearchResultList from './components/SearchResultList';
import axios from 'axios';

function App() {
  const [apiResponse,setApiResponse]=useState([])
  useEffect(() => {
    (async () => {
      const { data } = await axios.get(
        "https://fe-take-home-assignment.s3.us-east-2.amazonaws.com/Data.json"
      );
      setApiResponse(data);
    })();
  }, []);
  return ( 
    <div className="App">
      <SearchResultList apiResponse={apiResponse}/>
    </div>
  );
}

export default App;
