import type { NextApiRequest, NextApiResponse } from "next";
import httpProxy from "http-proxy";

// type Data = {
// 	name: string
// }

export const config = {
  api: {
    bodyParser: false,
  },
};

const proxy = httpProxy.createProxyServer();

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  return new Promise((resolve) => {
    // console.log('req', req)
    // convert cookies to header Authorization
    // const cookies = new Cookies(req, res);
    // const accessToken = cookies.get('access_token')
    // const accessToken =
    // 	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImR1b25naGI1M0BnbWFpbC5jb20iLCJ1c2VyX2lkIjoxLCJpYXQiOjE2ODc0NDI5MjQsImV4cCI6MTY4ODA0NzcyNH0.mJRijgcdUjToKK003FAWChihQ-CLVFs96adce0F_Z84";
    // if (accessToken) {
    // 	req.headers.Authorization = `Bearer ${accessToken}`;
    // }
    // req.headers.cookie = "";
    // console.log(
    // 	"process.env.NEXT_PUBLIC_API_URL",
    // 	process.env.NEXT_PUBLIC_API_URL
    // );
    proxy.web(req, res, {
      // target: process.env.NEXT_PUBLIC_API_URL,
      target: "http://127.0.0.1:5000/",
      changeOrigin: true,
      selfHandleResponse: false,
    });

    proxy.once("proxyRes", () => {
      resolve(true);
    });
  });
}
