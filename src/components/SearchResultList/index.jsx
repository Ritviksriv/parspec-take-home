import React, { useRef, useState, useEffect } from "react";
import HighlightedCard from "../HighlightedCard";
import styles from "./search-result-list.module.css";

const SearchResultList = ({ apiResponse }) => {
  const [inputData, setInputData] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [isFocused, setIsFocused] = useState();
  const inputRef = useRef();
  const resultsRef = useRef();

  useEffect(() => {
    (async () => {
      if (inputData) {
        const reg = new RegExp(`(${inputData})`, "gi");
        setFilteredData(
          apiResponse.filter((val) => JSON.stringify(val).match(reg))
        );
      }
    })();
  }, [inputData]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      const isUp = event.key === "ArrowUp";
      const isDown = event.key === "ArrowDown";
      if (resultsRef.current) {
        let resultsItems = Array.from(resultsRef.current.children);

        if (isUp || isDown) {
          event.preventDefault();
          setIsFocused((prevFocusElement) => {
            let newIndex =
              prevFocusElement === undefined ? 0 : prevFocusElement;
            if (isUp) {
              newIndex = Math.max(0, newIndex - 1);
            } else if (isDown) {
              newIndex = Math.min(filteredData.length - 1, newIndex + 1);
            }
            resultsItems[newIndex]?.scrollIntoView();
            return newIndex;
          });
        }
      }
    };

    document.body.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.removeEventListener("keydown", handleKeyDown);
    };
  }, [filteredData]);
  const handleMouseOver = (e) => {
    if (e.target.tagName === "LI") {
      setIsFocused(parseInt(e.target.dataset.index));
    }
  };

  const handleMouseOut = () => {
    setIsFocused();
  };
  return (
    <div className={styles["container"]}>
      <div className="input-wrapper">
        <input
          ref={inputRef}
          className={styles["input-styles"]}
          type="text"
          placeholder="Search"
          onChange={(e) => setInputData(e.target.value)}
          value={inputData}
        />
      </div>
      {inputData && (
        <ul
          className={styles["card-container"]}
          ref={resultsRef}
          type="none"
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        >
          {filteredData && filteredData.length > 0 ? (
            filteredData.map((value, index) => (
              <HighlightedCard
                key={index}
                value={value}
                filterValue={inputData}
                indexTab={index}
                hovered={index === isFocused}
              />
            ))
          ) : (
            <div>No data</div>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchResultList;
