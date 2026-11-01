'use strict';
// Original, locally synthesized toy-piano tune. No audio downloads or autoplay.
const encounterMusic={context:null,bus:null,started:false,muted:false,next:0,step:0,
 start(context){if(!context||this.started)return;this.context=context;this.bus=context.createGain();this.bus.gain.value=0;this.bus.connect(context.destination);this.next=context.currentTime+.06;this.started=true;},
 note(midi,at,duration,volume,kind='triangle'){const c=this.context,o=c.createOscillator(),g=c.createGain();o.type=kind;o.frequency.value=440*2**((midi-69)/12);g.gain.setValueAtTime(.0001,at);g.gain.exponentialRampToValueAtTime(volume,at+.008);g.gain.exponentialRampToValueAtTime(.0001,at+duration);o.connect(g);g.connect(this.bus);o.start(at);o.stop(at+duration+.02);},
 update(audible){if(!this.started)return;const c=this.context;this.bus.gain.setTargetAtTime(audible&&!this.muted?.38:0,c.currentTime,.07);if(!audible){this.next=c.currentTime+.06;return;}const melody=[76,79,84,79,81,79,76,74,72,null,76,79,77,76,74,null,74,77,81,77,79,77,74,72,71,null,74,77,76,74,72,null];const stepDuration=60/136/2;let scheduled=0;while(this.next<c.currentTime+.13&&scheduled++<4){const i=this.step%32,n=melody[i];if(n!==null){this.note(n,this.next,.24,.14,'sine');this.note(n+12,this.next,.1,.027,'sine');}if(i%2===0){const bass=i<8?48:i<16?53:i<24?55:48;this.note(bass,this.next,.19,.09);this.note(bass+7,this.next+.04,.13,.025);}if(i%4===2)this.note(91,this.next,.035,.025,'triangle');this.step++;this.next+=stepDuration;}},
 toggle(){this.muted=!this.muted;return this.muted;}
};
