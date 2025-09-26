import axios from "axios";

axios.get("https://api.coingecko.com/api/v3/ping")
    .then(res => console.log(res.data))
    .catch(err => console.error(err));
