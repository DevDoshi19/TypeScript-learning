interface Pending{
    orderId:number;
    status: "pending";
}
interface Completed{
    orderId:number;
    status: "completed";
    completedAt:Date;
}
interface Failed{
    orderId:number;
    status: "failed";
    reason:string;
}
// interface Fail{
//     orderId:number;
//     status: "fail";
//     abc:string;
// }

type Order = Pending | Completed | Failed ;

function assertNever(value: never): never {
    throw new Error(`Unexpected value: ${value}`);
}

function describeOrder(order: Order): string {
    switch (order.status) {
        case "pending":
            return `Order ${order.orderId} is pending`;

        case "completed":
            return `Order ${order.orderId} was completed`;

        case "failed":
            return `Order ${order.orderId} failed: ${order.reason}`;

        default:
            return assertNever(order);
    }
}
describeOrder({
    status: "pending",
    orderId: 101
});
// "Order 101 is pending."

describeOrder({
    status: "completed",
    orderId: 102,
    completedAt: new Date()
});
// "Order 102 was completed."

describeOrder({
    status: "failed",
    orderId: 103,
    reason: "Payment declined"
});
// "Order 103 failed: Payment declined"

// describeOrder({
//     status: "fail",
//     orderId: 103,
//     abc: "Payment declined"
// });

// we can see the error property completeAt is missing 
// const invalidOrder: Order = {
//     status: "completed",
//     orderId: 104
// };

