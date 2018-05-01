import "file-loader?name=index.html!./index.html";
import GoTrue from "gotrue-js";

const auth = new GoTrue({
  APIUrl:
    "https://imorente-gotrue-examples.netlify.com/.netlify/functions/identity"
});
