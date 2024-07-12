
const baseUrl = "https://api.bechofy.in/tryst-api/";
// const baseUrl = "https://localhost:8000/"

const updateData = {
   postRequest(userdata,url){
       return fetch(baseUrl + url,{
        method: "POST",
        body: JSON.stringify( userdata),
         headers: {
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*",
            "Content-Type": "application/json",
            // "x-auth-token": JSON.parse(localStorage.getItem("access")),
            // "schema": schema
        },
    }).then((response)=>{
        // console.log(response.json())
        return response;
    }).catch((error)=>{
        console.log(error);
    })
    }
}
export default updateData