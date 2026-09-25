// repeat the order of chai 
type ChaiOrder ={
    type:string;
    sugar:number;
    strong:boolean
}

function makeChai(order:ChaiOrder){
    console.log(order)
}

function serveChai(order:ChaiOrder){
    console.log(order)
}

// A class can only implement an object type or intersection of object types with statically known members.

interface TeaRecipe {
    water:number;
    milk:number;
}

class Makechai implements TeaRecipe{
    water =100
    milk = 50
}

// type cupSize = 'small' | 'medium' | 'large'

// error -> because we are trying to implement a union type which is not allowed in typescript 

// class chai implements cupSize{
//     cupSize = "medium"  
// }

// in class we usally prefare to use interface instead of type for implementing the class.

interface cupSize {
    value: 'small' | 'medium' | 'large';
}

class chai implements cupSize{
    value:"small" | "medium" | "large" = "medium"  ;

}

// also error -> because we are trying to implement a union type which is not allowed in typescript
type Response = {ok:true} | {ok:false}
// class myResponse implements Response{
//     ok = true
// }

// litreal types ( type -> union of string literals)
type TeaType = "masala" | "green" | "black"

function orderChai(t:TeaType){
    console.log(t)
}

// intersection   
type BaseChai = {teaLeaves :number}
type Extra = {masala:number}

type MasalaChai = BaseChai & Extra 

const cup:MasalaChai = {
    teaLeaves: 5,
    masala: 2
}

// sometimes we can also get optional values 

type UserName = {
    username:string;
    bio?:string;
}

const u1:UserName = {
    username:"Dev"
}

const u2:UserName = {
    username:"Dev",
    bio:"I am a developer"
}

type Config = {
    readonly appName :string;
    version :number;
}

const config:Config = {
    appName:"ChaiApp", // only 1 time initialization is allowed because we have marked it as readonly
    version:1.0
}
// config.appName = "chaicode" // gives error because we have marked appName as readonly and we cannot change it after initialization.
