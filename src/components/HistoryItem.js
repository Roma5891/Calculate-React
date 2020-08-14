import React from "react";

export const HistoryItem = ({ item, removeTransaction }) => {
  return (
    <li
      className={`history__item history__item-${item.type ? "plus" : "minus"}`}
    >
      {item.description}
      <span className="history__money">
        {item.type ? "+" : "-"}
        {item.amount} ₽
      </span>
      <button
        className="history__delete"
        onClick={() => removeTransaction(item)}
      >
        x
      </button>
    </li>
  );
};
