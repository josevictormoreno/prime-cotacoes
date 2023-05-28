import {NextFunction, Request, Response} from 'express'
import puppeteer from 'puppeteer'

// const getCoins = async (req: Request, res: Response, next: NextFunction, page: any) => {
//   await page.goto('https://br.investing.com/currencies/exchange-rates-table')
//   const result = await page.evaluate(() => {
//     const rows = document.querySelectorAll('.genTbl tr');
//     return Array.from(rows, row => {
//       const columns = row.querySelectorAll('td');
//       return Array.from(columns, column => column.innerText);
//     });
//   });
//   // res.status(200).json({"cafe arabica": result})
//   return result
// }
const getCoffeTv = async (req: Request, res: Response, next: NextFunction) => {
    const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.google.com/search?client=opera-gx&q=dolar&sourceid=opera&ie=UTF-8&oe=UTF-8')
  const result = await page.evaluate(() => {
    const dolar = document.querySelector('.DFlfde SwHCTb');
    res.status(200).json({dolar: dolar})
  });
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
// const getInfo = async (req: Request, res: Response, next: NextFunction) => {
//   const date = getDate(req,res,next)
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   // const coins = await getCoins(req, res, next, page)
//   const cooabriel = await getCoffeCooabriel(req, res, next, page)
//   const tv = await getCoffeTv(req, res, next, page)
//   const message = cooabriel
//   res.status(200).json({message: message})
// }

export default { getCoffeTv}