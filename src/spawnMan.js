
const CREEP_TYPES = {
    // a creep with no useful active bodyparts
    // a super type for all types, so if a creep is civilian it can't be of any
    // other type
    "civilian": {
        // we don't want to create these
        specs: {},
    },
    // a creep that carries things, and just carries them
    // if a creep has any other parts beside MOVE and CARRY, it's not a carrier.
    "carrier": {
        specs: {
            lvl1: [CARRY, CARRY, MOVE],
            lvl2: [CARRY, CARRY, MOVE, CARRY, CARRY, MOVE]
        },
    }
    // a worker type that does work
    "worker": {
        specs: {
            lvl1: [WORK, CARRY, MOVE],
            lvl2: [WORK, WORK, MOVE, CARRY, CARRY, MOVE]
        },
    },
    // TODO
};

// Classifies the creep into one or more job types.
// Note that disabled bodyparts affect into the returned type, because we use
// creep.getActiveBodyparts.
function classifyCreep(creep) {
    var types = [];

    if (creep.getActiveBodyparts(CARRY) > 0) {
        if (creep.getActiveBodyparts(WORK) > 0) {
            types.push("worker");
        } else {
            types.push("carrier");
        }
    }

    if (types === []) {
        return ["civilian"];
    } else {
        return types;
    }
};

function spawnCreep(spawner, type, spec) {
    spawner.createCreep(CREEP_TYPES[type].specs[spec]);
};

const spawnMan = {
    spawnCreep: spawnCreep,
    classifyCreep: classifyCreep,
};

module.exports = spawnMan;
