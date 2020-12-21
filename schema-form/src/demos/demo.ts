export default {
  name: 'Demo',
  schema: {
    type: 'object'
  },
  uiSchema: {},
  default: {
    firstName: 'Chuck',
    lastName: 'Norris',
    age: 75,
    bio: 'Roundhouse kicking asses since 1940',
    password: 'noneed',
    singleTypeArray: [{ name: 'jokcy', age: 12 }],
  },
}

