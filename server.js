// Tiny static server (no dependencies): `npm run build` then `node server.js`
import http from "http"; import fs from "fs"; import path from "path";
const types = { ".html":"text/html", ".js":"text/javascript", ".css":"text/css", ".svg":"image/svg+xml" };
http.createServer((req, res) => {
  let f = path.join("dist", req.url === "/" ? "index.html" : req.url.split("?")[0]);
  if (!fs.existsSync(f)) f = path.join("dist", "index.html");
  res.writeHead(200, { "Content-Type": types[path.extname(f)] || "text/plain" });
  fs.createReadStream(f).pipe(res);
}).listen(process.env.PORT || 3000, () => console.log("Running on http://localhost:3000"));
