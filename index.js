var express = require("express");
var hbs = require("express-handlebars")
var app = express();
var db = require("./db/connection")

app.use("/public", express.static("public"));


app.set("view engine", "hbs")
app.engine(".hbs", hbs ({
  extname: ".hbs",
  partialDir: "views/",
  layoutsDir: "views/",
  defaultLayout: "layout-main"
}));


app.get("/", function(req, res){
  res.render("app-welcome");
});

app.get("/candidates", function(req, res){
  res.render("candidates-index", {
    candidates: db.candidates
  });
});

app.get("/candidates/:name", function(req, res){
var desiredName=req.params.name;
var candidateOutput;
db.candidates.forEach(function(candidate){
  if(desiredName === candidate.name) {
      candidateOutput = candidate
    }
  });
  res.render("candidates-show", {
    candidate: candidateOutput
  });
});

app.listen(1913, function(){
  console.log("We are in business people!");
});
