const express = require('express')
const bodyparser = require('body-parser')
const date = require(__dirname + "/date.js")
const app = express()
app.set('view engine', 'ejs');

const items = [];
const workitems = [];
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function(req, res) {
    res.render("list", { kind: date.getday(), listitem: items });
});

app.get("/work", function(req, res) {
    res.render("list", { kind: "Work ", listitem: workitems });
});

app.post("/", function(req, res) {
    const item = req.body.newitem;
    if (req.body.b == "Work ") {
        workitems.push(item);
        res.redirect("/work");
    } else {
        items.push(item);
        res.redirect("/");
    }

});


app.listen(3000, function() {
    console.log("Server started at port 3000!");
})