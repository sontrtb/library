const user = require("./user");
const auth = require("./auth");
const category = require("./category");
const book = require("./book");
const interaction = require("./interaction");
const recomment = require("./recoment");

const routers = (app) => {

    app.use("/api/v1/user", user);
    app.use("/api/v1/auth", auth);
    app.use("/api/v1/category", category);
    app.use("/api/v1/book", book);
    app.use("/api/v1/interaction", interaction);
    app.use("/api/v1/recomment", recomment);

    app.use("/", (req, res) => {
        return res.send("<h1>Server on</h1>")
    })
}

module.exports = routers