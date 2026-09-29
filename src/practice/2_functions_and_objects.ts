// 1. User ID Formatter
function formatUserId(id:string|number):string{
    if (typeof id ==="string"){
        return id.toUpperCase();
    }
    return "USER-"+id ;
}

formatUserId("dev123");
formatUserId(123);


// 2. Chai Order Calculator
type ChaiOrder = {
    type:"masala" | "ginger" | "green";
    cups: number;
}

function calculateChaiPrice(order:ChaiOrder):number {
    switch (order.type) {
        case "masala":
            return 10 * order.cups;

        case "ginger":
            return 15 * order.cups;

        case "green":
            return 20 * order.cups;
    }
}

const order : ChaiOrder = {type:"ginger",cups:3}
calculateChaiPrice(order)

// 3. Find Users 
type User = {
    id:number;
    name:string;
    age:number;
}

function findUserById(users:User[],id:number):User | undefined{
    for (const user of users){
        if (user.id === id){
            return user
        }
    }
    
    return undefined
}
const users:User[] =[]
users.push({id:1,name:"Dev",age:21})
users.push({id:2,name:"Arati",age:22})
users.push({id:3,name:"Purva",age:20})
users.push({id:4,name:"Ansh",age:21})

findUserById(users,3)

// 4. User Greeting- optional parameter 
function greetUser(name:string,age?:number):string {
    if (age !== undefined){
        return `Hello ${name}, you are ${age} years old.`
    }
    return `Hello ${name}`
}

greetUser("Dev",21)
greetUser("Dev")


// 5. Payment System 
type Payment = {
    method:"card";
    cardNumber:string;
} |{
    method:"upi";
    upiId:string;
} |{
    method:"cash";
    amountReceived:number;
};
//|{
//     method:"crypto";
//     walletAddress:string;
// }; // adding this will give error in switch case as crypto is not handled in switch case

function assertNever(value: never): never {
    throw new Error(`Unexpected payment method: ${value}`);
}

function processPayment(payment:Payment):string{
     switch (payment.method) {
        case "card":
            return `Payment processed using card ending in ${payment.cardNumber}`;
        case "upi":
            return `Payment processed using UPI ID: ${payment.upiId}`;
        case "cash":
            return `Payment processed using cash. Amount: ${payment.amountReceived}`;
        default:
            return assertNever(payment);
        }
}

// bouns Challenge 
type Product = {
    id:number;
    name:string;
    price:number;
    category:"electronics" | "clothing" | "food";
}

const products:Product[] = [
    {id:1,name:"Laptop",price:1000,category:"electronics"},
    {id:2,name:"T-shirt",price:20,category:"clothing"},
    {id:3,name:"Pizza",price:10,category:"food"},
    {id:4,name:"Headphones",price:50,category:"electronics"},
    {id:5,name:"Jeans",price:40,category:"clothing"},
    {id:6,name:"Burger",price:8,category:"food"},
]

function getProductsByCategory(products:Product[],category:Product["category"]):Product[]{
    // return products.filter(product => product.category === category);
    const filteredProducts:Product[] = []
    for (const product of products){
        if (product.category === category){
            filteredProducts.push(product)
        }
    }
    return filteredProducts;
}

getProductsByCategory(products,"electronics")