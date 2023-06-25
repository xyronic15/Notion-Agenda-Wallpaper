import * as notion from "./notion.js";
import { getCurrentMonthCalendar } from "./calendar.js";
import * as wallpaper from "./wallpaper.js";
import * as cron from "node-cron";

// var for old tasks to check if the new call makes any changes
var oldTasks;

// schedule to call every 10 seconds
cron.schedule("*/5 * * * * *", async () => {
  var hasChange = false;

  // retrieve the tasks from the Notion API
  var tasks = await notion.getDayTasks();
  //   console.log(tasks);

  //check if there are any changes since the last call
  hasChange = JSON.stringify(tasks) !== JSON.stringify(oldTasks);
  console.log("There are new changes to day agenda: ", hasChange);

  //get the calendar object for the template
  var calendarObj = await getCurrentMonthCalendar();
  //   console.log(calendarObj);

  // generate a new wallpaper if there are any changes to the agenda
  if (hasChange) {
    await wallpaper.generateDayWallpaper(tasks, calendarObj);
  }

  // save the tasks for next iteration
  oldTasks = tasks;
});
