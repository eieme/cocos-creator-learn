let StateMachine = require('state-machine');
let fsmData = {
initial: 'nope',
//please select the enter-state here ↓
events: [
//{"name":"startup","from":"nope","to":/*enter-state*/},
{"name":"clear","from":"red","to":"green"},
{"name":"warn","from":"green","to":"yellow"},
{"name":"danic","from":"yellow","to":"red"},
{"name":"calm","from":"red","to":"yellow"}
]
};
let create = function(){
let fsm = StateMachine.create(fsmData);
fsm.ASYNC = StateMachine.ASYNC;
return fsm;
}
module.exports = {create}