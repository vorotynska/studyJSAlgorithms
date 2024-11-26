//#!/usr/bin/env node

const pow = (x, n) => {
    if (n === 0) return 1;
    if (n === 1) return x;
    return x * pow(x, n - 1);
}

console.log(pow(2, 4));

const factorial = (n) => {
    if (n === 0) return 1;
    return n * factorial(n - 1);
}

console.log(factorial(5));

const fibonacci = (n) => {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10));

