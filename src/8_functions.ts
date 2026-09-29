function makeChai(type:string,cups:number){
    console.log(`Making ${cups} cups of ${type} chai`)
}

makeChai("masala",3)

// return tupe after ":" 
function getChaiPrice(type:string,cups:number):number{
    if(type === "masala"){
        return cups * 10
    }else if(type === "green"){
        return cups * 15
    }else{
        return cups * 20
    }
    // return "10" // will give you error because we have defined the return type of the function as number, so we can't return string from this function.
}

function login():void{
    console.log("user logged in")
}

// Note : optional parameters are always at the end of the parameter list, so we can't have optional parameter in the middle of the parameter list.
function orderchai(type?:string,cups?:number):string{
    if(type === "masala"){
        return `Your order of ${cups} cups of ${type} chai is ready`
    }
    return `Your order of ${cups} cups of chai is ready`
}