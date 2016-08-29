
const CREEP_TYPES = {
    worker: {
        lvl1: [WORK, CARRY, MOVE],
        lvl2: [WORK, WORK, MOVE, CARRY, CARRY, MOVE]
    },
    // TODO
}

function spawn_creep(spawner, name, spec) {
    spawner.createCreep(CREEP_TYPES[name][spec]);
}
