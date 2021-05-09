var http = require("http");
var url = require('url');
var fs = require('fs');
var ip = require("ip");
const request = require('request');
port = 8000
    //dir 綠色
console.dir(ip.address() + ":" + port);

//ip localtion by  pconfig

function doRequest(url) {
    return new Promise(function(resolve, reject) {
        let option = {
            "url": url,
            headers: {
                "X-Requested-With": "XMLHttpRequest",
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:24.0) Gecko/20100101 Firefox/24.0'
                    // 'Content-Type': 'application/x-www-form-urlencoded'
            }

        }
        request(option, function(error, res, body) {
            if (!error && res.statusCode == 200) {
                resolve(body);
            } else {
                reject(error);
            }
        });
    });
}

var hostnme = ip.address()

var server = http.createServer(async function(request, response) {
    // console.log('Connection');
    var path = url.parse(request.url).pathname;

    switch (path) {
        case '/':
            response.write("cors sever working")
            response.end()
            return

        default:
            let acc_url = path.slice(1, path.length)
            console.log(acc_url);
            if (acc_url != "favicon.ico") {
                let res = await doRequest(acc_url)
                response.write(res)
                    // response.write("test")

                response.end();
            } else {
                response.write("error")
                response.end()
            }

            break;



            // Make a request for a user with a given ID
            // axios.get(acc_url)
            //     .then(function(res) {
            //         // handle success
            //         console.log("a")
            //             // console.log(res.status);
            //             // console.log(res);
            //             // console.log(res)

            //         console.log(typeof res.data);
            //         response.write(JSON.stringify(res.data))
            //             // response.write(res.data)

            //         response.end()
            //             // break;


            //     })
            //     .catch(function(error) {
            //         // handle error
            //         // console.log(error);
            //         // console.log(error)
            //         // response.write(JSON.stringify(res.data))
            //         response.write("error")
            //         response.end()
            //         break;


            //     })



    }
});

server.listen(port, hostnme, () => console.log("working"));