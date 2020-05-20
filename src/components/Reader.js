import React from "react";
import ReactDOM from "react-dom";
import CSVReader from "react-csv-reader";
import "./styles.css";

const handleFileread = (data, fileInfo) => {
  console.log(data, fileInfo);
  window.localStorage.setItem("excelDAta", JSON.stringify(data));
  window.localStorage.setItem("file", JSON.stringify(fileInfo));
};
const papaparseOptions = {
  header: true,
  dynamicTyping: true,
  skipEmptyLines: true,
  transformHeader: header => header.toLowerCase().replace(/\W/g, "_")
};

export const Reader = ({ onFileLoad }) => {
  return (
    <div className="container">
      <CSVReader
        cssClass="react-csv-input"
        label="Select CSV with secret Death Star statistics"
        onFileLoaded={onFileLoad}
        parserOptions={papaparseOptions}
      />
      <p>and then open the console</p>
    </div>
  );
};

// export default Reader;
