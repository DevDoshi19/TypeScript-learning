//type assertion, type unknown and type Never 

let response:any = "42"
// forcefull type assertion 
let numericlength :number = (response as string).length;
console.log(numericlength)

type Book = {
    name :string
}

let bookString = `{"name":"The man,The mole,The Fox and The Horse"}`
let bookObject = JSON.parse(bookString) as Book

console.log(bookObject.name)

// HTMLInputElement
const inputElement = document.getElementById("username") as HTMLInputElement
console.log(inputElement.value)

// any - whatever value you want to assign,change you can you idc.. 
// unknown - whatever value you want to assign,change you can you idc.. but you need to check the type of variable before using it. or needed to use correct type for using method.

let value:any
value = "chai"
value = [1,2,3]
value = 2.5
value.toUpperCase() // this will throw error at runtime because value is not a string


let newvalue:unknown
newvalue = "chai"
newvalue = [1,2,3]
newvalue = 2.5
// newvalue.toUpperCase() // by using unknown type we can avoid the above error because unknown type is more safe than any type. We need to check the type of variable before using it.
if (typeof newvalue === "string"){
   newvalue.toUpperCase() // this will not throw error at runtime because we have checked the type of variable before using it.
}

// try-catch block 

try{

}catch(err){
    if (err instanceof Error){
        console.log(err.message)
    }
    console.log("Error ,", err)

}

type Role = "admin" | "user" 

function redirectBasedOnRole(role:Role):void{
    if (role==="admin"){
        console.log("redirecting to admin dashboard")
        return;
    }
    else if(role==="user"){
        console.log("redirecting to user dashboard")
        return 
    }

    role; // type become never 
}

function neverReturn():never{
    while(true){
    }
}