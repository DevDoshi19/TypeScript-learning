# TypeScript — Type Inference & Type Annotations

## 📌 Overview

TypeScript is a **statically typed superset of JavaScript**.

One of the important features of TypeScript is its ability to understand the type of a value automatically. This is called **Type Inference**.

We can also explicitly tell TypeScript what type a variable should have. This is called a **Type Annotation**.

---

# 1. Type Inference

**Type inference** means TypeScript automatically determines the type of a variable based on the value assigned to it.

```ts
let drink = "chai";
```

TypeScript automatically understands:

```text
drink → string
```

So we don't need to write:

```ts
let drink: string = "chai";
```

TypeScript already knows that `drink` is a string.

### Example

```ts
let channelName = "devdoshi";

channelName = "Dev";
```

Both values are strings, so this is valid.

But:

```ts
channelName = 1221;
```

will produce an error because TypeScript inferred `channelName` as a `string`.

```text
Type 'number' is not assignable to type 'string'.
```

### Key Idea

> **TypeScript can often figure out the type without us explicitly writing it.**

---

# 2. Type Inference with Conditional Expressions

TypeScript can also infer types from expressions.

```ts
let calculate = Math.random() > 0.5 ? 10 : "5";
```

Here, the variable can receive either:

```text
number
```

or

```text
string
```

So TypeScript infers a union type:

```ts
let calculate: number | string;
```

This is called a **union type**.

---

# 3. Types of Errors

There are many types of errors in programming, but two important categories while learning TypeScript are:

## 3.1 Syntax Error

A **syntax error** occurs when the code doesn't follow the rules of the language.

Example:

```ts
let username = "devdoshi"
console.log(username
```

The closing `)` is missing.

The code cannot be parsed correctly.

---

## 3.2 Type Error

A **type error** occurs when we try to use a value in a way that is incompatible with its type.

Example:

```ts
let channelName = "devdoshi";

channelName = 1221;
```

TypeScript knows:

```text
channelName → string
```

But we are trying to assign:

```text
number
```

Therefore:

```text
Type 'number' is not assignable to type 'string'.
```

### Key Idea

> **Syntax errors are about incorrect language structure. Type errors are about incompatible data types.**

---

# 4. Type Annotation

A **type annotation** is when we explicitly specify the type of a variable.

Syntax:

```ts
let variableName: type = value;
```

Example:

```ts
let username: string = "devdoshi";
```

Here:

```text
username → string
```

We explicitly told TypeScript that `username` must contain a string.

Therefore:

```ts
username = "dev";
```

is valid.

But:

```ts
username = 2;
```

is invalid because `2` is a number.

---

# 5. Type Inference vs Type Annotation

### Type Inference

TypeScript determines the type automatically.

```ts
let username = "devdoshi";
```

TypeScript understands:

```text
username → string
```

### Type Annotation

We explicitly specify the type.

```ts
let username: string = "devdoshi";
```

TypeScript is explicitly told:

```text
username → string
```

### Simple Difference

| Concept         | Meaning                         | Example                |
| --------------- | ------------------------------- | ---------------------- |
| Type Inference  | TypeScript figures out the type | `let age = 19`         |
| Type Annotation | Developer specifies the type    | `let age: number = 19` |

---

# 6. Common TypeScript Types

Some commonly used TypeScript types are:

```text
string
number
boolean
null
undefined
void
any
never
unknown
object
array
tuple
enum
```

## Basic Types

```ts
let username: string = "devdoshi";

let age: number = 19;

let isStudent: boolean = true;
```

---

# 7. Important Types to Learn

### `string`

Used for textual data.

```ts
let name: string = "Dev";
```

### `number`

Used for numbers.

```ts
let age: number = 19;
```

### `boolean`

Used for `true` or `false`.

```ts
let isLoggedIn: boolean = true;
```

### `null`

Represents an intentional absence of a value.

```ts
let data: null = null;
```

### `undefined`

Represents a value that has not been assigned.

```ts
let result: unde
```

[Check out the Types in TS code](./src/2_Types_in_TS.ts)