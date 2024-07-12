
// const baseUrl = "https://api.bechofy.in/demostorebechofy-api/";
const baseUrl = "https://api.bechofy.in/tryst-api/";
// const baseUrl = "http://localhost:8000/"

const fetchData = {
    getRequest(url){
        return fetch(baseUrl + url,{
            method: "GET",
            headers: {
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*",
                "Content-Type": "application/json",
                // "x-auth-token": JSON.parse(localStorage.getItem("access")),
                // "schema": schema
            }
        }).then((response)=>{
            return response;
        }).catch((error)=>{
            console.log(error);
        })
    }
}
export default fetchData;