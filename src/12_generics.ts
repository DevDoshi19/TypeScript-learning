// generics make code more reusable and flexible
// generics are like general type parameters that can be used to create reusable components
// t -> type parameter
// what ever type T we pass, it will be same in the return type abnd the parameter type 
function wrapArray<T>(item:T):T[]{
    return [item]
}

wrapArray("masala") 
wrapArray(42)
wrapArray({flavor:"masala", rating:4.5})

function pair<A,B>(first:A, second:B):[A,B]{
    return [first, second]
}

pair("masala", 4.5)
pair(42, {flavor:"masala", rating:4.5})
pair(12,12)

interface Box<T>{
    content:T
}

const numberBox:Box<number> = {content:42}
// const numberBox:Box<number> = {content:"42"} // will throw error because content is of type number and we are trying to assign string to it
const numberBox1:Box<string> = {content:"square"}

// in all this generics we can use partial, require and all... which ever we are using 
// mostly use in form state, react state, api response, etc. where we don't know the type of data we are getting from the api or from the form state.

interface ApiPromise<T>{
    status: number;
    data: T
}
const res:ApiPromise<{flavor:string}> = {
    status: 200,
    data: {flavor:"masala"} // here the type t is {flavor:string} (we can say as object) and we can access the flavor property of data
}

