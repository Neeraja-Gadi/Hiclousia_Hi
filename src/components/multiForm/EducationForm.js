import React, { useState } from 'react';
import {useNavigate} from "react-router-dom"

const userId= JSON.parse(localStorage.getItem("userDetails"))

const EducationForm = () => {
  const [educationList, setEducationList] = useState([
    { id: 1,userDetailsID:userId._id, educationLevel: 'Graduation', collegeName: '', authority: '', discipline: '', yearOfpassout: '' },
  ]
     
  );
  const navigate = useNavigate()  ;

  const handleAddEducation = () => {
    const newEducation = { id: educationList.length + 1,userDetailsID:userId._id, educationLevel: '', collegeName: '', authority: '', discipline: '', yearOfpassout: '' };
    setEducationList([...educationList, newEducation]);
  };

  const handleRemoveEducation = (id) => {
    const updatedList = educationList.filter((education) => education.id !== id);
    setEducationList(updatedList);
  };

  const handleChange = (id, e) => {
    const { name, value } = e.target;
    const updatedList = educationList.map((education) =>
      education.id === id ? { ...education, [name]: value } : education
    );
    setEducationList(updatedList);
  };

  const handleSubmit =async (event) => { 
    event.preventDefault();
    SaveEducation()
    navigate("/multiform8")
     
    // let navicheck =  SaveEducation()
    //  setTimeout(()=>{if(navicheck)navigate("/multiform8")
    //  else {alert("Error")}} , 8000   )
  }
      
    // console.log(userId._id)
    // console.log(educationList)
    //  alert(JSON.stringify(educationList));
  
  function SaveEducation() {
    let eduInfo = educationList
        eduInfo.map((e,index)=>{fetch("http://localhost:8000/education", {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(e)
    
      }).then(response => response.json().then(data => {console.log(data)
        if(data.status === false)return false}))} )
        return true
      }

  return (
    <div>
      <h2>Education Details</h2>
      {educationList.map((education) => { return (
        <div key={education.id} className="form-group">
          <label htmlFor={`degree${education.id}`}>Degree:      </label>
          <select name="educationLevel" id={`educationLevel${education.id}`} value={education.educationLevel} onChange={(e) => handleChange(education.id, e)}>
            <option disabled selected>Select</option>
            <option value="Graduation">Graduation</option>
            <option value="Post Graduation">Post Graduation</option>
            <option value="PhD">PhD</option>
          </select>
          <br/>
          <br/>
          <label htmlFor={`collegeName${education.id}`}>College Name: <span/> <span/> </label>
          <input type="text" name="collegeName" id={`collegeName${education.id}`} value={education.collegeName} onChange={(e) => handleChange(education.id, e)} />
            <br/>  
            <br/>
          <label htmlFor={`authority${education.id}`}>Authority:        </label>
          <input type="text" name="authority" id={`authority${education.id}`} value={education.authority} onChange={(e) => handleChange(education.id, e)} />
          <br/>
          <br/>
          <label htmlFor={`discipline${education.id}`}>Discipline:      </label>
          <input type="text" name="discipline" id={`discipline${education.id}`} value={education.discipline} onChange={(e) => handleChange(education.id, e)} />
          <br/>
          <br/>
          <label htmlFor={`yearOfPassout${education.id}`}>Year of Passout:      </label>
          <input type="date" name="yearOfpassout" id={`yearOfpassout${education.id}`} value={education.yearOfpassout} onChange={(e) => handleChange(education.id, e)} />
          <br/>
          <br/>
          {educationList.length !== 1 && (
            <button type="button" className="remove" onClick={() => handleRemoveEducation(education.id)}>
              Remove
            </button>
          )}
        </div>
      )})}

      <button type="button" className="add" onClick={handleAddEducation}>
        Add Education
      </button>
      <button onClick={handleSubmit }>
              Submit
       </button>
    </div>
  );
};

export default EducationForm;


// import React, { useState } from 'react';
// import TextField from '@material-ui/core/TextField';
// import Button from '@material-ui/core/Button';
// import Box from '@material-ui/core/Box';
// import Typography from '@material-ui/core/Typography';

// const EducationForm = () => {
//   const [education, setEducation] = useState([
//     {
//       type: 'Graduation',
//       collegeName: '',
//       authority: '',
//       discipline: '',
//       yearOfPassout: '',
//     },
//   ]);

//   const handleAddEducation = () => {
//     setEducation([
//       ...education,
//       {
//         type: '',
//         collegeName: '',
//         authority: '',
//         discipline: '',
//         yearOfPassout: '',
//       },
//     ]);
//   };
// //   const handleRemoveEducation = (id) => {
// //         const updatedList = educationList.filter((education) => education.id !== id);
// //          setEducationList(updatedList);
// //        };

//   const handleEducationChange = (index, field, value) => {
//     const updatedEducation = [...education];
//     updatedEducation[index][field] = value;
//     setEducation(updatedEducation);
//   };

//   return (
//     <Box m={2}>
//       <Typography variant="h5" color="primary" align="center">
//         Education Details
//       </Typography>
//       {education.map((educationItem, index) => (
//         <Box key={index} mt={2}>
//           <Typography variant="subtitle1" color="primary">
//             {`${educationItem.type} Details`}
//           </Typography>
//           <Box display="flex" flexDirection="column">
//             <TextField
//               label="College Name"
//               value={educationItem.collegeName}
//               onChange={(event) =>
//                 handleEducationChange(index, 'collegeName', event.target.value)
//               }
//             />
//             <TextField
//               label="Authority"
//               value={educationItem.authority}
//               onChange={(event) =>
//                 handleEducationChange(index, 'authority', event.target.value)
//               }
//             />
//             <TextField
//               label="Discipline"
//               value={educationItem.discipline}
//               onChange={(event) =>
//                 handleEducationChange(index, 'discipline', event.target.value)
//               }
//             />
//             <TextField
//               label="Year of Passout"
//               value={educationItem.yearOfPassout}
//               onChange={(event) =>
//                 handleEducationChange(index, 'yearOfPassout', event.target.value)
//               }
//             />
//           </Box>
//         </Box>
//       ))}
//       <Box display="flex" justifyContent="center" mt={2}>
//         <Button variant="contained" color="primary" onClick={handleAddEducation}>
//           Add Education
//         </Button>
//       </Box>
//     </Box>
//   );
// };

// export default EducationForm;
