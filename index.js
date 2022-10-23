const http = require("http");
const fs = require("fs");
let args = require("minimist")(process.argv.slice(2), {});

// console.log(args.port);

let homeContent = "";
let projectContent = "";
let registrationContent = "";
// let cssContent = "";
let mainScriptContent = "";

let port;
fs.readFile("home.html", (asad, home) => {
  if (asad) {
    throw asad;
  }
  homeContent = home;
});

fs.readFile("project.html", (asad, project) => {
  if (asad) {
    throw asad;
  }
  projectContent = project;
});

fs.readFile("registration.html", (asad, registration) => {
  if (asad) {
    throw asad;
  }
  registrationContent = registration;
});

// fs.readFile("style.css", (asad, css) => {
//   if (asad) {
//     throw asad;
//   }
//   cssContent = css;
// });

fs.readFile("main.js", (asad, mainScript) => {
  if (asad) {
    throw asad;
  }
  mainScriptContent = mainScript;
});
http
  .createServer((request, response) => {
    let url = request.url;
    // console.log(url);

    response.writeHeader(200, { "Content-Type": "text/html" });

    switch (url) {
      case "/project":
        response.write(projectContent);
        response.end();
        break;
      case "/registration":
        response.write(registrationContent);
        response.end();
        break;
      // case "/style.css":
      //   response.writeHeader(200, { "Content-Type": "text/css" });
      //   response.write(cssContent);
      //   response.end();
      //   break;

      case "/main.js":
        response.writeHead(200, { "Content-Type": "text/script" });
        response.write(mainScriptContent);
        response.end();
        break;
      default:
        response.write(homeContent);
        response.end();
        break;
    }
  })
  .listen(args.port);
