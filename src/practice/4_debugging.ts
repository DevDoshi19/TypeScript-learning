// problem 1 — Debugging Function
type User = {
    name: string;
    age: number;
};

function getUserName(user: User | undefined): string {
    if (user === undefined) {
        throw new Error("User is undefined");
    }
    return user.name;
}
// 2nd soultion 
// function getUserName(user: User | undefined): string {
//  
//     return user!.name;
// }


// Problem 2 = Fix it without changing the array.
const numbers: number[] = [10, 20, 30];

for (const index in numbers) {
    console.log(numbers[index]! * 2);
}
// better answer 
for (const num of numbers) {
    console.log(num * 2);
}

// Problem 3 
function getDiscount(price: number, discount?: number): number {
    if (discount !== undefined) {
        return price - discount;
    }

    return price;
}

// Problem 4 
type Result =
    | {
        status: "success";
        data: string;
    }
    | {
        status: "error";
        message: string;
    };

function printResult(result: Result): string {
    if (result.status === "success") {
        return result.data;
    }

    return result.message;
}

// Problem 5 — Realistic

type Order = {
    id: number;
    amount: number;
    status: "pending" | "completed" | "cancelled";
};

function getCompletedRevenue(orders: Order[]): number {
    let total = 0;

    for (const order of orders) {
        if ( order.status === "completed") {
            total += order.amount;
        }
    }

    return total;
}

// Problem 6 —  Type Design

type PaymentResult =
    | {
        success: true;
        transactionId: string;
    }
    | {
        success: false;
        error: string;
    };

const SuccessResult: PaymentResult = {
    success: true,
    transactionId: "abc123",
};

const ErrorResult: PaymentResult = {
    success: false,
    error: "Something failed",
};

function handlePayment(result: PaymentResult): string {
    if (result.success) {
        return `Payment successful: ${result.transactionId}`;
    }

    return `Payment failed: ${result.error}`;
}

