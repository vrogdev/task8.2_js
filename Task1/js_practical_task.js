'use strict';

/**
 * You must return a date that comes in a predetermined number of seconds after 01.06.2020 00:00:002020
 * @param {number} seconds
 * @returns {Date}
 *
 * @example
 *      31536000 -> 01.06.2021
 *      0 -> 01.06.2020
 *      86400 -> 02.06.2020
 */
function secondsToDate(seconds) {
    // let date = new Date(2020, 5, 2)
    let date = new Date("2020-06-01")
    date.setSeconds(seconds)

    return date.toLocaleDateString();
}

/**
 * You must create a function that returns a base 2 (binary) representation of a base 10 (decimal) string number
 * ! Numbers will always be below 1024 (not including 1024)
 * ! You are not able to use parseInt
 * @param {number} decimal
 * @return {string}
 *
 * @example
 *      5 -> "101"
 *      10 -> "1010"
 */
function toBase2Converter(decimal) {
    return decimal.toString(2)
}

/**
 * You must create a function that takes two strings as arguments and returns the number of times the first string
 * is found in the text.
 * @param {string} substring
 * @param {string} text
 * @return {number}
 *
 * @example
 *      'a', 'test it' -> 0
 *      't', 'test it' -> 2
 *      'T', 'test it' -> 2
 */
function substringOccurrencesCounter(substring, text) {

    let index = -1;
    let counter = 0;
    let position = 0;

    while (position !== -1) {
        position = text.indexOf(substring.toLowerCase(), index + 1);

        if (position > -1) {
            index = position
            counter++
        }
    }

    return counter

}


/**
 * You must create a function that takes a string and returns a string in which each character is repeated once.
 *
 * @param {string} string
 * @return {string}
 *
 * @example
 *      "Hello" -> "HHeelloo"
 *      "Hello world" -> "HHeello  wworrldd" // o, l is repeated more then once. Space was also repeated
 */
function repeatingLitters(string) {
    let charArray = Array.from(string);

    return [...string].map(s => (substringOccurrencesCounter(s, string) > 1) ? s : s.repeat(2)).join('')

    /*    return [...string].map(s=>{
            if (substringOccurrencesCounter(s,string) > 1)
                return s.repeat(2)
        }).join('')*/

    /*
        function getNextLitter(currentPosition, lastLitter) {
            if (currentPosition === charArray.length)
                return

            if (charArray[currentPosition] !== lastLitter) {
                return charArray[currentPosition] + getNextLitter(++currentPosition, charArray[currentPosition])
            } else {
                return getNextLitter(++currentPosition, lastLitter)
            }
        }

        return getNextLitter(0)
    */
}


/**
 * You must write a function redundant that takes in a string str and returns a function that returns str.
 * ! Your function should return a function, not a string.
 *
 * @param {string} str
 * @return {function}
 *
 * @example
 *      const f1 = redundant("apple")
 *      f1() ➞ "apple"
 *
 *      const f2 = redundant("pear")
 *      f2() ➞ "pear"
 *
 *      const f3 = redundant("")
 *      f3() ➞ ""
 */
function redundant(str) {
    return () => {
        return str
    }
}

/**
 * https://en.wikipedia.org/wiki/Tower_of_Hanoi
 *
 * @param {number} disks
 * @return {number}
 */
function towerHanoi(disks) {
    if (disks === 1) {
        return 1; // Base case: If there's only one disk, it takes 1 move to solve.
    } else {
        // Recursive case: The number of moves for 'n' disks can be calculated as follows:
        // 1. Move 'n-1' disks from source to auxiliary peg using the destination peg as temporary.
        // 2. Move the largest disk from source to destination peg.
        // 3. Move the 'n-1' disks from auxiliary peg to destination peg using the source peg as temporary.
        return 2 * towerHanoi(disks - 1) + 1;
    }
}

/**
 * You must create a function that multiplies two matricies (n x n each).
 *
 * @param {array} matrix1
 * @param {array} matrix2
 * @return {array}
 *
 */
function matrixMultiplication(matrix1, matrix2) {
    let aNumRows = matrix1.length,
        aNumCols = matrix1[0].length,

        bNumRows = matrix2.length,
        bNumCols = matrix2[0].length,

        matrixResult = new Array(aNumRows);  // initialize array of rows

    if (aNumRows !== aNumCols || bNumRows !== bNumCols) {
        throw new Error("matrices are not square")
    }


    for (let row = 0; row < aNumRows; ++row) {
        matrixResult[row] = new Array(bNumCols); // initialize the current row

        for (let col = 0; col < bNumCols; ++col) {
            matrixResult[row][col] = 0;             // initialize the current cell

            for (let i = 0; i < aNumCols; ++i) {
                matrixResult[row][col] += matrix1[row][i] * matrix2[i][col];
            }
        }
    }

    return matrixResult;
}


/**
 * Create a gather function that accepts a string argument and returns another function.
 * The function calls should support continued chaining until order is called.
 * order should accept a number as an argument and return another function.
 * The function calls should support continued chaining until get is called.
 * get should return all of the arguments provided to the gather functions as a string in the order specified in the order functions.
 *
 * @param {string} str
 * @return {string}
 *
 * @example
 *      gather("a")("b")("c").order(0)(1)(2).get() ➞ "abc"
 *      gather("a")("b")("c").order(2)(1)(0).get() ➞ "cba"
 *      gather("e")("l")("o")("l")("!")("h").order(5)(0)(1)(3)(2)(4).get()  ➞ "hello"
 */
function gather(str) {

    let obj = {
        charArray: [],
        orderedArray: [],

        gather: function (str) {
            this.charArray.push(str)
            return this;
        },

        order: function (position) {
            this.orderedArray.push(this.charArray[position])
            return this;
        },

        get: function () {
            return orderedArray.join();
        }
    }

    return obj.gather(str)
}

//
// gather("a").gather("b").order(1)

/*
function gather(str) {
    // Initialize an array to store the gathered arguments.
    const args = [str];



    // Create a function that adds an argument to the array.
    function addArgument(arg) {
        args.push(arg);
        return addArgument; // Return the same function for chaining.
    }



    // Create an order function that specifies the order in which to concatenate arguments.
    function order(...orderArgs) {
        // Create a function to perform the concatenation based on the order.
        function concatArgs() {
            const orderedArgs = orderArgs.map(index => args[index]);
            return orderedArgs.join('');
        }
        return concatArgs; // Return the concatenation function.
    }



    // Create a get function that returns the concatenated string.
    function get() {
        return args.join('');
    }



    // Return an object with the chaining functions.
    return {
        addArgument,
        order,
        get,
    };
}



// Example usage:
const result1 = gather("a")("b")("c").order(0)(1)(2).get(); // "abc"
const result2 = gather("a")("b")("c").order(2)(1)(0).get(); // "cba"
console.log(result1);
console.log(result2);*/
