import React, { useState } from "react";

export const Operation = ({ addTransaction }) => {
  const initialState = {
    description: "",
    amount: "",
  };
  const [state, setState] = useState(initialState);
  const valueHandler = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };
  const transactionHandle = (val) => {
    const { description, amount } = state;
    if (description && amount) {
      addTransaction({
        id: `cmr${(+new Date()).toString(16)}`,
        description: description,
        amount: amount,
        type: val,
      });
      setState(initialState);
    }
  };

  return (
    <section className="operation">
      <h3>Новая операция</h3>
      <form id="form">
        <label>
          <input
            type="text"
            className="operation__fields operation__name"
            placeholder="Наименование операции"
            name="description"
            onChange={valueHandler}
            value={state.description}
          />
        </label>
        <label>
          <input
            type="number"
            className="operation__fields operation__amount"
            placeholder="Введите сумму"
            name="amount"
            onChange={valueHandler}
            value={state.amount}
          />
        </label>
        <div className="operation__btns">
          <button
            type="button"
            className="operation__btn operation__btn-subtract"
            onClick={() => transactionHandle(false)}
          >
            РАСХОД
          </button>
          <button
            type="button"
            className="operation__btn operation__btn-add"
            onClick={() => transactionHandle(true)}
          >
            ДОХОД
          </button>
        </div>
      </form>
    </section>
  );
};
