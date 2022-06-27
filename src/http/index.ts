import axios from 'axios'
interface Config{
	headers:{axios:boolean}
}

const http=axios.create({
	baseURL:'./api'

})


http.interceptors.request.use(
    config=>{

(config as Config).headers.axios=true;
  return config;
    }

	)

const normal=()=>{return http({
	url:'/ug/api/wuhan/app/data/list-total'
})}  

export {normal}