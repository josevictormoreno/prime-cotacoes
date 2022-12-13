import {NextFunction, Request, Response} from 'express'
import puppeteer from "puppeteer";

const getDollar = async (req: Request, res: Response, next: NextFunction) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.google.com/search?q=dolar&sxsrf=ALiCzsbHDZsdh2ptO0x3uh8iEQHuT6wqkg%3A1667865643031&ei=K5xpY4a1AYDN1sQPvdeuuAk&ved=0ahUKEwjG9r3Zo537AhWAppUCHb2rC5cQ4dUDCA8&uact=5&oq=dolar&gs_lcp=Cgxnd3Mtd2l6LXNlcnAQAzIJCCMQJxBGEIICMgQIIxAnMgoIABCxAxCDARBDMgsIABCABBCxAxCDATILCAAQgAQQsQMQgwEyCwgAEIAEELEDEIMBMgoIABCxAxCDARBDMgoILhDHARDRAxBDMgQIABBDMgsIABCABBCxAxCDAToKCAAQRxDWBBCwAzoHCAAQsAMQQzoNCAAQ5AIQ1gQQsAMYAToMCC4QyAMQsAMQQxgCOggILhCxAxCDAToOCC4QgAQQsQMQgwEQ1AI6CwguEIAEEMcBENEDOgsILhCxAxCDARDUAjoGCCMQJxATOgQILhBDOg0IABCABBCxAxCDARAKSgQITRgBSgQIQRgASgQIRhgBUJ4KWNYNYPQOaAFwAXgAgAG3AYgB7AWSAQMwLjWYAQCgAQHIARLAAQHaAQYIARABGAnaAQYIAhABGAg&sclient=gws-wiz-serp');
  const content = await page.evaluate(() => {
    return {
      //@ts-ignore
      value: document.querySelector(".SwHCTb").innerHTML
    }
  });
  return content.value
}
const getEuro = async (req: Request, res: Response, next: NextFunction) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.google.com/search?q=euro&oq=euro&aqs=chrome.0.69i59.779j0j1&sourceid=chrome&ie=UTF-8');
  const content = await page.evaluate(() => {
    return {
      //@ts-ignore
      value: document.querySelector(".SwHCTb").innerHTML
    }
  });
  return content.value
}
const getLibra = async (req: Request, res: Response, next: NextFunction) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.google.com/search?q=libra+moeda&sxsrf=ALiCzsa1dRwo1Egy1S3ob5kzlIXiLXY0gw%3A1670682996797&ei=dJmUY9SZMP7P1sQPgaWu0A0&oq=libra&gs_lcp=Cgxnd3Mtd2l6LXNlcnAQARgAMgcIIxCwAxAnMgoIABBHENYEELADMgoIABBHENYEELADMgoIABBHENYEELADMgoIABBHENYEELADMgoIABBHENYEELADMgoIABBHENYEELADMgoIABBHENYEELADMgcIABCwAxBDMgcIABCwAxBDMgcIABCwAxBDMgcIABCwAxBDMg0IABDkAhDWBBCwAxgBMg0IABDkAhDWBBCwAxgBMg0IABDkAhDWBBCwAxgBMhIILhDHARDRAxDIAxCwAxBDGAIyDwguENQCEMgDELADEEMYAkoECEEYAEoECEYYAVAAWABgiwhoAXABeACAAQCIAQCSAQCYAQDIARHAAQHaAQYIARABGAnaAQYIAhABGAg&sclient=gws-wiz-serp');
  const content = await page.evaluate(() => {
    return {
      //@ts-ignore
      value: document.querySelector(".SwHCTb").innerHTML
    }
  });
  return content.value
}
const getCoffe = async (req: Request, res: Response, next: NextFunction) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://www.cccv.org.br/')
  const result = await page.evaluate(() => {
    const rows = document.querySelectorAll('.table-body li');
    return Array.from(rows, row => {
      const columns = row.querySelectorAll('p');
      return Array.from(columns, column => column.innerText);
    });
  });
  // res.status(200).json({"cafe arabica": result})
  res.status(200).json({Fonte: "Tv CCCV","cafe arabica dura": result[3][0], "cafe arabica rio": result[5][0], "cafe conilon": result[9][0]})
}
const getCoin = async (req: Request, res: Response, next: NextFunction) => {
  const dollar = await getDollar(req, res, next)
  const euro = await getEuro(req, res, next)
  const libra = await getLibra(req, res, next)
  res.status(200).json({"dolar": dollar, "libra": libra, "euro": euro})
}

export default {getCoin, getCoffe}