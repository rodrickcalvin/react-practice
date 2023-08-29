import React, { useState } from "react";

const InputElement = () => {
  const [inputText, setInputText] = useState("");
  const [historyList, setHistoryList] = useState([]);

  return (
    <div>
      <input
        onChange={(e) => { 
          setInputText(e.target.value) 
          setHistoryList([...historyList, e.target.value])
        }}
        placeholder="Enter Some Text" />

      {inputText}
      <hr /><br />
      {historyList}
    </div>
  )
};

export default InputElement;
