import React from "react";
import styles from "./highlighted-card.module.css";

const HighlightedCard = ({ value, filterValue, indexTab, hovered }) => {
  const regEx = new RegExp(`(${filterValue})`, "gi");
  const { id, name, items, address, pincode } = value;
  const listValue = [id, name, items, address, pincode];
  return (
    <li
      key={indexTab}
      data-index={indexTab}
      className={hovered ? styles["selectedStyle"] : styles["borderStyle"]}
      onMouseOut={(e) => {
        e.stopPropagation();
      }}
    >
      {listValue.map((list) => {
        if (Array.isArray(list)) {
          return list
            .filter((value) => value === filterValue)
            .map((val, idx) => {
              return (
                <div key={idx}>
                  <span>"{val}" found in items</span> <hr />
                </div>
              );
            });
        } else {
          return (
            <div className={styles["highlighted-text-style"]}>
              {list.split(regEx).map((part, index) =>
                part.match(regEx) ? (
                  <span
                    key={index}
                    style={{ fontWeight: "normal", color: "blue" }}
                  >
                    <b>{part}</b>
                  </span>
                ) : (
                  part
                )
              )}
            </div>
          );
        }
      })}
    </li>
  );
};

export default HighlightedCard;
