const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

axios.get('https://news.detik.com/indeks')
.then(function (response) {
    if (response.status === 200) {
        const html = response.data;
        const $ = cheerio.load(html);
        let webList = [];
        $ ('DI ISI SENDIRI').each(function(i, elem) {
            webList[i] = {
                judul: $(this).find('DI ISI SENDIRI').text().trim,
                url: $(this).find('DI ISI SENDIRI').attr('DI ISI SENDIRI')
            }
        });
        const webListTrim = webList.filter(n => n != undefined)
        fs.writeFile('data/weblist.json',
            JSON.stringify(webListTrim, null, 10), (err) => {
            console.log('Scraping has been Successfully')
        });
    }
}), (err) => console.log(err);