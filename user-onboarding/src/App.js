import axios from 'axios'
import React, { useState, useEffect } from 'react'
import Form from './Form'
import schema from './formSchema'
import * as yup from 'yup'

const initialFormValues = {
  name: '',
  email: '',
  password: '',
  tos: false,
}
const initialFormErrors = {
  name: '',
  email: '',
  password: '',

}

const initialUser = []
const initialDisabled = true

export default function App() {
  //USE STATE
  const [user, setUser] = useState(initialUser)
  const [formValues, setFormValues] = useState(initialFormValues)
  const [formErrors, setFormErrors] = useState(initialFormErrors)
  const [disabled, setDisabled] = useState(initialDisabled)

  const getUser = () => {
    axios
    .get('https://reqres.in/')
    .then((res) => {
      setUser(res.data)
    })
    .catch((err) => {
      console.log(err);
    })
  }

  const postNewUser = newUser => {
    axios
    .post('https://reqres.in/', newUser)
    .then((res) => {
      setUser([res.data, ...user]);
      setFormValues(initialFormValues);
    })
    .catch((err) => {
      console.log(err)
    })
  }

  const formSubmit = () => {
    const newUser = {
      name: formValues.name.trim(),
      email: formValues.email.trim(),
      password: formValues.password.trim(),
      tos: formValues.tos
    }
    postNewUser(newUser)
  }


  const inputChange = (name, value) => {
    yup
    .reach(schema,name)
    .validate(value)
    .then(() => {
      setFormErrors({
        ...formErrors,
        [name]: "",
      })
      .catch((err) => {
        setFormErrors({
          ...formErrors,
          [name]: err.errors[0]
        })
      })
    })

    setFormValues({
      ...formValues,
      [name]: value
    })
  }
//SIDE EFFECTS
useEffect(() => {
  getUser()
}, [])

useEffect(() => {
  schema.isValid(formValues).then((valid) => {
    setDisabled(!valid);
  })
}, [formValues])

return (
  <div className='container'>
    <header><h1>USER ONBOARDING</h1></header>

  <Form 
    values={formValues}
    change={inputChange}
    submit={formSubmit}
    disabled={disabled}
    errors={formErrors}
  />

  {/* <div>
    {
      user.map(use => {
        return (
          <div>
            <h2>{use.name}</h2>
            <h3>{use.email}</h3>
            <h4>{use.password}</h4>
            <p>{use.tos}</p>
          </div>
        )
      })
    }
    
  </div> */}
  </div>
)



}




















// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
