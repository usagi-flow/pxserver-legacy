const shell = require("shelljs");

//shell.cp("-R", "src/views", "app");
//shell.cp("-R", "src/views", "dist/app");
shell.cp("configuration.json", "../app/");
//shell.cp("package.dist.json", "dist/package.json");