const mongoose = require("mongoose");

const url = `mongodb+srv://shreya_nawani:Onecallaway11*@cluster0.vxw1w.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const connectionParams = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
};
mongoose
  .connect(url, connectionParams)
  .then(() => {
    console.log("Connected to database ");
  })
  .catch((err) => {
    console.error(`Error connecting to the database. \n${err}`);
  });
