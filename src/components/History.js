import React from "react";
import { HistoryItem } from "./HistoryItem";

export const History = ({ list = [], removeTransaction }) => {
  return (
    <section className="history">
      <h3>История расходов</h3>
      <ul className="history__list">
        {list.length > 0 &&
          list.map((item) => {
            return (
              <HistoryItem
                item={item}
                key={item.id}
                removeTransaction={() => removeTransaction(item)}
              />
            );
          })}
      </ul>
    </section>
  );
};
