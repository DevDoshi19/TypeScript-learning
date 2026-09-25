function getChai(kind:string|number):string | number {
    if (typeof kind === "string"){
        return  `Making ${kind} car` ; // here we can find all the methods of string because we have narrowed down the type of kind variable to string
    }
    return `chai order ${kind}` ; // get the methods of number because we have narrowed down the type of kind variable to number
}
// what make it s it more readable is that we are using type narrowing to check the type of kind variable and based on that we are returning the value of kind variable

// Example of type narrowing using the unknown type
function serveChai(msg?:string):string{

    if (msg){
        return `Serving ${msg}` ; 
    }
    return `Serving chai` ; 
}

// Exhaustive checks 
function orderChai(size:"small"|"medium"|"large"|number){
    if (size === "small"){
        return "Small cutting chai.."
    }
    if (size==="medium" || size=="large"){
        return "make extra chai..."
    }
    return `chai order #${size}`
}

class kulhadChai{
    serve(){
        return 'serving kulhad chai'
    }
}
class cutting{
    serve(){
        return 'serving cutting chai'
    }
}

// creat a safety check to make sure that the chai is either kulhadChai or cutting chai
function serveChaiOrder(chai:kulhadChai|cutting){
    if (chai instanceof kulhadChai){
        return chai.serve() ; // here we can find all the methods of kulhadChai because we have narrowed down the type of chai variable to kulhadChai
    }
    if (chai instanceof cutting){
        return chai.serve() ; // here we can find all the methods of cutting because we have narrowed down the type of chai variable to cutting
    }
}

// custom type guard using type predicate

type ChaiOrder = {
    type:string,
    sugar:number,
}

function isChaiOrder(obj:unknown):obj is ChaiOrder{
    return(
        typeof obj === "object" && 
        obj !== null && 
        "type" in obj && 
        "sugar" in obj && 
        typeof obj.sugar ==="number" 
        && typeof obj.type ==="string"
    )
}

function serveChaiOrder1(item:ChaiOrder|string){
    if(isChaiOrder(item)){
        return `Serving ${item.type} chai with ${item.sugar} sugar` ; // here we can find all the methods of ChaiOrder because we have narrowed down the type of item variable to ChaiOrder
    }
    return `Serving ${item} chai` ; // here we can find all the methods of string because we have narrowed down the type of item variable to string
}

type MasalaChai = {
    type:"masala",
    spicelevel:number,
}
type GingerChai = {
    type:"ginger",
    amount:number,
}
type ElaichiChai = {
    type:"elaichi",
    amount:number,
}

type Chai = MasalaChai | GingerChai | ElaichiChai ;

function MakeChai(order:Chai){
    switch(order.type){
        case "masala":
            return `Making masala chai with spice level ${order.spicelevel}` ;
        case "ginger":
            return `Making ginger chai with amount ${order.amount}` ;
        case "elaichi":
            return `Making elaichi chai with amount ${order.amount}` ;
    }   
}

function isStringArray(value: unknown): value is string[] {
    return Array.isArray(value) && value.every(item => typeof item === 'string');
}
