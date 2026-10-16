## Practice Set 06 — Discriminated Unions in Real Projects

Imagine you're building an order management system for an e-commerce application.

An order can be in one of three states:

| Status      | Required properties            |
| ----------- | ------------------------------ |
| `pending`   | `orderId`                      |
| `completed` | `orderId`, `completedAt: Date` |
| `failed`    | `orderId`, `reason: string`    |

### Your task

1\. Design the `Order` type

Use a discriminated union so that each status has the correct properties.

2\. Implement `describeOrder()`

```
function describeOrder(order: Order): string {
    // Your implementation
}
```

Expected behaviour:

```
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
```

3\. Test your type design

Try creating an invalid order:

```
const invalidOrder: Order = {
    status: "completed",
    orderId: 104
};
```

TypeScript should reject it because `completedAt` is missing.

### Bonus challenge ⭐

Can you make the function exhaustive using `never`, so that if someone adds a new status like `"cancelled"`, TypeScript helps you identify the missing case?

Don't look up the solution yet. Try writing this in `src/practice/06_discriminated_unions.ts`. Refer to your old notes if needed, and send me your code when you're ready.

After this, we'll move to generics in practice—starting with a reusable function, then building toward typed API responses.