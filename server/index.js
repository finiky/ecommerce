const app = require("./app");
const mongoose = require("mongoose");
const mongodbURI = "mongodb://localhost:27017/mongo"
const port = process.env.PORT || 4000;
mongoose.connect(mongodbURI);
app.listen(port, () => {
    console.log(`API server started at http://localhost:${port}`);
})