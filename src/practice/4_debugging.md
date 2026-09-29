# 🔥 Practice 04 — Debugging

## Problem 1

```ts
type User = {
    name: string;
    age: number;
};

function getUserName(user: User | undefined): string {
    return user.name;
}
```

Fix it.

The function must still return `string`.

---

## Problem 2

```ts
const numbers: number[] = [10, 20, 30];

for (const index in numbers) {
    console.log(numbers[index] * 2);
}
```

Fix it **without changing the array**.

Think carefully because your `tsconfig` has:

```json
"noUncheckedIndexedAccess": true
```

---

## Problem 3

```ts
function getDiscount(price: number, discount?: number): number {
    if (discount) {
        return price - discount;
    }

    return price;
}
```

Is this completely correct?

Test mentally:

```ts
getDiscount(100, 20)
getDiscount(100, 0)
getDiscount(100)
```

Find the problem and fix it.

---

## Problem 4

```ts
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
        return result.message;
    }

    return result.data;
}
```

Fix it.

---

## Problem 5 — 🔥 Realistic

```ts
type Order = {
    id: number;
    amount: number;
    status: "pending" | "completed" | "cancelled";
};

function getCompletedRevenue(orders: Order[]): number {
    let total = 0;

    for (const order of orders) {
        total += order.amount;
    }

    return total;
}
```

The function is supposed to return:

> **Total revenue from completed orders only.**

Find the logical bug.

---

## Problem 6 — 🔥🔥 Type Design

This code should represent a payment result:

```ts
type PaymentResult = {
    success: boolean;
    transactionId?: string;
    error?: string;
};
```

The problem is that this allows:

```ts
const result: PaymentResult = {
    success: true,
    error: "Something failed"
};
```

That doesn't make logical sense.

**Redesign the type** so TypeScript itself prevents invalid combinations.

Then write:

```ts
function handlePayment(result: PaymentResult): string
```

that handles both cases.

