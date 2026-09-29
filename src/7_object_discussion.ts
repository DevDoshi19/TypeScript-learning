const chai = {
    name: "Masala chai",
    price:20,
    hot:true
}

let tea :{
    name : string;
    price : number;
    ishot : boolean;
}

tea = {
    name : "Green tea",
    price : 15,
    ishot : false
}

// alias object 
type Tea = {
    name:string;
    price:number;
    ingredients : string[]
}

const adrakChai:Tea = {
    name:"Adrak chai",
    price:20,
    ingredients:["ginger","tea leaves"]
}

// duck typing 
type Cup = {size:string}
let smallCup : Cup ={size:"200ml"} 

let bigCup = {size:"500ml", material:"steel"}

smallCup = bigCup // there is no issue for this, as if bigcup have the property what a cup needed so minimum requirement is satisfied 

// issue in TS is structure typing vs duck typing 
type Brew = {brewTime:number}
const coffee = {brewTime:5,beans:"Arabica"}

const chaiBrew:Brew = coffee 

// splitout the datatype : 
type Item = {name:string,quantity:number}
type Address = {street:string,pin:number}

type order ={
    id:string;
    item:Item[];
    address:Address
}



type Chai ={
    name : string;
    price : number;
    ishot : boolean;
}

// can me pass option datatype, also the issue is we can pass empty object 
const updateChai = (updates:Partial<Chai>) =>{
    console.log("updating chai with",updates);
}

updateChai({price:25})
updateChai({ishot:false})
updateChai({})

type ChaiOrder = {
    name?:string;
    quantity?: number;
}

// require even if you have created a object which don't needed every property, but when you use require we need to pass every property that has been in the object. even it is not require, so by using the require we are force to pass all the property.
const placeOrder = (orders:Required<ChaiOrder>) =>{
    console.log(orders);
}

placeOrder({
    name:"masala chai",
    quantity:34
})

// picking data pricisely from the object, we can use pick to select the property which we want to use from the object.
type Chaii = {
    name:string;
    price:number;
    isHot:boolean;
    ingredients:string[]
}

type basicChaiInfo = Pick<Chai,"name"|"price"> 
const chaiInfo : basicChaiInfo = {
    name:"green tea",
    price:15,
    // isHot:true, will give you error because we are only picking name and price property from chai object
}

// omit use when we want to remove some property from the object, so we can use omit to remove the property which we don't want to use from the object.
type ChaiNew = {
    name:string;
    price:number;
    isHot:boolean;
    secretIngredients:string[]
}

type publicChaiInfo = Omit<ChaiNew,"secretIngredients"> // we are omitting the secretIngredients property from chai object

/**
 * - object can be define using type or interface 
 * - TypeScript follows structural typing, which means that two objects are considered to be of the same type if they have the same shape, regardless of their names or declarations.
 * 
 * - Break complex data in structure reusable data types 
 * 
 * # utility types:
 * - Partial<Type> : makes all properties in Type optional
 * - Required<Type> : makes all properties in Type required
 * - Readonly<Type> : makes all properties in Type readonly
 * - Pick<Type, Keys> : creates a new type by picking a set of properties Keys from Type
 * - Omit<Type, Keys> : creates a new type by omitting a set of properties Keys from Type
 * 
 */