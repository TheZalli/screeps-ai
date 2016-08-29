
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


function do_task(creep, task, target) {
    // get the task from the memory if not given as an argument
    if (task === undefined) {
        task = creep.memory.task;
    }
    // same with task
    if (target === undefined) {
        target = creep.memory.task_target;
    }
    switch (task) {
        // we are harvesting energy
        // target has to be an energy source
        case tasks.HARVEST:
            
        break;

        // if task is idle or nothing, do nothing
        case tasks.IDLE:
        default:

    }
}


//module.exports.task = task;
module.exports.task_types = task_types;
