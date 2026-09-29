## 🧪 Practice 02 — Functions + Objects

**Rule:** Don't use `any`, `as`, generics, classes, or `map/filter/reduce` yet. Use the fundamentals you've learned.

---

### 1. User ID Formatter

Create:

```ts
function formatUserId(id: string | number): string {
    // ...
}
```

Requirements:

- If `id` is a string, return it in uppercase.
- If `id` is a number, return `"USER-" + id`.

Examples:

```text
"dev123" → "DEV123"
101      → "USER-101"
```

**Concepts:** union + narrowing + return type.

---

### 2. Chai Order Calculator

Create:

```ts
type ChaiOrder = {
    type: "masala" | "ginger" | "green";
    cups: number;
};
```

Write:

```ts
function calculateChaiPrice(order: ChaiOrder): number {
    // ...
}
```

Pricing:

```text
masala → ₹10/cup
ginger → ₹15/cup
green  → ₹20/cup
```

Example:

```ts
calculateChaiPrice({
    type: "ginger",
    cups: 3
});
```

Expected:

```text
45
```

**Think:** How can the `type` property help you decide the price?

---

### 3. Find Users 🔥

Create:

```ts
type User = {
    id: number;
    name: string;
    age: number;
};
```

Create at least 5 users.

Then:

```ts
function findUserById(users: User[], id: number): User | undefined {
    // ...
}
```

Requirements:

- Search through the array.
- Return the matching user.
- If no user exists, return `undefined`.

Example:

```ts
findUserById(users, 3);
```

should return something like:

```ts
{
    id: 3,
    name: "Aman",
    age: 22
}
```

**Important:** Don't sort the array.

---

### 4. User Greeting — Optional Parameter

Write:

```ts
function greetUser(name: string, age?: number): string {
    // ...
}
```

Expected behavior:

```text
greetUser("Dev", 21)
→ "Hello Dev, you are 21 years old."

greetUser("Dev")
→ "Hello Dev."
```

You'll need to deal with:

```ts
age
```

being potentially `undefined`.

**Concept:** optional parameter + narrowing.

---

### 5. Payment System 🔥🔥

Now combine several concepts.

Create:

```ts
type Payment =
    | {
          method: "card";
          cardNumber: string;
      }
    | {
          method: "upi";
          upiId: string;
      }
    | {
          method: "cash";
          amountReceived: number;
      };
```

Now write:

```ts
function processPayment(payment: Payment): string {
    // ...
}
```

Expected behavior:

```ts
processPayment({
    method: "card",
    cardNumber: "123456789"
});
```

→

```text
"Payment processed using card."
```

For UPI:

```text
"Payment processed using UPI."
```

For cash:

```text
"Payment received in cash."
```

### The important part

You should **not** do this:

```ts
if (payment.cardNumber) {
    // ...
}
```

Instead, use the discriminant:

```ts
payment.method
```

This is the same **discriminated union** concept we learned earlier.

---

# 🧠 Bonus Challenge — Don't Do This Until 1–5 Are Done

Create:

```ts
type Product = {
    id: number;
    name: string;
    price: number;
    category: "electronics" | "clothing" | "food";
};
```

Create 5 products.

Then write:

```ts
function getProductsByCategory(
    products: Product[],
    category: Product["category"]
): Product[] {
    // ...
}
```

For example:

```ts
getProductsByCategory(products, "electronics");
```

should return only electronics.

Notice this:

```ts
Product["category"]
```

You already know the underlying idea—it is extracting the type of the `category` property.

**Don't worry if this syntax feels new.** If you get stuck there, tell me exactly where.

---
