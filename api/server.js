const express = require("express");
const app = express();
const cors = require("cors");
const {Users}  = require("./users");
const port = 5500;

app.use(cors());
app.get("/", (req, res) => {
    const {q} = req.query;
    console.log(q);
    const keys = ["first_name", "last_name", "email"];
    const searchUsers  = (users) => {
        return users.filter((item) => keys.some((key) => item[key].toLowerCase().includes(q)));    }

    try {
        res.status(200).json({
            status: "success",
            data: searchUsers(Users).splice(0, 10)
        }) 
    } catch(err) {
        res.status(err.statusCode).json({
            status: "error",
            message: err.message
        })
    }
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})
