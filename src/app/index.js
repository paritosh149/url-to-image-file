const CONTENT_TYPE_TEXT_HTML = 'text/html'
class UrlToChartImage {
    constructor() {

    }

    fetch = (url) => {
        const axios = require("axios");
        const getData = async url => {
        try {
            const response = await axios.get(url);
            const contentType = response.headers['content-type'].toLowerCase()
            if(!contentType.startsWith(CONTENT_TYPE_TEXT_HTML)) {
                throw 'Response is not HTML. Cannot convert'
            }
            const data = response.data;
            console.log(data);
        } catch (error) {
            console.log(error);
        }
        };

        getData(url);
    }
}

module.exports = UrlToChartImage
