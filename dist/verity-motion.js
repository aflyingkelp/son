'use strict';
// Hop endpoints are exact contact positions. Motion is independent of frame rate.
const verityMotion={hop:null,landing:0,wasMoving:false,
 turn(target,dt){const desired=Math.atan2(target.x-verity.position.x,target.z-verity.position.z);const delta=Math.atan2(Math.sin(desired-verity.rotation.y),Math.cos(desired-verity.rotation.y));verity.rotation.y+=delta*(1-Math.exp(-dt*18));},
 move(target,dt,speed){if(!this.hop){const delta=target.clone().sub(verity.position),distance=Math.hypot(delta.x,delta.z);if(distance<.06&&Math.abs(delta.y)<.08)return true;const duration=.36,length=Math.min(distance,speed*duration),ratio=distance>0?length/distance:1;const end=verity.position.clone().lerp(target,ratio);if(distance<=length+.06)end.copy(target);this.hop={from:verity.position.clone(),to:end,t:0,duration,height:.33+Math.min(.35,length*.17)};}
 const h=this.hop;h.t=Math.min(h.duration,h.t+dt);const u=h.t/h.duration;verity.position.lerpVectors(h.from,h.to,u);verity.position.y+=4*h.height*u*(1-u);const stretch=1+.12*Math.sin(u*Math.PI);verity.scale.set(1/Math.sqrt(stretch),stretch,1/Math.sqrt(stretch));this.turn(h.to,dt);verity.rotation.z=-Math.sin(u*Math.PI)*.055*Math.sign(h.to.x-h.from.x);if(u===1){verity.position.copy(h.to);this.hop=null;this.landing=.12;}this.wasMoving=true;return false;},
 idle(dt,faceTarget){this.landing=Math.max(0,this.landing-dt);const squash=.2*Math.sin(Math.PI*this.landing/.12),sy=1-squash;verity.scale.set(1/Math.sqrt(sy),sy,1/Math.sqrt(sy));verity.rotation.z*=Math.exp(-dt*16);if(faceTarget)this.turn(faceTarget,dt);this.wasMoving=false;}
};
