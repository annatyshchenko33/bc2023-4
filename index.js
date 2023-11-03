const http = require('http');
const fs = require('fs');
const { XMLParser, XMLBuilder } = require('fast-xml-parser');

const port = 8000;
const server = http.createServer((req, res) => {
    const xmlData = fs.readFileSync('data.xml');
    const parser = new XMLParser();
    const jsonData = parser.parse(xmlData);
    const currencies = jsonData.exchange.currency;
    const newXMLData = {
        data: {
            exchange: currencies.map((currency) => ({
                date: currency.exchangedate,
                rate: currency.rate,
            })),
        },
    };

    const builder = new XMLBuilder({});
    const xmlres = builder.build(newXMLData);

    res.setHeader('Content-Type', 'text/xml');
    res.end(xmlres);
});

server.listen(port, () => {
    console.log(`Сервер:http://localhost:8000`);
});