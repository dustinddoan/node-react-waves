export const validate = (element, formdata= []) => {
  let error = [true, ''];



  if (element.validation.email) {
      const valid = /\S+@\S+\.\S+/.test(element.value);
      const message = `${ !valid ? 'Must be a valid email' : '' }`
      error = !valid ? [valid, message] : error
  }

  if (element.validation.confirm) {
      const valid = element.value.trim() === formdata[element.validation.confirm].value
      const message = `${ !valid ? 'Password do not match' : '' }`
      error = !valid ? [valid, message] : error
  }

  if (element.validation.required) {
      const valid = element.value.trim() !== '';
      const message = `${ !valid ? 'This field is required' : '' }`
      error = !valid ? [valid, message] : error
  }

  return error
}

export const update = (element, formdata, formName) => {
  // element:  {event: SyntheticEvent, id: "email"}
  const newFormdata = {
      ...formdata
  }

  // console.log('newFormdata: ', formdata)
  const newElement = {
      ...newFormdata[element.id] //email
  }

  newElement.value = element.event.target.value;
  // console.log(newElement.value)
  
  if (element.blur) {
      let validData = validate(newElement, formdata)
      newElement.valid = validData[0];
      newElement.validationMessage = validData[1];
  }

  newElement.touched = element.blur;
  newFormdata[element.id] = newElement
  // console.log(newFormdata)

  return newFormdata

}

export const generateData = (formdata, formName) => {
  let dataToSubmit = {};
  
  for (let key in formdata) {
    // console.log(formdata[key])
    dataToSubmit[key] = formdata[key].value;
  }

  return dataToSubmit;
}

export const isFormValid = (formdata, formName) => {
  let formIsValid = true;

  for(let key in formdata) {
        // console.log(formdata[key])
    formIsValid = formdata[key].valid && formIsValid;
  }

  return formIsValid;
}