import { useState } from "react";
import "./Calculator.css";

export default function Calculator() {
  const [input, setInput] = useState("");

  const handleClick = (value) => {
    setInput((prev) => prev + value);
  };

  const calculate = () => {
    try {
      setInput(eval(input).toString()); // Be cautious with eval; for production, use a safer library.
    } catch {
      setInput("Error");
    }
  };

  const clearInput = () => {
    setInput("");
  };

  return (
    <div className="calculator">
      <div className="display">{input || "0"}</div>
      <div className="buttons">
        {["1", "2", "3", "+", "4", "5", "6", "-", "7", "8", "9", "*", "0", ".", "=", "/"].map((btn) => (
          <button
            key={btn}
            onClick={() => (btn === "=" ? calculate() : handleClick(btn))}
          >
            {btn}
          </button>
        ))}
        <button onClick={clearInput} className="clear">
          Clear
        </button>
      </div>
    </div>
  );
}
