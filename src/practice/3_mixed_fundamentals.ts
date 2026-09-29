// Problem 1 — Inventory
type Product = {
    id: number;
    name: string;
    price: number;
    stock: number;
}

const products: Product[] = [
    {id: 1, name: "Laptop", price: 1000, stock: 5},
    {id: 2, name: "T-shirt", price: 20, stock: 10},
    {id: 3, name: "Pizza", price: 10, stock: 0},
    {id: 4, name: "Headphones", price: 50, stock: 3},
    {id: 5, name: "Jeans", price: 40, stock: 7},
    {id: 6, name: "Burger", price: 8, stock: 0},
]

function getInStockProducts(products:Product[]):Product[]{
    // if(products.length === 0 || !products){
    //     return products
    // }

    const product : Product[] =[]
    for (const stockProduct of products){
        if (stockProduct.stock > 0 ){
            product.push(stockProduct)
        }
    }
    return product
}

function getInventoryValue(products:Product[]):number{
    let sum:number = 0
    for ( const product of products){
        sum += (product.price * product.stock)
    }
    return sum
}

// Problem 2 — Login System
type Success ={
    userId : number;
    username : string;
}

type Failure = {
    message : string;
}

type LoginResult = Success | Failure;

function handleLogin(result:LoginResult):string{
    if ('userId' in result){
        return `user loged in successfull with ID: ${result.userId}`
    }
    return `Login failed: ${result.message}`;
}

const successFullLogin : LoginResult = {
    userId : 195,
    username : "Dev"
}

const FailLogin : LoginResult ={
    message : "Invalid password or Username"
}

// Problem 3 — Search Function

function search(items:string[],query?:string):string[]{
    if (query === undefined) {
        return items
    }

    let queryItems : string[] = []
    for (const item of items){
        if (item.includes(query)){
            queryItems.push(item)
        }
    }

    return queryItems
}

// Problem 4 — Tuple Function

type UserRecord = [id:number,name:string,isActive:boolean]

function formateUser(user:UserRecord):string{
    const [id, name, isActive] = user;
    return `${id}- ${name} - ${isActive}`;
}

const user:UserRecord = [101,"Dev",true]
const user2:UserRecord = [102,"Purva",false]

//Problem 5 — Mini Backend-style Problem
type SuccessResponse = {
    status: "success";
    data: {id: number; name: string};
}

type ErrorResponse = {
    status:"error";
    message: string; 
}

type ApiResponse = SuccessResponse | ErrorResponse ;

function handleResponse(response:ApiResponse):string{
    //discriminated unions
    if (response.status === "success"){
        return `the data is ${response.data}`
    }
    return `the error is ${response.message}`
}

const successResponse:ApiResponse = {
    status: "success",
    data: {id: 1, name: "Dev"}
}
const errorResponse:ApiResponse = {
    status: "error",
    message: "Invalid request"
}

