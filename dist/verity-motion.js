'use strict';
// Hop endpoints are exact contact positions. Motion is independent of frame rate.
const verityMotion={hop:null,landing:0,wasMoving:false,monsterReveal:0,runTime:0,
 turn(target,dt){const desired=Math.atan2(target.x-verity.position.x,target.z-verity.position.z);const delta=Math.atan2(Math.sin(desired-verity.rotation.y),Math.cos(desired-verity.rotation.y));verity.rotation.y+=delta*(1-Math.exp(-dt*18));},
 move(target,dt,speed){if(!this.hop){const delta=target.clone().sub(verity.position),distance=Math.hypot(delta.x,delta.z);if(distance<.06&&Math.abs(delta.y)<.08)return true;const duration=.36,length=Math.min(distance,speed*duration),ratio=distance>0?length/distance:1;const end=verity.position.clone().lerp(target,ratio);if(distance<=length+.06)end.copy(target);this.hop={from:verity.position.clone(),to:end,t:0,duration,height:.33+Math.min(.35,length*.17)};}
 const h=this.hop;h.t=Math.min(h.duration,h.t+dt);const u=h.t/h.duration;verity.position.lerpVectors(h.from,h.to,u);verity.position.y+=4*h.height*u*(1-u);const stretch=1+.12*Math.sin(u*Math.PI);verity.scale.set(1/Math.sqrt(stretch),stretch,1/Math.sqrt(stretch));this.turn(h.to,dt);verity.rotation.z=-Math.sin(u*Math.PI)*.055*Math.sign(h.to.x-h.from.x);if(u===1){verity.position.copy(h.to);this.hop=null;this.landing=.12;}this.wasMoving=true;return false;},
 chase(target,dt,speed){
  this.monsterReveal=Math.min(1,this.monsterReveal+dt*2.4);chaseMonster.scale.setScalar(.025+this.monsterReveal*.975);
  const dx=target.x-chaseMonster.position.x,dz=target.z-chaseMonster.position.z,d=Math.hypot(dx,dz);let travelled=0;
  if(d>.05){travelled=Math.min(d,speed*dt);chaseMonster.position.x+=dx/d*travelled;chaseMonster.position.z+=dz/d*travelled;const desired=Math.atan2(dx,dz),delta=Math.atan2(Math.sin(desired-chaseMonster.rotation.y),Math.cos(desired-chaseMonster.rotation.y));chaseMonster.rotation.y+=delta*(1-Math.exp(-dt*9));}
  // Advance the gait by ground covered, so step speed stays matched to pursuit speed.
  this.runTime+=travelled*1.9;const t=this.runTime;monsterBody.position.y=.025+Math.abs(Math.sin(t))*.055;monsterBody.rotation.x=.085+Math.sin(t)*.025;
  monsterHead.rotation.z=Math.sin(t*.5)*.045;monsterHead.rotation.x=-.045+Math.sin(t)*.035;
  monsterArms.forEach((arm,i)=>{const phase=t+(i?Math.PI:0);arm.shoulder.rotation.x=-.08-Math.sin(phase)*.48;arm.shoulder.rotation.z=(i?-.06:.06)+Math.sin(phase)*.06;arm.elbow.rotation.x=-.28-Math.max(0,Math.cos(phase))*.42;arm.hand.rotation.x=.12+Math.sin(phase)*.12;});
  const stance=.62,L1=monsterLegs[0].upperLength,L2=monsterLegs[0].lowerLength;
  monsterLegs.forEach((leg,i)=>{let phase=((t/(Math.PI*2)+(i===1?0.5:0))%1+1)%1,footZ,footY=.18;if(phase<stance){const u=phase/stance;footZ=.98-2*u;}else{const u=(phase-stance)/(1-stance),e=u*u*(3-2*u);footZ=-1.02+2*e;footY+=Math.sin(Math.PI*u)*.48;}
   const vertical=leg.hip.position.y-footY,rawDistance=Math.hypot(footZ,vertical),distance=Math.max(Math.abs(L1-L2)+.001,Math.min(L1+L2-.001,rawDistance));const line=Math.atan2(footZ,vertical),bend=Math.acos(Math.max(-1,Math.min(1,(distance*distance-L1*L1-L2*L2)/(2*L1*L2)))),shoulder=Math.acos(Math.max(-1,Math.min(1,(L1*L1+distance*distance-L2*L2)/(2*L1*distance)))),first=line-shoulder,second=first+bend;leg.hip.rotation.x=-first;leg.knee.rotation.x=-bend;leg.ankle.rotation.x=second;
  });
  this.wasMoving=true;
 },
 idle(dt,faceTarget){this.landing=Math.max(0,this.landing-dt);const squash=.2*Math.sin(Math.PI*this.landing/.12),sy=1-squash;verity.scale.set(1/Math.sqrt(sy),sy,1/Math.sqrt(sy));verity.rotation.z*=Math.exp(-dt*16);if(faceTarget)this.turn(faceTarget,dt);this.wasMoving=false;}
};
