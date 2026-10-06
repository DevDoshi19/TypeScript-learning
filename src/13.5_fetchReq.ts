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
        const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
        if(!response.ok){
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data:Todo = await response.json();
        console.log("Todo", data);
        
    }catch(error:any){
        
        console.error("Error fetching data:", error);
    }
}

fetchData();
