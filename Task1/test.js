
//--------- function 1 -------------------------------

console.log(secondsToDate(31536000))
console.log(secondsToDate(0))
console.log(secondsToDate(86400))

//--------- function 2 -------------------------------

console.log(toBase2Converter(5))
console.log(toBase2Converter(1024))

//--------- function 3 -------------------------------

toBase2Converter(5)
toBase2Converter(10)

//--------- function 4 -------------------------------

console.log(substringOccurrencesCounter("a", "test it"))
console.log(substringOccurrencesCounter("t", "test it"))
console.log(substringOccurrencesCounter("T", "test it"))

//--------- function 5 -------------------------------

console.log(repeatingLitters("HHeello  wworrldd"))
console.log(repeatingLitters("Hello"))
console.log(repeatingLitters("Hello world"))

//--------- function 6 -------------------------------

console.log(typeof redundant("apple"))
console.log(typeof redundant("pear"))
console.log(typeof redundant(""))

let f1 = redundant("apple")
let f2 = redundant("pear")
let f3 = redundant("")

console.log(f1())
console.log(f2())
console.log(f3())

//--------- function 6 -------------------------------

// Example usage:
const numberOfDisks = 3;
const minimumMoves = towerHanoi(numberOfDisks);
console.log(`Minimum moves to solve Towers of Hanoi with ${numberOfDisks} disks: ${minimumMoves}`);

//--------- function 6 -------------------------------

/*
let a = [[8, 3], [2, 4], [3, 6]],
    b = [[1, 2, 3], [4, 6, 8]];
*/

let a =
        [[8, 3, 0],
            [2, 4, 1],
            [3, 6, 2]],

    b =
        [[1, 2, 3],
            [4, 6, 1],
            [3, 8, 2]];

let matrixMultiplication1 = matrixMultiplication(a, b);
console.log(matrixMultiplication1)

//--------- function 6 -------------------------------
