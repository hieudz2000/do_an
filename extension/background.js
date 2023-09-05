// // var url = window.location.href;
// // console.log("hieudz");
// // async function checkLink(token) {
// //   console.log("url: ", url);
// //   console.log("token: ", token);
// //   const response = await fetch(
// //     "http://127.0.0.1:1234/check-link/?link=" + url,
// //     {
// //       method: "GET",
// //       headers: {
// //         "Content-Type": "application/json",
// //         Authorization: "Bearer " + token,
// //       },
// //       mode: "cors"
// //     }
// //   );
// //   const jsonData = await response.json();
// //   console.log("jsonData", jsonData);
// //   // var data = JSON.parse(jsonData);
// //   // console.log("dataaaaaaaaa", data)
// //   // if(data.check == "block"){
// //   //   document.body.innerHTML = a;
// //   // }
// //   // console.log("check", data.check);
// //   // console.log("jsonDatasss", data);
// // }

// // chrome.storage.local.get(["daAnToken"]).then((result) => {
// //   console.log("hieudz");
// //   checkLink(result.daAnToken);
// // });
// var a = `<!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta http-equiv="X-UA-Compatible" content="IE=edge">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>Block Link</title>
   
// </head>
// <body>
//     <div class="mars"></div>
// <img src="https://assets.codepen.io/1538474/404.svg" class="logo-404" />
// <img src="https://assets.codepen.io/1538474/meteor.svg" class="meteor" />
// <p class="title">Oh no!!</p>
// <p class="subtitle">
// 	You’re either misspelling the URL <br /> or requesting a page that's no longer here.
// </p>
// <div class="center">
// 	<a class="btn-back" href="#">Back to previous page</a>
// </div>
// <img src="https://assets.codepen.io/1538474/astronaut.svg" class="astronaut" />
// <img src="https://assets.codepen.io/1538474/spaceship.svg" class="spaceship" />
// </body>
// </html>
// `

// // document.body.innerHTML=a
// document.documentElement.innerHTML = a;

// // Add link to the CSS file
// const cssLink = document.createElement("link");
// cssLink.rel = "stylesheet";
// cssLink.href = chrome.runtime.getURL("/css/b.css");
// document.head.appendChild(cssLink);
// console.log("aaaaaaaaaaaaaaaa")


