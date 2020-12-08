// Node.js require:
const Ajv = require("ajv");
const localize = require("ajv-i18n");

const schema = {
  type: "object",
  properties: {
    name: {
      type: "string",
      minLength: 10,
      // format: "email", // format只针对于 string 和 number
      // format: "test", // 自定义验证方法
      // test: false // 自定义验证关键字
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

// 自定义验证方法
// ajv.addFormat("test", data => {
//   console.log("自定义验证format", data);
//   return data === "haha";
// })

// 自定义验证关键字
ajv.addKeyword("test", {
  validate(schema, data) {
    console.log("schema", schema, data);
    if(schema) {
      return true;
    } else {
      return schema.length === 6;
    }
  }
})

const validate = ajv.compile(schema);
const valid = validate({
  name: "haha",
  age: 18,
  pets: ["red", 12, "pink"],
  isWorker: true
});
if (!valid) {
  localize.zh(validate.errors);
  console.log("validate.errors", validate.errors);
}