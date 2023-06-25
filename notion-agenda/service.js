// var Service = require('node-windows').Service;
import { Service } from "node-windows";
var svc = new Service({
  name: "Notion Wallpaper API",
  description: "Node project scheduled to generate a notion agenda wallpaper",
  script:
    "<YOUR REPOSITORY PATH>\\notion-agenda\\index.js",
});

//installations script
svc.on("install", function () {
  svc.start();
});

//uninstall script
svc.on("uninstall", function () {
  console.log("Uninstall complete");
});

//call install event
svc.install();

//call uninstall if want to remove
// svc.uninstall();
