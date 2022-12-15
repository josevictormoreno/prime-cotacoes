import {NextFunction, Request, Response} from 'express'
import puppeteer from 'puppeteer'

const getDollar = async (req: Request, res: Response, next: NextFunction, page: any) => {
  await page.goto('https://www.google.com/search?q=dolar&sxsrf=ALiCzsbHDZsdh2ptO0x3uh8iEQHuT6wqkg%3A1667865643031&ei=K5xpY4a1AYDN1sQPvdeuuAk&ved=0ahUKEwjG9r3Zo537AhWAppUCHb2rC5cQ4dUDCA8&uact=5&oq=dolar&gs_lcp=Cgxnd3Mtd2l6LXNlcnAQAzIJCCMQJxBGEIICMgQIIxAnMgoIABCxAxCDARBDMgsIABCABBCxAxCDATILCAAQgAQQsQMQgwEyCwgAEIAEELEDEIMBMgoIABCxAxCDARBDMgoILhDHARDRAxBDMgQIABBDMgsIABCABBCxAxCDAToKCAAQRxDWBBCwAzoHCAAQsAMQQzoNCAAQ5AIQ1gQQsAMYAToMCC4QyAMQsAMQQxgCOggILhCxAxCDAToOCC4QgAQQsQMQgwEQ1AI6CwguEIAEEMcBENEDOgsILhCxAxCDARDUAjoGCCMQJxATOgQILhBDOg0IABCABBCxAxCDARAKSgQITRgBSgQIQRgASgQIRhgBUJ4KWNYNYPQOaAFwAXgAgAG3AYgB7AWSAQMwLjWYAQCgAQHIARLAAQHaAQYIARABGAnaAQYIAhABGAg&sclient=gws-wiz-serp');
  const content = await page.evaluate(() => {
    return {
      //@ts-ignore
      value: document.querySelector(".SwHCTb").innerHTML
    }
  });
  return content.value
}
const getEuro = async (req: Request, res: Response, next: NextFunction, page: any) => {
  await page.goto('https://www.google.com/search?q=euro&oq=euro&aqs=chrome.0.69i59.779j0j1&sourceid=chrome&ie=UTF-8');
  const content = await page.evaluate(() => {
    return {
      //@ts-ignore
      value: document.querySelector(".SwHCTb").innerHTML
    }
  });
  return content.value
}
const getLibra = async (req: Request, res: Response, next: NextFunction, page: any) => {
  await page.goto('https://www.google.com/search?q=libra+moeda&sxsrf=ALiCzsa1dRwo1Egy1S3ob5kzlIXiLXY0gw%3A1670682996797&ei=dJmUY9SZMP7P1sQPgaWu0A0&oq=libra&gs_lcp=Cgxnd3Mtd2l6LXNlcnAQARgAMgcIIxCwAxAnMgoIABBHENYEELADMgoIABBHENYEELADMgoIABBHENYEELADMgoIABBHENYEELADMgoIABBHENYEELADMgoIABBHENYEELADMgoIABBHENYEELADMgcIABCwAxBDMgcIABCwAxBDMgcIABCwAxBDMgcIABCwAxBDMg0IABDkAhDWBBCwAxgBMg0IABDkAhDWBBCwAxgBMg0IABDkAhDWBBCwAxgBMhIILhDHARDRAxDIAxCwAxBDGAIyDwguENQCEMgDELADEEMYAkoECEEYAEoECEYYAVAAWABgiwhoAXABeACAAQCIAQCSAQCYAQDIARHAAQHaAQYIARABGAnaAQYIAhABGAg&sclient=gws-wiz-serp');
  const content = await page.evaluate(() => {
    return {
      //@ts-ignore
      value: document.querySelector(".SwHCTb").innerHTML
    }
  });
  return content.value
}
const getCoffeTv = async (req: Request, res: Response, next: NextFunction, page: any) => {
  await page.goto('http://www.cccv.org.br/')
  const result = await page.evaluate(() => {
    const rows = document.querySelectorAll('.table-body li');
    return Array.from(rows, row => {
      const columns = row.querySelectorAll('p');
      return Array.from(columns, column => column.innerText);
    });
  });
  // res.status(200).json({"cafe arabica": result})
  return result[5][0]
}
const getCoffeCooabriel = async (req: Request, res: Response, next: NextFunction, page: any) => {
  await page.goto('https://cooabriel.coop.br/en/')
  const result = await page.evaluate(() => {
    const rows = document.querySelectorAll('.tbCoffee tr');
    return Array.from(rows, row => {
      const columns = row.querySelectorAll('td');
      return Array.from(columns, column => column.innerText);
    });
  });
  //res.status(200).json({"cafe arabica": result})
  return result[1][1]
}
const getDate = (req: Request, res: Response, next: NextFunction) => {
  let day = new Date().getDate().toLocaleString()
  let month = (new Date().getMonth() + 1).toString()
  let year = new Date().getFullYear().toString()
  let date = '' 
  return date = date.concat(day, '/', month, '/', year)
}
const getInfo = async (req: Request, res: Response, next: NextFunction) => {
  const date = getDate(req,res,next)
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const dollar = await getDollar(req, res, next, page)
  const euro = await getEuro(req, res, next, page)
  const libra = await getLibra(req, res, next, page)
  const cooabriel = await getCoffeCooabriel(req, res, next, page)
  const tv = await getCoffeTv(req, res, next, page)
  const message = 
  `🌱Prime Corretora de Café🌱 Linhares
  📈 * Cotações ${date} * 📉
  Dolar 🇺🇸 ${dollar}
  Libra 🏴󠁧󠁢󠁥󠁮󠁧󠁿 ${libra}
  Euro 🇪🇺 ${euro}

  📺 *TV CCCV* 📺 
  ${tv}
  `
  res.status(200).json({message: message})
}

export default {getInfo, getDate}