// This module is for simple utility functions that don't rely on the other
// local modules.

// A function that returns the energy cost of the creep body.
function getBodyCost(creepBody) {
    var sum = 0;
    for (var p of creepBody) {
        sum += BODYPART_COST[p];
    }
    return sum;
}

const mod = {
    getBodyCost: getBodyCost
};

module.exports = mod;
