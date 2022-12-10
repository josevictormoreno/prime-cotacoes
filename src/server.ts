import express from 'express'
import puppeteer from "puppeteer";

const server = express()

server.get('/dolar', async  (request, response) => {
    console.log("Pesquisando o valor do dolar!");

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.google.com/search?q=dolar&sxsrf=ALiCzsbHDZsdh2ptO0x3uh8iEQHuT6wqkg%3A1667865643031&ei=K5xpY4a1AYDN1sQPvdeuuAk&ved=0ahUKEwjG9r3Zo537AhWAppUCHb2rC5cQ4dUDCA8&uact=5&oq=dolar&gs_lcp=Cgxnd3Mtd2l6LXNlcnAQAzIJCCMQJxBGEIICMgQIIxAnMgoIABCxAxCDARBDMgsIABCABBCxAxCDATILCAAQgAQQsQMQgwEyCwgAEIAEELEDEIMBMgoIABCxAxCDARBDMgoILhDHARDRAxBDMgQIABBDMgsIABCABBCxAxCDAToKCAAQRxDWBBCwAzoHCAAQsAMQQzoNCAAQ5AIQ1gQQsAMYAToMCC4QyAMQsAMQQxgCOggILhCxAxCDAToOCC4QgAQQsQMQgwEQ1AI6CwguEIAEEMcBENEDOgsILhCxAxCDARDUAjoGCCMQJxATOgQILhBDOg0IABCABBCxAxCDARAKSgQITRgBSgQIQRgASgQIRhgBUJ4KWNYNYPQOaAFwAXgAgAG3AYgB7AWSAQMwLjWYAQCgAQHIARLAAQHaAQYIARABGAnaAQYIAhABGAg&sclient=gws-wiz-serp');
//    await page.screenshot({path: 'tabela.png'}); Comando para tirar print da tela!

    const content = await page.evaluate(() => {


            value: document.querySelector(".SwHCTb").innerHTML

    });
//    await browser.close();
    if(content)
        response.send(content.value);
})
server.listen(3000, () => {
    console.log('Serer up on port 3000!')
})

