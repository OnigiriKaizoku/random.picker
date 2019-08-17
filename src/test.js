let axios = require("axios")

axios.post('https://api.random.org/json-rpc/2/invoke', JSON.stringify({
    jsonrpc: '2.0',
    method: 'generateIntegers',
    params: {
      apiKey: "2a2d5c0b-ff8e-4b8c-b4b7-27f1e5a12132",
      n: 1,
      min: 1,
      max: 10,
      replacement: false
    },
    id: 228322
}), 
{    
    headers: {
        'Content-type': 'application/json'
    }
}).then(res => {
    console.log(res.data)
  }).catch(e => {
    console.log(e)
  })