const fs = require('fs')

let inputs = []
let queue = []
let totalEarned = 0

//read the input file
var array = fs.readFileSync('roller_coaster.small').toString().split('\r\n')
for (i in array) {
    if (i == 0) {
        inputs = array[i].split(' ')
    } else {
        queue.push(parseInt(array[i]))
    }
}

const L = parseInt(inputs[0])
const C = parseInt(inputs[1])
const N = parseInt(inputs[2])

function getEmptySitsFilling(L, queue, filling) {
    if (L === queue[0]) {
        // the group number fit perfectly empty sits
        filling.push(queue[0])
        queue.shift()
        return filling
    } else if (L < queue[0] || queue.length === 0) {
        // the group number is too big or no more ppl in the queue
        return filling
    } else {
        //we fill with the 1st group
        filling.push(queue[0])
        let emptySitsCount = L - queue[0]
        //delete the first group
        queue.shift()
        return getEmptySitsFilling(emptySitsCount, queue, filling)
    }
}

for (let rideNum = 1; rideNum <= C; rideNum++) {
    //ride per day
    const emptySitsFilling = getEmptySitsFilling(L, [...queue], [])
    //add earning from this ride
    totalEarned += emptySitsFilling.reduce((a, b) => a + b) // = sum(emptySitsFilling)
    //update the queue at the end of the ride
    queue.push(...queue.splice(0, emptySitsFilling.length))
}

console.log('Total earned : ' + totalEarned)
