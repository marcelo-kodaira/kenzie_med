import * as yup from "yup"

const schema = yup.object({
  name: yup.string().required("'name' is a required information"),
  email: yup.string().email().required("'email' is a required information"),
  password: yup.string().required("'password' is a required information"),
  CRM: yup.string().length(8, "Not a valid CRM. Must have 8 characters").required("'CRM' is a required information"),
  sex: yup.string().required("'sex' is a required information"),
  age: yup.number().min(18, "Must be 18 or older").max(99, "Must be 99 or younger").required("'age' is a required information"),
  specialtiesId: yup
    .object({
      id: yup.number(),
    })
    .required("'specialtiesId' is a required information"),
  address: yup
    .object({
      district: yup.string().required("'district' is a required information"),
      zipCode: yup.string().required("'zipCode' is a required information"),
      number: yup.number().min(1, "'number' must be greater than 0").required("'number' is a required information"),
      city: yup.string().required("'city' is a required information"),
      state: yup.string().length(2, "Not a valid state. Must have 2 characters").required("'state' is a required information"),
    })
    .required("'address' is a required information"),
})

export default schema
