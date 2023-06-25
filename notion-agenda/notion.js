import { Client } from "@notionhq/client";
import dotenv from "dotenv";

dotenv.config();

// notion object
const notion = new Client({ auth: process.env.NOTION_KEY });

// database ID pulled from env variables
const dbId = process.env.NOTION_DB_ID;

const getDayTasks = async () => {
  console.log("Getting today's tasks");

  let tzoffset = 4 * 60 * 60000; //timezone offset between UTC and EST in milliseconds -> alter this if you are ina different timezone
  let date = new Date(Date.now() - tzoffset).toISOString().slice(0, 10);
  console.log(date);

  // query the database
  const response = await notion.databases.query({
    database_id: dbId,
    filter: {
      and: [
        {
          property: "Completed",
          checkbox: {
            equals: false,
          },
        },
        {
          property: "Date",
          date: {
            equals: date,
          },
        },
      ],
    },
    sorts: [
      {
        property: "Date",
        direction: "ascending",
      },
      {
        property: "Priority",
        direction: "ascending",
      },
    ],
  });

  var data = {
    Name: [],
    Priority: [],
    Category: [],
    Time: [],
  };

  // format the results
  const results = response.results;
  results.map((task) => {
    var name = task.properties.Name.title[0].plain_text;
    var priority = task.properties.Priority.select?.name || "Low";
    var category = task.properties.Category.select?.name || "Others";
    var time = task.properties.Time.formula.string;

    // console.log(name);
    // console.log(priority);
    // console.log(category);
    // console.log(time);
    // console.log("------------------------");

    data.Name.push(name);
    data.Priority.push(priority);
    data.Category.push(category);
    data.Time.push(time);
  });

  // console.log(data);
  return data;
};

//export all functions
export { getDayTasks };
