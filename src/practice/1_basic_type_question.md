## Problem 1 — User Profile

Create a variable representing a user.

It must contain:

```text
name       → string
age        → number
isStudent  → boolean
```

Example data:

```text
Dev
21
true
```

Use an **object type**.

---

## Problem 2 — Product

Create a type called:

```ts
Product
```

It should have:

```text
name  → string
price → number
```

Then create **three products**.

---

## Problem 3 — Status

Create a type:

```ts
Status
```

It should allow only:

```text
"pending"
"success"
"failed"
```

Then create a variable with that type.

Try assigning:

```ts
"loading"
```

and observe what TypeScript tells you.

**Don't delete the invalid line immediately.** Comment it out after you've understood the error.

---

# Problem 4 — Union

Create a variable called:

```ts
userId
```

It should accept either:

```text
string
```

or

```text
number
```

Then create:

```ts
"DEV123"
```

and:

```ts
101
```

Both should be valid.

---

# Problem 5 — Narrowing

Now create:

```ts
function printId(id: string | number) {
    // ...
}
```

Inside the function:

- If `id` is a string → print it in uppercase.
- If `id` is a number → print the number.

You **must use type narrowing**.

Don't use `as`.

Don't use `any`.

---

# Problem 6 — Array

Create:

```ts
prices
```

It should contain only numbers.

Add:

```text
10
20
30
40
50
```

Then write a function:

```ts
calculateTotal(...)
```

that returns the total price.

Expected:

```text
150
```

---

# Problem 7 — Array of Objects

Create:

```ts
type Student = {
    name: string;
    marks: number;
};
```

Then create:

```ts
students
```

containing at least 4 students.

Example:

```text
Dev   85
Rahul 72
Aman  91
...
```

Then write:

```ts
getTopStudent(...)
```

which returns the student with the highest marks.

---

# Problem 8 — Tuple

Create a tuple representing:

```text
username
age
```

So:

```text
[string, number]
```

Then create:

```text
["Dev", 21]
```

Try reversing them:

```text
[21, "Dev"]
```

and understand why TypeScript rejects it.

---

# Problem 9 — Readonly

Create:

```ts
readonly string[]
```

containing:

```text
"Delhi"
"Mumbai"
"Ahmedabad"
```

Then try:

```ts
push()
```

and:

```ts
array[0] = ...
```

Understand both errors.

---

# Problem 10 — Real Mini Problem 🔥

This is the important one.

Create:

```ts
type Order = {
    id: number;
    customer: string;
    amount: number;
    status: "pending" | "completed" | "cancelled";
};
```

Create an array of orders.

Example:

```text
Order 1 → Dev → ₹500 → completed
Order 2 → Rahul → ₹800 → pending
Order 3 → Aman → ₹300 → completed
Order 4 → Raj → ₹1000 → cancelled
```

Now write:

```ts
getCompletedOrders(...)
```

It should return only completed orders.

Then write:

```ts
getTotalRevenue(...)
```

It should calculate the total `amount` of **completed orders only**.

---
