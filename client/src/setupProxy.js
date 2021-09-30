const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(
    "/invoices/",
    createProxyMiddleware({
      target: "https://api.razorpay.com/v1/",
      changeOrigin: true
    })
  );
  app.use(
    "/payments/",
    createProxyMiddleware({
      target: "https://api.razorpay.com/v1/",
      changeOrigin: true
    })
  );
};
