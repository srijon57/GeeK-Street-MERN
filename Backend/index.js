import express from "express";
const app = express();

app.get("/", (req, res) => {
  res.status(200).send("Welcome to GEEK street Mern");
});

app.get("/login", (req, res) => {
  res.status(200).json({ msg: "registration successful" });
});

const PORT = 5175;
app.listen(PORT, () => {
  console.log(`server is running at port: ${PORT}`);
});