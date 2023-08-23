const BASE_URL = 'http://localhost:3500';
class ApiRequest{
    constructor(){
        this.base_url = BASE_URL;
    }
    check=()=>{
        return window.navigator.onLine;
    }
    get=(url)=>{
        return new Promise((resolve, reject) => {
            fetch(`${this.base_url}/${url}`,{
                method:'GET',
                headers:{
                    "content-type":"application/json"
                }
            })
            .then(res=>{
                if(res.status >= 200 && res.status <=299)
                    return res.json();
                else return{err:res}
            }).then(data=>{
                if(data.err)
                    reject(data);            
                else
                resolve(data);
            }).catch(err=>reject(err))
        })
    }
    post=({url,body})=>{
        return new Promise((resolve, reject) => {
            fetch(`${this.base_url}/${url}`,{
                method:'POST',
                headers:{
                    "content-type":"application/json"
                },
                body:body
            })
            .then(res=>{
                if(res.status >= 200 && res.status <=299)
                return res.json();
            else return{err:res}
            }).then(data=>{
                if(data.err)
                    reject(data);            
                else
                resolve(data);
            }).catch(err=>reject(err))
        })
    }


}
const Api = new ApiRequest();
export default Api;