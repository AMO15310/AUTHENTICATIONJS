require("dotenv").config();
const PORT = process.env.PORT;
const createServer = (app) => {
  try {
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};
module.exports = createServer;
