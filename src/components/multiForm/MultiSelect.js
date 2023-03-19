
// import React, { useState } from "react";
// import { makeStyles } from "@material-ui/core/styles";
// import TextField from "@material-ui/core/TextField";
// import MenuItem from "@material-ui/core/MenuItem";
// import Select from "@material-ui/core/Select";
// import InputLabel from "@material-ui/core/InputLabel";
// import FormControl from "@material-ui/core/FormControl";
// import Checkbox from "@material-ui/core/Checkbox";
// import ListItemText from "@material-ui/core/ListItemText";

// const useStyles = makeStyles((theme) => ({
//   formControl: {
//     margin: theme.spacing(1),
//     minWidth: 120,
//     maxWidth: 300,
//   },
//   chips: {
//     display: "flex",
//     flexWrap: "wrap",
//   },
//   chip: {
//     margin: 2,
//   },
//   noLabel: {
//     marginTop: theme.spacing(3),
//   },
// }));

// const Form = () => {
//   const classes = useStyles();
//   const [selectedValues, setSelectedValues] = useState([]);
//   const [textValue, setTextValue] = useState("");

//   const handleSelectChange = (event) => {
//     setSelectedValues(event.target.value);
//   };

//   const handleTextChange = (event) => {
//     setTextValue(event.target.value);
//   };

//   const options = [
//     { value: "option1", label: "Option 1" },
//     { value: "option2", label: "Option 2" },
//     { value: "option3", label: "Option 3" },
//     { value: "option4", label: "Option 4" },
//   ];

//   return (
//     <div>
//       <FormControl className={classes.formControl}>
//         <InputLabel id="demo-mutiple-checkbox-label">Select Options</InputLabel>
//         <Select
//           labelId="demo-mutiple-checkbox-label"
//           id="demo-mutiple-checkbox"
//           multiple
//           value={selectedValues}
//           onChange={handleSelectChange}
//           input={<TextField />}
//           renderValue={(selected) => selected.join(", ")}
//         >
//           {options.map((option) => (
//             <MenuItem key={option.value} value={option.value}>
//               <Checkbox checked={selectedValues.indexOf(option.value) > -1} />
//               <ListItemText primary={option.label} />
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>
//       <FormControl className={classes.formControl}>
//         <TextField
//           id="outlined-basic"
//           label="Text Input"
//           variant="outlined"
//           value={textValue}
//           onChange={handleTextChange}
//         />
//       </FormControl>
//     </div>
//   );
// };

// export default Form;



import React, { useState } from "react";


function Search() {
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`/search?key=${getKey(searchValue)}&value=${searchValue}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getKey = (value) => {
    // Use some logic to determine which key to use for querying based on the value
    // For example, if the value belongs to the job role key, return "jobRoleKey"
    // Otherwise, return a default key
    return "jobRoleKey";
  };

  return (
    <div>
      <input type="text" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
      <button onClick={handleSearch}>Search</button>
      <ul>
        {searchResults.map((result) => (
          <li key={result.id}>{result.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Search;
