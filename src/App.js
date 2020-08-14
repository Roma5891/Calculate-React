import React, { useState, useEffect } from "react";
import "./css/normalize.css";
import "./css/style.css";
import { Total, History, Operation } from "./components";

const App = () => {
  const initialState = {
    transaction: [],
  };
  const [state, setState] = useState(initialState);

  const getSum = ({ transaction }) => {
    if (transaction.length > 0) {
      const income = transaction.reduce((sum, item) => {
        if (item.type) {
          return +sum + Number(item.amount);
        } else {
          return +sum;
        }
      }, 0);
      const outcome = transaction.reduce((sum, item) => {
        if (!item.type) {
          return +sum + Number(item.amount);
        } else {
          return +sum;
        }
      }, 0);
      return { income, outcome, balance: income - outcome };
    }
    return { income: 0, outcome: 0 };
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("calculateList"));
    if (data && data.length > 0) {
      setState({ ...state, transaction: data });
    }
  }, []);

  const addTransaction = (add) => {
    const transaction = [...state.transaction, add];
    setState({ ...state, transaction });
    localStorage.calculateList = JSON.stringify(transaction);

    console.log("after add state: ", state);
  };

  const removeTransaction = (remove) => {
    console.log("remove item: ", remove);
    const transaction = state.transaction.filter(
      (item) => item.id !== remove.id
    );
    console.log("transaction after filter", transaction);
    setState({ ...state, transaction });
    if (transaction && transaction.length > 0) {
      localStorage.calculateList = JSON.stringify(transaction);
    } else {
      localStorage.removeItem("calculateList");
    }
    console.log("after remove state: ", state);
  };

  const { transaction } = state;
  const { income, outcome, balance } = getSum(state);
  console.log("state: ", state);

  return (
    <>
      <header>
        <h1>Кошелек</h1>
        <h2>Калькулятор расходов</h2>
      </header>

      <main>
        <div className="container">
          <Total income={income} outcome={outcome} balance={balance} />

          <History list={transaction} removeTransaction={removeTransaction} />

          <Operation addTransaction={addTransaction} />
        </div>
      </main>
    </>
  );
};

export default App;
