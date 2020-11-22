const mongoose = require("mongoose");
// const {props} = require("../src/components/admin/NumCounter");
const { Schema } = mongoose;

// TODO
// workorderSchema
// memberId:    Number
// dateIn:      Number
// dateOut:     Number
// brand:       String
// model:       String
// colour:      String
// service:     []
// status:      []

const workorderSchema = new Schema(
  {
    workorder: {
      // workorderNum: {
      //   type: Number,
      //   default: props.NumCounter(),
      //   // default: useState(() => prevState => prevState + 1),
      // },
      dateIn: {
        type: String,
        default: Date(),
      },
      // dateOut: {
      //   type: String,
      //   default: true,
      // },
      brand: String,
      model: String,
      // brand: {
      //   type: String,
      //   required: true,
      // },
      // model: {
      //   type: String,
      //   required: true,
      // },
      // colour: {
      //   type: String,
      //   default: true,
      // },
      // service: [String],

      // status: {
      //   type: [],
      //   default: true,
      // },
      // parts: [],
    },
  },
  {
    timestamps: { createdAt: "created_at" },
  }
);

module.exports = mongoose.model("WorkorderModel", workorderSchema);
