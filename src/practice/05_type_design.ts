// 1. Design a User Type
type User = {
    id: number;
    name: string;
    role: "Admin" | "Customer" | "Guest";
} & (
    | { role: "Admin"; permissions: string[] }
    | { role: "Customer"; orders: string[] }
    | { role: "Guest"; expiresAt: Date }
);

function describeUser(user:User):string{
    if (user.role === "Admin"){
        return `${user.name} is an admin` 
    } 
    else if(user.role === "Customer"){
        return `${user.name} is an Customer`
    }
    return `${user.name} is an guest`
}

const admin :User = {
    id: 1,
    name: "Dev",
    role: "Admin",
    permissions: ["delete", "create"]
};

const guest:User = {
    id: 2,
    name: "Purva",
    role: "Guest",
    // permissions: ["delete"],
    expiresAt:new Date(),
};

// 2. Generic API Response

type ApiResponse<T> = {
    success: boolean;
    data?: T;
    error?: string;
}

const userResponse: ApiResponse<User> = {
    success: true,
    data: {
        id: 1,
        name: "Dev",
        role: "Admin",
        permissions: ["delete", "create"]
    },
}

type product = {
    id: number;
    name: string;
    price: number;
}

const errorResponse: ApiResponse<product> = {
    success: false,
    error: "Product not found",

}
function handleResponse<T>(response: ApiResponse<T>): T | null{
    if (response.success) {
        return response.data!;
    }
    return null;
}
handleResponse(userResponse) // returns the user data
handleResponse(errorResponse) // returns null


// question 3: Design a Product Type
interface Product {
    id:number;
    name:string;
    price:number;
    category:string;
    description:string;
}

type ProductUpdate = Partial<Product> & { id: number };

function updateProduct(product: Product, updates: ProductUpdate): Product {
    return { ...product, ...updates };
}

type ProductCard = Pick<Product, "id" | "name" | "price">;

function displayProductCard(product: ProductCard): void {
    console.log(`Product: ${product.name}, Price: ${product.price}`);
}

type ProductWithoutDescription = Omit<Product, "description">;

function displayProductWithoutDescription(product: ProductWithoutDescription): void {
    console.log(`Product: ${product.name}, Price: ${product.price}, Category: ${product.category}`);
}

// 4 debugging and error handling
type PaymentResult = {
    success: true;
    transactionId: string;
}|{
    success: false;
    error: string;
};

function processPayment(result: PaymentResult) {
    if (result.success) {
        console.log(result.transactionId);
    } else {
        console.log(result.error);
    }
}

processPayment({ success: true, transactionId: "abc123" });
processPayment({ success: false, error: "Insufficient funds" });