// Node.js require:
const Ajv = require("ajv");

const schema = {
  type: "object",
  properties: {
    name: {
      type: "string",
      // format: "email", // format只针对于 string 和 number
      format: "test",
      minLength: 1
    },
    age: {
      type: "number"
    },
    pets: {
      type: "array",
      // 都为字符串
      // items: {
      //   type: "string"
      // }
      // 数组第一项为字符串，第二项为数字
      items: [
        {
          type: "string"
        },
        {
          type: "number"
        }
      ]
    },
    isWorker: {
      type: "boolean"
    }
  },
  required: ["name", "age"]
}

const ajv = new Ajv();
ajv.addFormat("test", data => {
  console.log("自定义验证format", data);
  return data === "haha";
})
const validate = ajv.compile(schema);
const valid = validate({
  name: "haha",
  age: 18,
  pets: ["red", 12, "pink"],
  isWorker: true
});
if (!valid) console.log(validate.errors);