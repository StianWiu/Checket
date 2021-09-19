var CloudmersiveVirusApiClient = require('cloudmersive-virus-api-client');
var defaultClient = CloudmersiveVirusApiClient.ApiClient.instance;
const http = require('http'); // or 'https' for https:// URLs
const https = require('https'); // or 'https' for https:// URLs
const fs = require('fs');
// Configure API key authorization: Apikey
var Apikey = defaultClient.authentications['Apikey'];
Apikey.apiKey = '';



var apiInstance = new CloudmersiveVirusApiClient.ScanApi();

const inputURL = "http://i3.ytimg.com/vi/J---aiyznGQ/mqdefault.jpg"
const lastSegment = inputURL.split(".").pop();
const fileName = Math.floor(Math.random() * 99999999999999999999999);
if (lastSegment) {
    const file = fs.createWriteStream("./files/" + fileName + "." + lastSegment);
    const request = http.get(inputURL, function (response) {
        response.pipe(file);
    });
}
const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))
const stuff = async () => {
    await sleep(2000)
    end(Buffer.from(fs.readFileSync("./files/" + fileName + "." + lastSegment).buffer)) // File | Input file to perform the operation on.
}
const end = async (inputFile) => {
    var callback = function(error, data, response) {
        if (error) {
            console.error(error);
        } else {
            console.log('API called successfully. Returned data: ' + data);
        }
    };
    
    console.log(inputFile)
    apiInstance.scanFile(inputFile, callback);
}

stuff()