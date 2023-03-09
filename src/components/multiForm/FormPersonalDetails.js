// import React, { Component } from 'react';
// import Dialog from '@material-ui/core/Dialog';
// import AppBar from '@material-ui/core/AppBar';
// import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
// import TextField from '@material-ui/core/TextField';
// import Button from '@material-ui/core/Button';

// export class FormPersonalDetails extends Component {
//   continue = e => {
//     e.preventDefault();
//     this.props.nextStep();
//   };

//   back = e => {
//     e.preventDefault();
//     this.props.prevStep();
//   };

//   render() {
//     const { values, handleChange } = this.props;
//     return (
//       <MuiThemeProvider>
//         <>
//           <Dialog
//             open
//             fullWidth
//             maxWidth='sm'
//           >
//             <AppBar title="Enter Personal Details" />
//             <TextField
//               placeholder="Education"
//               label="Education"
//               onChange={handleChange('occupation')}
//               defaultValue={values.occupation}
//               margin="normal"
//               fullWidth
//             />
//             <br />
//             <TextField
//               placeholder="Enter Your Institue"
//               label="Institue"
//               onChange={handleChange('city')}
//               defaultValue={values.city}
//               margin="normal"
//               fullWidth
//             />
//             <br />
//             <TextField
//               placeholder="Enter Your Course"
//               label="Course"
//               onChange={handleChange('bio')}
//               defaultValue={values.bio}
//               margin="normal"
//               fullWidth
//             />
//             <br />

//             <Button
//               color="secondary"
//               variant="contained"
//               onClick={this.back}
//             >Back</Button>

//             <Button
//               color="primary"
//               variant="contained"
//               onClick={this.continue}
//             >Continue</Button>
//           </Dialog>
//         </>
//       </MuiThemeProvider>
//     );
//   }
// }

// export default FormPersonalDetails;

import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export class FormPersonalDetails extends Component {
  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    const { values, handleChange } = this.props;
    return (
      <MuiThemeProvider>
        <>
          <Dialog
            open
            fullWidth
            maxWidth='sm'
          >
            <AppBar title="Enter Personal Details" />
            <TextField
              placeholder="Year of Passout"
              label="Enter year of passout"
              onChange={handleChange('occupation')}
              defaultValue={values.occupation}
              margin="normal"
              fullWidth
            />
            <br />
            <TextField
              placeholder="Enter years of Experience"
              label="Experience"
              onChange={handleChange('city')}
              defaultValue={values.city}
              margin="normal"
              fullWidth
            />
            <br />
            <TextField
              placeholder="Enter Your Organization"
              label="Organization"
              onChange={handleChange('bio')}
              defaultValue={values.bio}
              margin="normal"
              fullWidth
            />
            <br />

            <Button
              color="secondary"
              variant="contained"
              onClick={this.back}
            >Back</Button>

            <Button
              color="primary"
              variant="contained"
              onClick={this.continue}
            >Continue</Button>
          </Dialog>
        </>
      </MuiThemeProvider>
    );
  }
}

export default FormPersonalDetails;
