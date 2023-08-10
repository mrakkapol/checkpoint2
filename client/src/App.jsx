import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [searchText, setSearchText] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    searchFromServer(searchText);
  }, [searchText]);

  const searchFromServer = async (text) => {
    try {
      const response = await axios.get(
        `http://localhost:4001/trips?keywords=${text}`
      );

      setSearchResult(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  return (
    <div className="App flex flex-col justify-items-center items-center ">
      <h1 className="text-blue-400 text-4xl font-bold text-center p-10">
        เที่ยวไหนดี
      </h1>
      <p className="text-xs text-neutral-600 w-[800px] mb-2">ค้นหาที่เที่ยว</p>
      <div className="max-w-[800px] flex ">
        <input
          className=" rounded-lg min-w-[800px] text-center shadow-md "
          type="text"
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="ค้นหาที่เที่ยวแล้วไปกัน"
        />
      </div>

      {searchResult.length > 0 && (
        <>
          {searchResult.map((result, index) => (
            <div key={index} className="flex flex-col p-4">
              <div className="flex ">
                <div className="flex flex-5 max-w-[300px] max-h-[250px] p-4">
                  <img className="rounded-3xl" src={result.photos[0]} alt="" />
                </div>
                <div className="flex flex-col w-[500px]">
                  <p className="text-3xl font-blod mb-1">{result.title}</p>
                  <p className="text-xs text-gray-500 mb-1">
                    {truncateText(result.description, 100)}
                  </p>
                  <a
                    href={result.url}
                    className="underline text-blue-400 text-sm"
                    target="blank"
                  >
                    อ่านต่อ
                  </a>
                  <p className="text-sm">
                    หมวด {result.tags[0]} {result.tags[1]} {result.tags[2]}{" "}
                    {result.tags[3]} และ {result.tags[4]}
                  </p>
                  <div className="flex p-4">
                    <img
                      src={result.photos[1]}
                      className="w-[100px] mx-2 h-[100px] rounded-xl"
                      alt=""
                    />
                    <img
                      src={result.photos[2]}
                      className="w-[100px] mx-2 h-[100px] rounded-xl"
                      alt=""
                    />
                    <img
                      src={result.photos[3]}
                      className="w-[100px] mx-2 h-[100px] rounded-xl"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default App;
