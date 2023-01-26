const express = require("express");
const app = express();

const morgan = require("morgan");
const router = require("./router");

const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

router(app);

app.listen(port, () => {
  console.log(`Server running at port: ${port}`);
});
