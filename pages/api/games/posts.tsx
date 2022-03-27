import axios from "axios";

export default axios.create({
    baseURL: "https://api.igdb.com/v4",
    headers:{
        'Accept': 'application/json',
		'Client-ID': '7x83kcnwo57vwmiyv8mf901oe5p9fq',
		'Authorization': 'Bearer kduk2s4usqlqzobcb8x415yp6iv6k5'
    }
})