
const tasks = {
    IDLE: 'idle',
    HARVEST: 'harvest',
    STORE_ENERGY: 'store_e',
    BUILD: 'build',
    REPAIR: 'repair',
    REINFORCE: 'reinforce',
    UPGRADE: 'upgrade',
    HEAL: 'heal',
    FLEE: 'flee',
    DEFEND: 'defend',
    ATTACK: 'attack',
};

const stat = {
    FAIL: -1,
    OK: 0,
    DONE: 1,
}

function doTask(creep, task, target) {
    // get the task from the memory if not given as an argument
    if (task === undefined) {
        task = creep.memory.task;
    }
    // same with task
    if (target === undefined) {
        target = creep.memory.task_target;
    }
    switch (task) {
        // we are harvesting
        // target has to be an energy source or mineral deposit
        case tasks.HARVEST:
            return goToAndDo(creep, target,
                (c,t) => c.harvest(t),
                (c,t) => c.carry.energy >= c.carryCapacity);
        break;

        case tasks.STORE_ENERGY:
            var status = goToAndDo(creep, target,
                (c,t) => c.transfer(t, RESOURCE_ENERGY),
                (c,t) => true);
        break;

        // if the task is to idle or something else, do nothing
        case tasks.IDLE:
            return stat.DONE;
        default:
            return stat.FAIL;
    }
}

function goToAndDo(creep, target, action, end_condition) {
    switch (action(creep, target)) {
        case ERR_NOT_IN_RANGE:
            creep.moveTo(target);
            // TODO: check moveTo's possible error code
            return stat.OK;
        break;
        case OK:
            if (end_condition(creep, target)) {
                // we are ready
                return stat.DONE;
            } else {
                return stat.OK;
            }
        default:
            // TODO: error messages for different error codes.
            return stat.FAIL
    }
}

module.exports.tasks = tasks;
module.exports.stat = stat;
module.exports.doTask = doTask;
