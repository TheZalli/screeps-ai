
//var _ = require("lodash");

// Contains a list of different types/castes of creeps and.
// A creep can be classified into multiple types, but types that are supersets
// of another one, shadow them.
//
// MOVE parts are automatically so don't add them as associated parts.
//
// The order of the types matter when classifying creeps, so sort them from the
// least specific to the most specific.
const CREEP_TYPES = {
    // a creep with no active attack or work bodyparts
    civilian: {
        assocParts: [],
    },
    // any creep capable of healing
    healer: {
        assocParts: [HEAL],
    },
    // a claimer creep that claims room controllers
    claimer: {
        assocParts: [CLAIM],
    },
    // a creep that just carries things
    carrier: {
        assocParts: [CARRY],
    },
    // a close-range soldier creep
    warrior: {
        assocParts: [ATTACK],
    },
    // a long-range soldier creep
    ranger: {
        assocParts: [RANGED_ATTACK],
    },
    // a worker creep that does work
    worker: {
        assocParts: [WORK, CARRY],
    },
    // a close-range combat version of the worker
    saboteur: {
        assocParts: [WORK, CARRY, ATTACK],
    },
    // a ranged combat version of the worker
    sapper: {
        assocParts: [WORK, CARRY, RANGED_ATTACK],
    },
};

// Classifies the creep into one or more job types.
// Note that disabled bodyparts affect into the returned type, because we use
// creep.getActiveBodyparts.
function getActiveType(creep) {
    var types = [];

    // TODO

    return types;
};

// Automatically creates a creep body that can be used to spawn a new creep,
// using the parts from the given creep type, multiplying their amount level
// times, adding toughness amount of TOUGH parts and adding enough MOVE parts to
// get to the given maximum slowness.
//
// max_slowness tells how many ticks does it take for the creep to move 1 square
// in plains, if all of the CARRY parts are full. The minimum value is 1.
//
// Example: get a default [WORK, CARRY, MOVE] worker body:
// getCreepBody(["worker"], [1], 0, 2)
// Example: get a [TOUGH, ATTACK, ATTACK, MOVE, MOVE, MOVE] warrior:
// getCreepBody(["warrior"], [2], 1, 1)
// Example: another way for getting a level 1 sapper:
// getCreepBody(["worker", "ranger"], [1, 1], 0, 2)
function getCreepBody(types, levels, toughness, max_slowness) {
    // these two comparisons are for avoiding weird behaviour
    if (max_slowness < 1) {
        return new RangeError("max_slowness can't be <1 ("+max_slowness+")");
    }
    if (toughness < 0) {
        return new RangeError("toughness can't be negative ("+toughness+")");
    }

    // the parts to be returned
    var parts = [];

    // add the parts from the types
    for (var i = 0; i < types.length; i++) {
        const type_parts = CREEP_TYPES[types[i]].assocParts;
        // multiply them by the levels
        for (const p of type_parts) {
            for (var j = 0; j < levels[i]; j++) {
                parts.push(p);
            }
        }
    }

    // add the armor
    for (var i = 0; i < toughness; i++) {
        parts.push(TOUGH);
    }

    // get the amount of move parts needed. Round up for the amount of added, I
    // left it out since the for loop's condition does the same thing for us.
    var move_part_am = parts.length / max_slowness;
    // add the move parts
    for (var i = 0; i < move_part_am; i++) {
        parts.push(MOVE);
    }

    return parts;
};

const mod = {
    getCreepBody: getCreepBody,
    //classifyCreep: classifyCreep,
};

module.exports = mod;
