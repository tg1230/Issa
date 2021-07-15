import axios from "axios";

//Example import 
//import { getAll } from "../Support/requests.js";

//Example Call
// getAll("http://localhost:3005/getall",
// function (data) {
//   console.log("This is succcess the callback");
//   setpost(data[0])
// },
// function () {
//   console.log("This is the error callback");
// }
// );

//Replace getRandomPost Function in RandomPost with this
export const getAll = function (url, callback, errcallback) {
  axios.get(url).then((response) => {
      if(callback != null && response.status === 200)
      {
          callback(response.data)
      }
  }).catch(err => {
      console.log(err)
      errcallback(err)
  })
};
