import React from "react";
import Select, { StylesConfig } from 'react-select';

const options = [
  { value: "everyone", label: "Everyone" },
  { value: "someone", label: "Someone" },
  { value: "tas", label: "TAs" },
];

// Define custom styles to remove padding
const customStyles: StylesConfig = {
    control: (provided) => ({
      ...provided,
      padding: 0, // Remove padding
      width: "100%",
      height: '45px'
    })
  };
  
export default function AssignTo() {
  return (
    <Select
      defaultValue={options[0]}
      isMulti
      name="colors"
      options={options}
      className="basic-multi-select mb-3"
      classNamePrefix="select"
      styles= {customStyles}
    />
  );
}
