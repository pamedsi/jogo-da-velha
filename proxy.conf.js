module.exports = {
  "/server/**": {
    "target": process.env.SERVER_URL,
    "secure": true,
    "pathRewrite": { "^/server": "" },
    "changeOrigin": true
  }
}
