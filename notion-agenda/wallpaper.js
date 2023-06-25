import nodeHtmlToImage from "node-html-to-image";
import { readFileSync } from "fs";

const generateDayWallpaper = async (tasks, calendarObj) => {
  //get the current date and time in the correct format
  let tzoffset = 4 * 60 * 60000; //timezone offset between UTC and EST
  let currentDate = new Date(Date.now() - tzoffset).toLocaleDateString(
    "en-us",
    { month: "long", day: "numeric" }
  );
  let currentDay = new Date(Date.now() - tzoffset).toLocaleDateString("en-us", {
    weekday: "long",
  });

  //   generate the background image
  var background = readFileSync("assets/Notion Day Agenda.png");
  var backgroundBase64 = Buffer.from(background, "binary").toString("base64");
  var backgroundUrl = `data:image/png};base64,${backgroundBase64}`;

  // generate the different fonts used
  var dm_sansregularBase64 = Buffer.from(
    readFileSync("assets/fonts/dmsans-regular-webfont.woff2"),
    "binary"
  ).toString("base64");
  var dm_sansregular = `data:application/font-woff;charset=utf-8;base64,${dm_sansregularBase64}`;
  var dm_sansmediumBase64 = Buffer.from(
    readFileSync("assets/fonts/dmsans-medium-webfont.woff2"),
    "binary"
  ).toString("base64");
  var dm_sansmedium = `data:application/font-woff;charset=utf-8;base64,${dm_sansmediumBase64}`;
  var dm_sansboldBase64 = Buffer.from(
    readFileSync("assets/fonts/dmsans-bold-webfont.woff2"),
    "binary"
  ).toString("base64");
  var dm_sansbold = `data:application/font-woff;charset=utf-8;base64,${dm_sansboldBase64}`;
  var nanumgothiccodingregularBase64 = Buffer.from(
    readFileSync("assets/fonts/nanumgothiccoding-regular-webfont.woff2"),
    "binary"
  ).toString("base64");
  var nanumgothiccodingregular = `data:application/font-woff;charset=utf-8;base64,${nanumgothiccodingregularBase64}`;

  //   generate the image using node-html-to-image package
  const images = await nodeHtmlToImage({
    content: [
      {
        Name: tasks.Name,
        Category: tasks.Category,
        Priority: tasks.Priority,
        Time: tasks.Time,
        output: "../wallpaper/dayagenda.png",
      },
      {
        Name: tasks.Name,
        Category: tasks.Category,
        Priority: tasks.Priority,
        Time: tasks.Time,
        output: "../wallpaper/dayagenda copy.png",
      },
    ],
    html: `
            <html>

            <head>

                <style>
                    
                    @font-face {
                        font-family: 'dm_sansregular';
                        src: url(${dm_sansregular}) format('woff2');
                    }

                    @font-face {
                        font-family: 'dm_sansmedium';
                        src: url(${dm_sansmedium}) format('woff2');
                    }

                    @font-face {
                        font-family: 'dm_sansbold';
                        src: url(${dm_sansbold}) format('woff2');
                    }
    
                    @font-face {
                        font-family: 'nanumgothiccodingregular';
                        src: url(${nanumgothiccodingregular}) format('woff2');
                    }

                    body {
                        width: 1920px;
                        height: 1080px;
                        font-family: 'dm_sansregular';
                        background-image: url(${backgroundUrl});
                        background-size: cover;
                        color: #273D69;
                    }

                    ul {
                        margin: 0;
                        padding: 0;
                    }

                    ul.dashed {
                        list-style-type: none;
                    }

                    ul.dashed>li:before {
                        content: "- ";
                    }

                    #curr_date {
                        font-family: 'dm_sansbold';
                        color: white;
                        width: 521px;
                    }

                    #curr_date h1 {
                        position: absolute;
                        font-size: 90px;
                        top: 170px;
                        left: 155px;
                        margin: 0;
                    }

                    #curr_date h2 {
                        position: absolute;
                        font-size: 22px;
                        top: 280px;
                        left: 155px;
                        margin: 0;
                    }

                    #month_title {
                        width: 474px;
                        position: absolute;
                        top: 427px;
                        left: 201px;
                    }

                    #month_title h1 {
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        text-transform: uppercase;
                        font-size: 50px;
                    }

                    #month_dates_text {
                        font-family: "nanumgothiccodingregular";
                        font-size: 38px;
                        height: 427px;
                        width: 511px;
                        line-height: 2;
                        position: absolute;
                        top: 550px;
                        left: 190px;
                    }

                    .empty {
                        list-style-type: none;
                        text-align: center;
                    }

                    #name, #category, #priority, #time{
                        font-family: 'dm_sansmedium';
                        font-size: 20px;
                        margin: 0;
                        padding: 0;
                        position: absolute;
                        top: 205px;
                        height: 722px;
                    }

                    #name {
                        left: 860px;
                        width: 385px;
                    }

                    #category{
                        left: 1300px;
                        width: 150px;
                    }

                    #priority{
                        left: 1473px;
                        width: 140px;
                    }

                    #time{
                        left: 1630px;
                        width: 200px;
                    }
                </style>
            </head>

            <body>
                <div id="curr_date">
                    <h1>${currentDate}</h1>
                    <h2>${currentDay}</h2>
                </div>
                <div id="month_title">
                    <h1>${calendarObj.month}</h1>
                </div>
                <div id="month_dates_text">
                    <p style="margin:0;">
                        ${calendarObj.dates}
                    </p>
                </div>
                <div id="name">
                    <ul class="dashed">
                        {{#each Name}}
                            <li>{{this}}</li>
                            </br></br>
                        {{/each}}
                    </ul>
                </div>
                <div id="category">
                    <ul class="empty">
                        {{#each Category}}
                            <li>{{this}}</li>
                            </br></br>
                        {{/each}}
                    </ul>
                </div>
                <div id="priority">
                    <ul class="empty">
                        {{#each Priority}}
                            <li>{{this}}</li>
                            </br></br>
                        {{/each}}
                    </ul>
                </div>
                <div id="time">
                    <ul class="empty">
                        {{#each Time}}
                            <li>{{this}}</li>
                            </br></br>
                        {{/each}}
                    </ul>
                </div>

            </body>

            </html>`,
  }).then(() => console.log("The image was created successfully!"));
};

export { generateDayWallpaper };
