// declarations 
/** 
 * mostly get install with npm install some-lib 
 * but if it is not available then we can install it with npm install @types/some-lib
 * and still if it is not available then we can create our own declaration file with .d.ts extension and we can declare the module in it
 * example.. some-lib.d.ts
 * declare module "some-lib"{
 *      export function someFunction():void;
 * }
*/ 

/**
 * {
  "userId": 1,
  "id": 1,
  "title": "delectus aut autem",
  "completed": false
}
 */

import axios,{type AxiosResponse} from "axios";

interface Todo{
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}

// axios.get("https://jsonplaceholder.typicode.com/todos/1").then((response=>{
//     console.log(response.data)
// }))

const fetchData = async () =>{
    try{
        const response :AxiosResponse<Todo> = await axios.get("https://jsonplaceholder.typicode.com/todos/1");
        console.log("Todo", response.data);
    }catch(error:any){
        if(error.isAxiosError(error)){
            console.error("Axios error:", error.message);
            if (error.response) {
                console.error("Response data:", error.response.data);
                console.error("Response status:", error.response.status);
            }
        }
        console.error("Error fetching data:", error);
    }
}

fetchData();
