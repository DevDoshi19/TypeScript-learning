// type script will automatically infer the type of value, type infrecing 

let drink = "chai" ;
let calculate = Math.random() > 0.5 ? 10 : '5' ;

// 2 type of errors : 
// 1. syntax error 
// 2. type error 

let channelName = "devdoshi" ;
// channelName = 1221 // type "number" is not assignable to type "string"

// type annotation : explicitly specifying the type of a variable

let username : string = "devdoshi" ;
username = "dev" ;
// username = 2 ; // this will not work because we have specified the type of username as string

// number, boolen,string, null, undefined, void, any, never, unknown, object, array, tuple, enum

