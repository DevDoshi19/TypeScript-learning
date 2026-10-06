# 🔥 Practice Set 05 — Type Design

Don't search for the answer.

Try to **think like TypeScript**.

## Question 1 — Design a User Type

We have three kinds of users:

```text
Admin
Customer
Guest
```

Every user has:

```text
id
name
```

But:

- Admin → `permissions`
- Customer → `orders`
- Guest → `expiresAt`

Design the types so that this becomes **type-safe**.

For example, this should work:

```ts
const admin = {
    id: 1,
    name: "Dev",
    role: "admin",
    permissions: ["delete", "create"]
};
```

But this should **not** be allowed:

```ts
const guest = {
    id: 2,
    name: "Rahul",
    role: "guest",
    permissions: ["delete"]
};
```

### Your task

Create:

```ts
type User = ...
```

using a **discriminated union**.

Then write:

```ts
function describeUser(user: User): string
```

Expected behaviour:

```text
Admin    → "Dev is an admin"
Customer → "Rahul is a customer"
Guest    → "Aman is a guest"
```

---

# Question 2 — Generic API Response

Imagine your backend returns:

```ts
{
    success: true,
    data: {...}
}
```

or:

```ts
{
    success: false,
    error: "Something went wrong"
}
```

Create:

```ts
type ApiResponse<T> = ...
```

such that these are valid:

```ts
const userResponse: ApiResponse<User> = ...
```

and:

```ts
const productResponse: ApiResponse<Product> = ...
```

Then write:

```ts
function handleResponse<T>(response: ApiResponse<T>): T | null
```

The function should:

- return `data` when successful
- return `null` when failed

---

# Question 3 — Utility Types

Given:

```ts
interface Product {
    id: number;
    name: string;
    price: number;
    category: string;
    description: string;
}
```

Create types for:

### A.

A product update where **everything is optional**:

```ts
type ProductUpdate = ...
```

### B.

A product card containing only:

```text
id
name
price
```

```ts
type ProductCard = ...
```

### C.

A product that contains everything **except `description`**:

```ts
type ProductWithoutDescription = ...
```

Don't manually rewrite the properties.

Use TypeScript utility types.

---

# Question 4 — Real-world Debugging 🐛

This code has a TypeScript design problem:

```ts
type PaymentResult = {
    success: boolean;
    transactionId?: string;
    error?: string;
};

function processPayment(result: PaymentResult) {
    if (result.success) {
        console.log(result.transactionId);
    } else {
        console.log(result.error);
    }
}
```

The problem is that TypeScript allows:

```ts
const result: PaymentResult = {
    success: true,
    error: "Payment failed"
};
```

That's logically invalid.

### Your task

Redesign `PaymentResult` so TypeScript **cannot represent invalid states**.

Think back to the mistake we corrected in your previous debugging practice. 😉
