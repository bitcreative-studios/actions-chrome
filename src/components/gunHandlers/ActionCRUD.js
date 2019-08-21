import Gun from 'gun/gun';
import React from 'react';
// import 'gun/sea';
// import 'gun/lib/webrtc';
// import 'gun/lib/open';
const db = Gun();
const currentAction = localStorage.getItem('currentAction');
export function createAction(name, tab){
  const action = {
    name: name,
    createdAt: new Date().toISOString(),
    isOpen: false
  }
  const newAction = db.get(name).put(action);
  db.get('actions').set(newAction);
  const newTab = db.get('tabs').put(tab);
  db.get('actions').get(name).set(newTab);
  localStorage.setItem('currentAction', name);
  // db.get('flows').get(name).get('urls').get('url').once(function (flow) {
  //   console.log("flow urls" + flow);
  // })
  // db.get('actions').get(name).get('tabs').once(function(data){
  //   console.log(data);
  // })
  // db.get('actions').once(function(data){
  //   console.log(data);
  // })
}

export function mapActions(){
  var actions = [];
  var counter = 0;
  db.get('actions').map().on(function(data){
    actions.push(data);
    db.get('actions').get(data['name']).get('tabs').on(function(tab){
      actions[counter]['tabs'] = tab;
      counter ++;
    })
  })
  return actions;
}
