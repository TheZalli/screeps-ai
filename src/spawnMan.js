
const CREEP_TYPES = {
    // a creep with no useful active bodyparts other than maybe MOVE
    // a super type for all types, so if a creep is civilian it can't be of any
    // other type
    civilian: {
        // we don't want to create these
        confs: {},
    },
    // a creep that carries things, and just carries them
    // if a creep has any other parts beside MOVE and CARRY, it's not a carrier.
    // a carrier's speed is normally 1/2 units per tick on plains, except on the
    // *_fast variants.
    carrier: {
        confs: {
            // cost: 50, this is a fast variant
            lvl0_fast:  [CARRY, MOVE],
            // cost: 150
            lvl1:       [CARRY, CARRY, MOVE],
             // cost: 200
            lvl1_fast:  [CARRY, CARRY, MOVE, MOVE],
            // cost: 300
            lvl2:       [CARRY, CARRY, CARRY, CARRY, MOVE, MOVE],
            // cost: 400
            lvl2_fast:  [CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE],
            // cost: 450
            lvl3:       [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
                         MOVE, MOVE, MOVE],
             // cost: 600
             lvl3_fast: [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
                          MOVE, MOVE, MOVE, MOVE, MOVE, MOVE],
        },
    }
    // a worker type that does work
    // a worker's speed is normally 1/2 units per tick on plains, except on the
    // *_fast variants.
    worker: {
        confs: {
            // cost: 200
            lvl1:       [WORK, CARRY, MOVE],
            // cost: 250
            lvl1_fast:  [WORK, CARRY, MOVE, MOVE],
            // cost: 400
            lvl2:       [WORK, WORK, CARRY, CARRY, MOVE, MOVE],
            // cost: 500
            lvl2_fast:  [WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE],
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

function spawnCreep(spawner, type, configuration) {
    spawner.createCreep(CREEP_TYPES[type].confs[configuration]);
};

const spawnMan = {
    spawnCreep: spawnCreep,
    classifyCreep: classifyCreep,
};

module.exports = spawnMan;
