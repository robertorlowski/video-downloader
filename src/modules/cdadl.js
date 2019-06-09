var fs = require("fs");
//var url = require("url");
//var Crawler = require("crawler");
//var request = require("request").defaults({ jar: true });
//var progress = require("request-progress");
//var setCookie = require("set-cookie-parser");
//var cookies;

const _cheerio = require("cheerio");
const _dasu = require("dasu");
const _url = require("url");

//var downloads = {};
//var filenamePrefix = "";
//var title;

function rot13(s) {
  return (s ? s : this)
    .split("")
    .map(function(_) {
      if (!_.match(/[A-Za-z]/)) return _;
      var c = Math.floor(_.charCodeAt(0) / 97);
      var k = (_.toLowerCase().charCodeAt(0) - 83) % 26 || 26;
      return String.fromCharCode(k + (c == 0 ? 64 : 96));
    })
    .join("");
}

function findBetween(strToParse, strStart, strFinish) {
  var str = strToParse.match(strStart + "(.*?)" + strFinish);
  if (str === null) return "";
  if (str.length < 2) return "";
  return str[1];
}

function downloadMovie(movieURL) {
  if (movieURL === null || movieURL === "" || movieURL.indexOf(".mp4") === -1) {
    return;
  }
  var startTime = process.hrtime();
  console.log("videourl:", movieURL);
  var fl = movieURL
    .split("?")[0]
    .split("/")
    .pop()
    .trim();

  filenamePrefix =
    title
      .replace(/[^a-z0-9]/gi, ".")
      .replace("..", ".")
      .replace("..", ".") + ".";

  fl =
    filenamePrefix +
    fl
      .split("/")
      .pop()
      .trim();
  console.log("out file:", fl);

  var fileSizeInBytes = 0;
  try {
    var stats = fs.statSync(fl);
    fileSizeInBytes = stats.size;
  } catch (e) {}

  var headers = {
    "User-Agent": "cdadl",
    Cookie: "",
    "Accept-Ranges": "bytes"
  };

  cookies.forEach(function(e) {
    headers.Cookie += e.name + "=" + e.value + "; ";
  });

  request(
    {
      url: movieURL,
      method: "HEAD",
      headers: headers
    },
    function callback(err, inc, res) {
      var conlen = inc.headers["content-length"];
      //console.log("conlen"+conlen);
      if (fileSizeInBytes < conlen) {
        rng = "bytes=" + fileSizeInBytes + "-" + (conlen - 1);
        headers.Range = rng;
        //console.log(rng);
        //console.log(headers);
        progress(
          request({
            url: movieURL,
            headers: headers
          }),
          {
            throttle: 1000, // Throttle the progress event to 2000ms, defaults to 1000ms
            delay: 500, // Only start to emit after 1000ms delay, defaults to 0ms
            startSize: fileSizeInBytes,
            totalSize: conlen
          }
        )
          .on("response", function(resp) {
            if (resp.statusCode != 200) {
              //console.error("statusCode:", resp.statusCode);
              //process.exit();
              //console.log("e:", err);
              //console.log("i:", inc);
              //console.log("resp:", resp);
              //console.log("resp:", resp.headers);
            }
          })
          .on("progress", function(state) {
            status =
              //("      "+(state.percentage*100).toFixed(2)).slice(-6) + "% " +  // this request percentage
              (
                "      " +
                (
                  ((fileSizeInBytes + state.size.transferred) * 100) /
                  conlen
                ).toFixed(2)
              ).slice(-6) +
              "% " + // total file percentage
              (
                "               " +
                (
                  (fileSizeInBytes + state.size.transferred) /
                  1024 /
                  1024
                ).toFixed(1) +
                "/" +
                ((fileSizeInBytes + state.size.total) / 1024 / 1024).toFixed(1)
              ).slice(-15) +
              "MB " +
              " @" +
              (state.speed / 1024).toFixed(1) +
              "kB/s ";

            //console.log(status);
            downloads[fl] = status;
            //console.log('\x1B[2J');

            var dls = 0;
            for (var property in downloads) {
              //console.log(downloads[property] + "\t" + property+"\r");
              process.stdout.write(downloads[property] + "\t" + property);
              process.stdout.write("\r");
              dls++;
            }
            //console.log('\x1B['+dls+'A');
            //console.log(state);
          })
          .on("error", function(err) {
            console.error("ERROR!", err);
          })
          .pipe(
            fs.createWriteStream(fl, {
              flags: "a"
            })
          )
          .on("close", function(err) {});
      } else {
        try {
          var stats = fs.statSync(fl);
          fileSizeInBytes = stats.size;
          if (fileSizeInBytes < conlen) {
            console.log("\n\ndownload incomplete");
            //process.exit();
          }
        } catch (e) {
          console.log("\n\nerror while fs.statSync()", fl, e);
          //process.exit();
        }

        //console.log("\n\ndownload complete");
        //process.exit();
      }
    }
  );
}

function parseResponse(responseText, callback) {
  const $ = _cheerio.load(responseText);
  //console.log(responseText);

  var title = $("title").text();
  console.log(title);

  $("[id^=mediaplayer]")
    .first()
    .each(function(a) {
      try {
        var player_data = this.attribs.player_data;
        //console.log(player_data);
        var video = JSON.parse(player_data).video;

        var thumb = "https:" + video.thumb;
        var file = video.file;
        //console.log(thumb);
        //console.log(file);
        console.log(rot13(file));
        //downloadMovie("//ebd.cda.pl/620x368/18959547c");
      } catch (ex) {
        console.log("first method failed", ex);
      }
    });
}

export default {
  findVideos(uri, callback) {
    const params = _url.parse(uri);

    _dasu.req(params, function(err, res, body) {
      if (err) {
        callback(err);
      } else {
        parseResponse(body, callback);
      }
    });
  }
};
/*
var cda = new Crawler({
  encoding: null,
  maxConnections: 1,
  // This will be called for each crawled page
  callback: function(error, result, $) {
    try {
      if (result.uri.indexOf("?wers") == -1) {
        // first get the formats

        cookies = setCookie.parse(result);

        var formatArr = [];
        $("a.quality-btn").each(function() {
          formatArr.push($(this).html());
        });
        if (formatArr.length === 0) formatArr.push("unknown");
        console.log("formats:  " + formatArr.join(" "));

        // if format is passed into command line
        if (
          process.argv.length > 3 &&
          formatArr.indexOf(process.argv[3]) > -1
        ) {
          var fmt = process.argv[3];
          if ($("a.quality-btn:contains(" + fmt + ")").length) {
            $("a.quality-btn:contains(" + fmt + ")")
              .last()
              .each(function(a) {
                c.queue(this.attribs.href);
                return;
              });
          }
        } else {
          // if not get the best
          if ($("a.quality-btn").length) {
            $("a.quality-btn")
              .last()
              .each(function(a) {
                //console.log(this.attribs.href);
                c.queue(this.attribs.href);
                return;
              });
          } else {
            // get anything
            c.queue(result.uri + "?wers");
          }
        }
      } else {
        // then get the video
        title = $("title").text();
        console.log("title:    " + title);
        console.log("fetching: " + result.uri);
        // console.log(result.body);
        $("[id^=mediaplayer]")
          .first()
          .each(function(a) {
            var movieURL = "";
            try {
              var id = this.attribs.id;
              var ss =
                "document.getElementById\\(\\'" +
                this.attribs.id +
                "\\'\\).href = \\'";
              movieURL = findBetween(result.body, ss, "\\';");
              //downloadMovie(movieURL);
            } catch (ex) {
              console.log("first method failed");
            }

            try {
              if (movieURL === null || movieURL === "") {
                movieURL = JSON.parse(this.attribs.player_data).video.file;
                //downloadMovie(movieURL);
              }
            } catch (ex) {
              console.log("second method failed");
            }
          });
      }
    } catch (ex) {
      console.error(
        "unexpected error happend, see result.html and investigate the website"
      );
      fs.writeFileSync("result.html", result.body, { flags: "w+" });
      console.log(ex);
      //process.exit();
    }
  }
});
*/

/*
// start
if (process.argv.length<3)
{
	console.log("syntax: cdadl URL [format] [filename-prefix]");

	// process.argv[0] exe
	// process.argv[1] script
	// process.argv[2] url
	// process.argv[3] format
	// process.argv[4] prefix

	process.exit();
}

paramurl = process.argv[2];
if (process.argv.length>3) filenamePrefix = process.argv[process.argv.length-1] || "";

if (paramurl.substring(0, 4) != "http") {
    console.error("O gosh, there is no URL");
    var paramurl = readlineSync.question('Enter URL or video ID now:');
}

if (paramurl.length > 0) {
    var s = paramurl.split("/");
    paramurl = "http://ebd.cda.pl/666x666/" + s.pop();
    //console.log(paramurl);
    c.queue(paramurl);
} else {
    process.exit();
}
*/
