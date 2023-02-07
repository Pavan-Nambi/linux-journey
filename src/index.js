const fs = require("fs");
const path = require("path");

const SEARCH_STRING = "<script src=\"../quiz.js\"></script>\n\n<div id=\"quiz\">\n  {{ createQuiz(\"Who developed the Linux kernel?\", \"Linus Torvalds\") }}\n</div>";

const walk = (dir, done) => {
  let results = [];
  fs.readdir(dir, (err, list) => {
    if (err) return done(err);
    let i = 0;
    (function next() {
      let file = list[i++];
      if (!file) return done(null, results);
      file = path.resolve(dir, file);
      fs.stat(file, (err, stat) => {
        if (stat && stat.isDirectory()) {
          walk(file, (err, res) => {
            results = results.concat(res);
            next();
          });
        } else {
          if (path.extname(file) === ".md") {
            results.push(file);
          }
          next();
        }
      });
    })();
  });
};

walk(".", (err, results) => {
  if (err) throw err;
  results.forEach(file => {
    fs.readFile(file, "utf8", (err, data) => {
      if (err) throw err;
      if (data.includes(SEARCH_STRING)) {
        const updatedData = data.replace(SEARCH_STRING, "");
        fs.writeFile(file, updatedData, "utf8", err => {
          if (err) throw err;
        });
      }
    });
  });
});
