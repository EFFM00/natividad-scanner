import { chromium } from 'playwright'
import notifier from 'node-notifier'
import cron from 'node-cron'
import fetch from 'isomorphic-unfetch'

const BOT_KEY = process.env.BOT_KEY || ""
const PAGE = 'https://www.natividad.org.ar/turnos_enfermos.php'

async function main() {
  const browser = await chromium.launch()

  cron.schedule("* * * * *", async () => {
    console.log(`Running on: ${new Date().toLocaleString('es-AR', { timeZone: 'America/Buenos_Aires' })}`)

    const page = await browser.newPage()
    await page.goto(PAGE)
    
    const centerElement = await page.$('center');

    if (centerElement) {

      const textSearch = "En este momento la parroquia no cuenta con cupos para enfermos."

      const texto = await centerElement.innerText();

      if(!texto.includes(textSearch)) {
        console.log(texto);
        console.log("-------");

      }else {
        fetch(`https://api.telegram.org/bot${BOT_KEY}/sendMessage?chat_id=1966252256,&text=${encodeURIComponent(`Hay turno: ${PAGE}`)}`)

        notifier.notify({
          title: 'HAY TURNO',
          message: `Al parecer hay turno, goo!!`
        })

        console.log("Hay turno");
        
        
      }


    } else {
      console.log("No se pudo conectar");
      
    }
    
    await page.close()
  })
}

main()

