'use strict';
const stage=document.getElementById('scene');
const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(68,1,.07,160),renderer=new THREE.WebGLRenderer({antialias:true,alpha:true});renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;renderer.outputColorSpace=THREE.SRGBColorSpace;stage.appendChild(renderer.domElement);renderer.setSize(innerWidth,innerHeight);
const materials={};function mat(c){return materials[c]||(materials[c]=new THREE.MeshStandardMaterial({color:c,roughness:.86}));}
const cream=0xddd3b4,teal=0x488d88,red=0xb75146,blue=0x527b9e,yellow=0xe6ba43,wood=0xad8560;
function box(w,h,d,x,y,z,c,parent=scene){const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),mat(c));m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;parent.add(m);return m;}
function sphere(r,x,y,z,c,parent=scene){const m=new THREE.Mesh(new THREE.SphereGeometry(r,32,24),mat(c));m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;parent.add(m);return m;}
function cylinder(r,h,x,y,z,c,parent=scene){const m=new THREE.Mesh(new THREE.CylinderGeometry(r,r,h,24),mat(c));m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;parent.add(m);return m;}
function sign(text,w,h,x,y,z,bg='#eee2be',fg='#395f5d',parent=scene){const c=document.createElement('canvas');c.width=1024;c.height=256;const g=c.getContext('2d');g.fillStyle=bg;g.fillRect(0,0,1024,256);g.fillStyle=fg;g.textAlign='center';g.textBaseline='middle';g.font='500 '+(text.length>26?43:64)+'px sans-serif';g.fillText(text,512,128,950);const texture=new THREE.CanvasTexture(c);texture.colorSpace=THREE.SRGBColorSpace;const m=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshStandardMaterial({map:texture,roughness:1}));m.position.set(x,y,z);parent.add(m);return m;}
// Open-front architectural cutaway, with an actual doorway into the waiting room.
box(16,.28,13,0,-.16,0,0x8d8874);
for(let x=-7.5;x<8;x++)for(let z=-6;z<6.5;z++)box(.98,.035,.98,x,-.003,z,(Math.round(x+z+.5)%2===0)?0xd4cbb3:0xb6b8a0);
box(.22,4.4,13,-8,2.1,0,cream);box(.22,4.4,13,8,2.1,0,cream);
box(10,4.4,.22,-3,2.1,-6.5,cream);box(4,4.4,.22,6,2.1,-6.5,cream);box(2,1.4,.22,3,3.6,-6.5,cream);
box(.12,1.2,13,-7.85,.6,0,teal);box(.12,1.2,13,7.85,.6,0,teal);box(10,1.2,.13,-3,.6,-6.35,teal);box(4,1.2,.13,6,.6,-6.35,teal);
box(2.2,.16,.34,3,2.95,-6.45,wood);for(const x of [1.93,4.07])box(.16,3,.34,x,1.45,-6.45,wood);
sign('QUIET ROOM',2.1,.48,3,3.5,-6.32);
box(7,.2,7,3,-.1,-10,0xaaa28f);box(.18,4.4,7,-.5,2.2,-10,cream);box(.18,4.4,7,6.5,2.2,-10,cream);box(7,4.4,.18,3,2.2,-13.5,cream);
box(2.6,.28,.8,3,.55,-12.7,blue);for(const x of [2,4])box(.12,.5,.6,x,.2,-12.7,wood);box(2.6,.8,.14,3,1,-13.04,blue);
sign('PLEASE WAIT HERE',2.5,.5,3,2.35,-13.38);
// A physical tabletop toy occupies the wait without introducing a screen.
box(2.7,.16,2.7,3,.84,-10.15,wood);for(const x of [1.9,4.1])for(const z of [-11.25,-9.05])box(.12,.8,.12,x,.4,z,wood);
const mazeRows=['#######','#.#...#','#.#.#.#','#...#.#','#####.#','#.....#','#######'];
const mazeOrigin={x:1.92,z:-11.23},cell=.36;box(2.55,.04,2.55,3,.94,-10.15,cream);
for(let row=0;row<7;row++)for(let col=0;col<7;col++)if(mazeRows[row][col]==='#')box(.34,.16,.34,mazeOrigin.x+col*cell,1.03,mazeOrigin.z+row*cell,teal);
const goal=cylinder(.13,.018,mazeOrigin.x+5*cell,.975,mazeOrigin.z+5*cell,0x509052);
const marble=sphere(.105,mazeOrigin.x+cell,1.07,mazeOrigin.z+cell,yellow);let marbleCell=[1,1],moves=0,won=false;
// Reading nook, low bookshelf, cushions, and a wooden shape sorter.
box(.6,.8,2.2,0,.4,-11.3,wood);for(let i=0;i<7;i++)box(.43,.47,.15,.02,.65,-12.1+i*.25,[blue,red,yellow,teal][i%4]);
box(1.1,.05,1.2,5.5,.04,-10.4,teal);sphere(.43,5.5,.28,-10.6,red).scale.y=.55;
box(.65,.45,.65,5.5,.27,-12.6,wood);cylinder(.12,.08,5.35,.54,-12.6,blue);box(.2,.08,.2,5.65,.54,-12.6,red);
sign('DISCOVERY CENTER',6.8,.85,-2.5,3.55,-6.32);
// Reception desk and cubby shelves.
box(3.6,1.25,1.3,-5.4,.65,3.5,teal);box(3.85,.15,1.55,-5.4,1.34,3.5,wood);sign('WELCOME, FRIEND!',2.8,.46,-5.4,.8,4.16);
for(let i=0;i<4;i++){box(.1,2,.65,-6.8+i*.78,1,-5.7,wood);for(let j=0;j<3;j++)box(.8,.09,.65,-6.4+i*.78,.1+j*.7,-5.7,wood);}
for(let i=0;i<9;i++)box(.4,.35,.4,-6.4+(i%3)*.78,.3+Math.floor(i/3)*.7,-5.65,[red,blue,yellow][i%3]);
// Playhouse with a crawl-through opening.
box(.18,2.4,2.8,-6.1,1.2,-1.6,red);box(.18,2.4,2.8,-3.3,1.2,-1.6,red);box(3,2.4,.18,-4.7,1.2,-3,red);
box(.8,2.4,.15,-5.8,1.2,-.2,red);box(.8,2.4,.15,-3.6,1.2,-.2,red);box(1.5,.65,.15,-4.7,2.07,-.2,red);
const roof=new THREE.Mesh(new THREE.ConeGeometry(2.3,1.35,4),mat(blue));roof.position.set(-4.7,3.03,-1.6);roof.rotation.y=Math.PI/4;roof.castShadow=true;scene.add(roof);sign('PLAY',1,.35,-4.7,2.15,-.1,'#b75146','#fff0cf');
// Soft play platform, slide, stairs, foam blocks.
box(2.4,1.6,2,5.9,.8,-3.6,yellow);for(let i=0;i<4;i++)box(1.1,.4*(i+1),.55,7,.2*(i+1),-1.8-i*.55,teal);
const slide=box(1.2,.12,3.5,4.7,.85,-1.3,red);slide.rotation.x=-.45;for(const x of [4.05,5.35]){const rail=box(.12,.3,3.6,x,1,-1.3,yellow);rail.rotation.x=-.45;}
box(1,.9,1,6,.45,2.4,blue);box(.85,.85,.85,6.6,.425,3.6,red);box(.75,.75,.75,5.8,1.28,2.4,yellow);
// Activity tables and small chairs.
for(const [x,z]of [[-.8,-2.3],[2.2,2.5]]){cylinder(1.05,.15,x,.85,z,wood);cylinder(.13,.8,x,.4,z,teal);for(let i=0;i<3;i++){const a=i*2.094,sx=x+Math.cos(a)*1.6,sz=z+Math.sin(a)*1.6;box(.6,.14,.6,sx,.48,sz,[red,blue,teal][i]);for(const dx of [-.21,.21])box(.08,.45,.08,sx+dx,.22,sz,wood);}for(let i=0;i<3;i++)box(.18,.2,.18,x-.4+i*.3,1.03,z,[red,blue,yellow][i]);}
box(4,.035,3,-.5,.035,3.1,teal);for(let i=0;i<4;i++)box(.85,.045,.85,-1.9+i*.95,.065,3.1,[yellow,red,blue,cream][i]);
// Wall mural and windows, all physical room details with no screens.
for(let i=0;i<5;i++){const cloud=sphere(.36,-5.5+i*.58,2.7,-6.16,0xf1e9ce);cloud.scale.set(1,.65,.13);}sphere(.56,-.7,2.8,-6.17,yellow).scale.z=.12;
for(const z of [-3,1,4]){box(.12,1.7,1.6,7.83,2.65,z,wood);box(.14,1.48,1.38,7.74,2.65,z,0x89aeb0);box(.18,1.5,.06,7.63,2.65,z,cream);box(.18,.06,1.4,7.63,2.65,z,cream);}
// Verity is now only a yellow sphere with a curved, surface-hugging smile.
const verity=new THREE.Group();verity.position.set(-.4,1.1,.8);scene.add(verity);sphere(.78,0,0,0,yellow,verity);
// A much taller, distorted version appears only after the chase begins.
const chaseMonster=new THREE.Group();chaseMonster.visible=false;scene.add(chaseMonster);
// Original chase form: Verity's round yellow smile survives on an unnaturally tall body.
const monsterHide=new THREE.MeshStandardMaterial({color:0x171a17,roughness:.96}),monsterSkin=new THREE.MeshStandardMaterial({color:0xc4a93f,roughness:.82}),monsterBlack=new THREE.MeshStandardMaterial({color:0x10110f,roughness:.94}),monsterBone=new THREE.MeshStandardMaterial({color:0xb9ad83,roughness:.94}),monsterRust=new THREE.MeshStandardMaterial({color:0x48382b,roughness:.98});
const monsterBody=new THREE.Group();chaseMonster.add(monsterBody);
const torsoProfile=[[.12,-1.45],[.31,-1.22],[.4,-.84],[.32,-.48],[.49,-.12],[.46,.32],[.36,.68],[.3,1.02],[.22,1.35],[.12,1.48]].map(([r,y])=>new THREE.Vector2(r,y));
const monsterTorso=new THREE.Mesh(new THREE.LatheGeometry(torsoProfile,20),monsterHide);monsterTorso.position.y=3.25;monsterTorso.castShadow=true;monsterBody.add(monsterTorso);
for(const [y,rx,rz]of [[2.6,.32,.27],[2.88,.41,.31],[3.16,.46,.34],[3.44,.43,.32],[3.72,.37,.29],[3.98,.3,.25]]){const pts=[];for(let i=0;i<=20;i++){const a=Math.PI*i/20;pts.push(new THREE.Vector3(rx*Math.cos(a),y,rz*Math.sin(a)+.045));}const rib=new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts),24,.032,7,false),monsterRust);rib.castShadow=true;monsterBody.add(rib);}
const monsterNeck=new THREE.Mesh(new THREE.CylinderGeometry(.16,.24,.58,12),monsterHide);monsterNeck.position.y=4.66;monsterBody.add(monsterNeck);
const monsterHead=new THREE.Group();monsterHead.position.set(0,5.42,0);monsterBody.add(monsterHead);
const monsterFace=new THREE.Mesh(new THREE.SphereGeometry(.82,32,24),monsterSkin);monsterFace.castShadow=true;monsterHead.add(monsterFace);
for(const x of [-.26,.26]){const eye=new THREE.Mesh(new THREE.SphereGeometry(.13,16,12),monsterBlack);eye.position.set(x,.12,Math.sqrt(.82*.82-x*x-.12*.12)+.012);monsterHead.add(eye);const glint=new THREE.Mesh(new THREE.SphereGeometry(.022,8,8),monsterBone);glint.position.set(x-.025,.15,eye.position.z+.108);monsterHead.add(glint);}
const grinPoints=[];for(let i=0;i<=20;i++){const x=-.39+i*.039,y=-.29+.12*(x/.39)**2;grinPoints.push(new THREE.Vector3(x,y,Math.sqrt(.82*.82-x*x-y*y)+.014));}const monsterMouth=new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(grinPoints),28,.038,8,false),monsterBlack);monsterHead.add(monsterMouth);
for(const x of [-.2,-.07,.07,.2]){const tooth=new THREE.Mesh(new THREE.BoxGeometry(.065,.105,.035),monsterBone);const y=-.3+.12*(x/.39)**2;tooth.position.set(x,y-.015,Math.sqrt(.82*.82-x*x-y*y)+.03);monsterHead.add(tooth);}
const monsterArms=[];
function createMonsterArm(side){const shoulder=new THREE.Group();shoulder.position.set(side*.43,4.3,0);monsterBody.add(shoulder);const joint=new THREE.Mesh(new THREE.SphereGeometry(.24,12,10),monsterHide);shoulder.add(joint);const upperLength=1.65,lowerLength=1.5,upper=new THREE.Mesh(new THREE.CylinderGeometry(.2,.145,upperLength,12),monsterHide);upper.position.y=-upperLength/2;upper.castShadow=true;shoulder.add(upper);const elbow=new THREE.Group();elbow.position.y=-upperLength;shoulder.add(elbow);const elbowJoint=new THREE.Mesh(new THREE.SphereGeometry(.16,12,10),monsterRust);elbow.add(elbowJoint);const lower=new THREE.Mesh(new THREE.CylinderGeometry(.145,.085,lowerLength,12),monsterHide);lower.position.y=-lowerLength/2;lower.castShadow=true;elbow.add(lower);const hand=new THREE.Group();hand.position.y=-lowerLength;elbow.add(hand);const palm=new THREE.Mesh(new THREE.SphereGeometry(.2,12,10),monsterHide);palm.scale.set(.82,1.25,.72);palm.position.y=-.08;hand.add(palm);for(let i=0;i<3;i++){const claw=new THREE.Mesh(new THREE.ConeGeometry(.055,.48,7),monsterBlack);claw.position.set((i-1)*.12,-.34,.13);claw.rotation.x=2.65;hand.add(claw);}return{shoulder,elbow,hand};}
monsterArms.push(createMonsterArm(-1),createMonsterArm(1));
const monsterLegs=[];
function createMonsterLeg(side){const hip=new THREE.Group();hip.position.set(side*.23,1.86,0);chaseMonster.add(hip);const upperLength=1.56,lowerLength=1.56,upper=new THREE.Mesh(new THREE.CylinderGeometry(.27,.19,upperLength,12),monsterHide);upper.position.y=-upperLength/2;upper.castShadow=true;hip.add(upper);const knee=new THREE.Group();knee.position.y=-upperLength;hip.add(knee);const joint=new THREE.Mesh(new THREE.SphereGeometry(.2,12,10),monsterRust);knee.add(joint);const lower=new THREE.Mesh(new THREE.CylinderGeometry(.17,.1,lowerLength,12),monsterHide);lower.position.y=-lowerLength/2;lower.castShadow=true;knee.add(lower);const ankle=new THREE.Group();ankle.position.y=-lowerLength;knee.add(ankle);const foot=new THREE.Mesh(new THREE.BoxGeometry(.36,.2,.68),monsterBlack);foot.position.set(0,-.06,.2);foot.castShadow=true;ankle.add(foot);for(const x of [-.12,0,.12]){const nail=new THREE.Mesh(new THREE.ConeGeometry(.035,.19,6),monsterBone);nail.position.set(x,-.1,.49);nail.rotation.x=Math.PI/2;ankle.add(nail);}return{hip,knee,ankle,upperLength,lowerLength,side};}
monsterLegs.push(createMonsterLeg(-1),createMonsterLeg(1));
chaseMonster.traverse(o=>{if(o.isMesh)o.userData.noPlayerCollision=true;});
for(const x of [-.25,.25]){const eye=sphere(.068,x,.16,Math.sqrt(.78*.78-x*x-.16*.16)+.004,0x28251f,verity);eye.scale.y=1.45;eye.scale.z=.35;}
const pts=[];for(let i=0;i<=40;i++){const x=-.35+i*.7/40,y=-.13-.23*(1-(x/.35)**2),z=Math.sqrt(.78*.78-x*x-y*y)+.008;pts.push(new THREE.Vector3(x,y,z));}const smile=new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts),40,.027,8,false),mat(0x28251f));verity.add(smile);
// Expand the original room into a connected, roofless facility, without scaling its furniture.
const remove=[];scene.traverse(o=>{if(o.isMesh&&o.geometry.type==='BoxGeometry'&&Math.abs(o.position.x)>=7.6&&Math.abs(o.position.x)<=8.1&&o.geometry.parameters.depth>=12.9)remove.push(o);});remove.forEach(o=>scene.remove(o));
box(44,.28,34,0,-.32,-9.5,0xa09b87);
box(6,.04,20,-8.7,-.05,-3.5,0xbcb69c);box(6,.04,20,8.7,-.05,-3.5,0xbcb69c);box(44,.04,3,0,-.05,-12,0xbcb69c);
// Low cutaway partitions reveal the many rooms; openings are actual gaps.
function wallX(x,z1,z2,door){const h=4.4;if(door===undefined){box(.18,h,z2-z1,x,h/2,z1+(z2-z1)/2,cream);return;}if(door-1.1>z1)box(.18,h,door-1.1-z1,x,h/2,(z1+door-1.1)/2,cream);if(door+1.1<z2)box(.18,h,z2-door-1.1,x,h/2,(z2+door+1.1)/2,cream);box(.18,1.5,2.2,x,3.65,door,cream);}
function wallZ(z,x1,x2){box(x2-x1,4.4,.18,(x1+x2)/2,2.2,z,cream);}
const rooms=[];
function room(name,x,z,w,d,type,color){box(w-.12,.04,d-.12,x,-.02,z,color);wallX(x-w/2,z-d/2,z+d/2,x>0?z:undefined);wallX(x+w/2,z-d/2,z+d/2,x<0?z:undefined);wallZ(z-d/2,x-w/2,x+w/2);wallZ(z+d/2,x-w/2,x+w/2);const label=sign(name,w*.8,.8,x,.09,z+d/2-1);label.rotation.x=-Math.PI/2;rooms.push({name,x,z,w,d,type});return rooms[rooms.length-1];}
room('ART STUDIO',-16.5,1,11,11,'art',0xd8baa1);room('READING ROOM',-16.5,-10,11,11,'library',0xc4c8a4);room('MUSIC ROOM',-16.5,-21,11,11,'music',0xb4bdcb);
room('CAFETERIA',16.5,1,11,11,'cafe',0xd1c4a8);room('CLASSROOM',16.5,-10,11,11,'class',0xb6c6b9);room('SOFT PLAY',16.5,-21,11,11,'soft',0xd4b49c);
// Rear wing, reached along the long cross corridor.
for(const [name,x,type,color] of [['COSTUME ROOM',-7.5,'costume',0xcbbbc7],['NAP ROOM',-2.5,'nap',0xb3bdca],['STAFF ROOM',2.5,'staff',0xc4c0aa],['STORAGE',7.5,'storage',0xb8af9e]]){const r=room(name,x,-20.5,5,12,type,color); }
// Replace front partitions of rear rooms with real doors to the cross corridor.
const frontWalls=scene.children.filter(o=>o.isMesh&&o.geometry.type==='BoxGeometry'&&o.position.z===-14.5&&o.geometry.parameters.width===5);frontWalls.forEach(o=>{const x=o.position.x;scene.remove(o);box(1.4,4.4,.18,x-1.8,2.2,-14.5,cream);box(1.4,4.4,.18,x+1.8,2.2,-14.5,cream);box(2.2,1.5,.18,x,3.65,-14.5,cream);});
// Side corridors continue around the original quiet room to the back wing.
box(2.3,.04,5, -9.7,-.03,-8,0xbcb69c);box(2.3,.04,5,9.7,-.03,-8,0xbcb69c);
function table(x,z,c=wood){box(2,.14,1.1,x,.83,z,c);for(const dx of [-.8,.8])for(const dz of [-.4,.4])box(.09,.8,.09,x+dx,.4,z+dz,wood);}
function chair(x,z,c=blue){box(.6,.12,.6,x,.48,z,c);box(.6,.65,.1,x,.8,z-.25,c);for(const dx of [-.22,.22])box(.09,.45,.4,x+dx,.22,z,wood);}
for(const r of rooms){const {x,z,w,d,type}=r;
 if(['art','class','cafe','staff'].includes(type)){for(const dx of (w>7?[-2.5,2.5]:[0]))for(const dz of [-2.3,1.2]){table(x+dx,z+dz,type==='art'?cream:wood);chair(x+dx,z+dz+.95,red);chair(x+dx,z+dz-.95,blue);if(type==='art')for(let i=0;i<4;i++)cylinder(.08,.17,x+dx-.6+i*.3,.98,z+dz,[red,blue,yellow,teal][i]);}if(type==='cafe'){box(7,1,1,x,.5,z-4.5,teal);for(let i=0;i<4;i++)cylinder(.3,.12,x-2.2+i*1.4,1.08,z-4.5,cream);}if(type==='class'){box(5,1.4,.1,x,1.2,z-5.35,teal);sign('A B C   1 2 3',4,.6,x,1.3,z-5.28,'#488d88','#fff1d5');}}
 if(type==='library'){for(const dx of [-4,4])for(let row=0;row<3;row++){box(.65,.08,7,x+dx,.3+row*.55,z,wood);for(let i=0;i<14;i++)box(.45,.4,.25,x+dx,.53+row*.55,z-3.2+i*.48,[red,blue,teal,yellow][i%4]);}box(4,.05,4,x,.04,z,teal);for(const dx of [-1,1])sphere(.55,x+dx,.4,z,blue).scale.y=.6;}
 if(type==='music'){for(let i=0;i<4;i++){cylinder(.4,.55,x-3+i*2,.45,z,red);cylinder(.42,.05,x-3+i*2,.75,z,cream);}box(3,1,1,x,.5,z-3,0x4e4940);for(let i=0;i<12;i++)box(.21,.05,.45,x-1.3+i*.23,1.03,z-2.7,cream);}
 if(type==='soft'){box(7,.08,6,x,.05,z,teal);for(let i=0;i<14;i++)box(.8,.8,.8,x-2.7+(i%5)*1.2,.48+Math.floor(i/10)*.8,z-2+Math.floor(i/5)*1.4,[blue,red,yellow][i%3]);const tunnel=new THREE.Mesh(new THREE.CylinderGeometry(.9,.9,3,24,1,true),new THREE.MeshStandardMaterial({color:yellow,side:THREE.DoubleSide}));tunnel.rotation.z=Math.PI/2;tunnel.position.set(x,.95,z+2);scene.add(tunnel);}
 if(type==='nap'){for(const dz of [-3.5,-1,1.5]){box(3.5,.2,1.5,x,.2,z+dz,wood);box(3.35,.15,1.35,x,.38,z+dz,blue);box(.6,.12,1.1,x-1.2,.52,z+dz,cream);}}
 if(type==='storage'){for(let i=0;i<12;i++)box(.8,.8,.8,x-1.1+(i%3)*1.05,.42+Math.floor(i/6)*.85,z-3+Math.floor(i/3)%2*2,wood);}
 if(type==='costume'){for(const dx of [-1.7,1.7]){box(.08,1.7,6,x+dx,.85,z,wood);for(let i=0;i<6;i++)box(.15,1.1,.55,x+dx,.9,z-2.6+i*.9,[red,blue,yellow,teal][i%4]);}}
}
// Restrooms and a small maintenance room complete the service wing.
room('RESTROOMS',-4.5,-8.7,6,4,'bath',0xbac9c7);for(let i=0;i<3;i++){box(.12,1.5,1.8,-6.7+i*1.4,.75,-9,cream);cylinder(.23,.45,-6+i*1.4,.25,-9.4,cream);}
room('MAINTENANCE',7.7,-8.7,1.8,4,'utility',0xb9b5a5);box(1.2,1.7,.4,7.7,.85,-10.1,0x697b7c);
// Broad wall openings connect the main hall to both side wings.
for(const x of [-8,8]){wallX(x,-6.5,6.5,1);}
// Continuous ceilings and exterior perimeter, replacing the architectural cutaway.
box(44,.24,33,0,4.52,-10,0xbdbba9);wallZ(-26.5,-22,22);
for(const x of [-22,22])wallX(x,-26.5,6.5);
const ceilingGlow=new THREE.MeshStandardMaterial({color:0xe7e4ce,emissive:0xffedc2,emissiveIntensity:.75,roughness:1});
for(const x of [-16,-8,0,8,16])for(const z of [-22,-16,-10,-4,2]){const fixture=new THREE.Mesh(new THREE.BoxGeometry(1.6,.06,.45),ceilingGlow);fixture.position.set(x,4.36,z);scene.add(fixture);}
const quietLight=new THREE.PointLight(0xffe5b3,13,11,2);quietLight.position.set(3,3.6,-9.7);scene.add(quietLight);
const hallLight=new THREE.PointLight(0xffefce,18,16,2);hallLight.position.set(0,3.7,.5);scene.add(hallLight);
// Outdoor enclosure: attached directly to the front of the existing center.
const concrete=0x777970,stain=0x535e52,iron=0x3d4845;
box(30,.25,25,0,-.2,19,0x6f746c);
for(let x=-14;x<15;x+=2)for(let z=8;z<31;z+=2)box(1.97,.025,1.97,x,.002,z,((x+z)%4===0)?0x85877b:0x7d8177);
// High walls and building masses eliminate any outward sightline.
box(7,8,25,-18.5,4,19,concrete);box(7,8,25,18.5,4,19,concrete);
box(13,7.5,.5,-8.5,3.75,31.5,concrete);box(13,7.5,.5,8.5,3.75,31.5,concrete);box(4,4.1,.5,0,5.45,31.5,concrete);
box(14,6.5,.4,-8,3.25,6.6,cream);box(14,6.5,.4,8,3.25,6.6,cream);box(2,3.5,.4,0,4.75,6.6,cream);
// The return doorway is physically open into the main play hall.
for(const x of [-1.08,1.08])box(.16,3.1,.3,x,1.55,6.85,iron);box(2.3,.17,.3,0,3.1,6.85,iron);
sign('DISCOVERY CENTER',8,.75,0,4.6,6.83);
for(const x of [-14.85,14.85]){box(.12,.85,24,x,.45,19,stain);for(let z=8;z<31;z+=3)box(.16,8,.12,x,4,z,0x686d63);box(.6,.2,25,x,8.1,19,0x575c56);}
for(let x=-14;x<15;x+=3){box(.14,7.5,.14,x,3.75,31.18,0x686d63);box(.7,1.2,.035,x,.62,31.21,stain);}
// The barred gate now opens into a roofed passage and a sealed, lightless chamber.
const yardGateHinge=new THREE.Group();yardGateHinge.position.set(-2,0,31.2);scene.add(yardGateHinge);
for(let x=.12;x<4;x+=.23)box(.055,3.3,.09,x,1.65,0,iron,yardGateHinge);for(const y of [.12,1.6,3.25])box(4,.08,.12,2,y,0,iron,yardGateHinge);
box(.12,3.35,.16,2,1.67,-.08,iron,yardGateHinge);box(.3,.36,.13,2.18,1.35,-.19,0x9c8353,yardGateHinge);const shackle=new THREE.Mesh(new THREE.TorusGeometry(.12,.028,8,16,Math.PI),mat(iron));shackle.position.set(2.18,1.57,-.19);yardGateHinge.add(shackle);
box(.2,3.5,3,-2,1.75,33,concrete);box(.2,3.5,3,2,1.75,33,concrete);box(4,.2,3,0,3.5,33,concrete);
// Beyond the outer gate: a long, roofed intake corridor flanked by locked specimen tubes.
const rust=0x57483b,oxide=0x76503a,pipeColor=0x383e3a;
const prisonStart=37,prisonEnd=107,prisonLength=prisonEnd-prisonStart,prisonCenter=(prisonStart+prisonEnd)/2;
box(24,.24,prisonLength,0,-.12,prisonCenter,0x302f2b);
box(.3,7.2,prisonLength,-12,3.6,prisonCenter,rust);box(.3,7.2,prisonLength,12,3.6,prisonCenter,rust);box(24,.28,prisonLength,0,7.2,prisonCenter,0x20221f);
// The entrance and far bulkhead have one narrow central opening.
box(10,7,.3,-7,3.5,prisonStart,rust);box(10,7,.3,7,3.5,prisonStart,rust);box(4,1.3,.3,0,6.35,prisonStart,rust);
box(9,7,.3,-7.5,3.5,prisonEnd,rust);box(9,7,.3,7.5,3.5,prisonEnd,rust);box(6,1.3,.3,0,6.35,prisonEnd,rust);
let rustSeed=64021;function rustRand(){rustSeed=(rustSeed*1664525+1013904223)>>>0;return rustSeed/4294967296;}
function prisonDetail(mesh){mesh.userData.noPlayerCollision=true;return mesh;}
// Eight enormous vertical holding tubes run down each wall, all visibly sealed.
let tubeNumber=0;
for(const z of [43,51,59,67,75,83,91,99])for(const side of [-1,1]){
 const x=side*8.65, glass=new THREE.Mesh(new THREE.CylinderGeometry(1.98,2.08,6.45,32,1,true),new THREE.MeshStandardMaterial({color:side<0?0x46504b:0x4a514b,roughness:.78,metalness:.2,side:THREE.DoubleSide,transparent:true,opacity:.22,depthWrite:false}));
 glass.position.set(x,3.28,z);scene.add(prisonDetail(glass));
 for(const y of [.18,.5,1.08,5.45,6.18,6.38]){const ring=new THREE.Mesh(new THREE.TorusGeometry(y===.18||y===6.38?2.02:1.99,.1,8,32),mat(y===.5||y===6.18?oxide:pipeColor));ring.rotation.x=Math.PI/2;ring.position.set(x,y,z);scene.add(prisonDetail(ring));}
 prisonDetail(cylinder(1.99,.18,x,.1,z,pipeColor));prisonDetail(cylinder(1.91,.15,x,6.43,z,oxide));
 // Reinforced hatch, bars, and a lock face the center aisle.
 const faceX=x-side*1.94;prisonDetail(box(.12,2.45,.98,faceX,1.55,z,oxide));
 prisonDetail(box(.16,.14,1.05,faceX,2.82,z,pipeColor));prisonDetail(box(.16,.14,1.05,faceX,.31,z,pipeColor));
 for(const dz of [-.31,0,.31])prisonDetail(box(.1,1.92,.075,faceX,1.56,z+dz,pipeColor));
 const padlock=new THREE.Mesh(new THREE.TorusGeometry(.15,.045,8,16,Math.PI),mat(0x927141));padlock.position.set(faceX,1.22,z+.48);padlock.rotation.y=side<0?Math.PI/2:-Math.PI/2;scene.add(prisonDetail(padlock));
 const label=sign(String(++tubeNumber).padStart(2,'0')+'  /  HOLD',1.22,.23,faceX-side*.13,2.53,z,'#292b28','#988a6d');label.rotation.y=side<0?Math.PI/2:-Math.PI/2;
 // One tube holds a dark human-shaped outline, visible only when the beam catches it.
 if(tubeNumber===6){const shadow=new THREE.Group();shadow.position.set(x,0,z);scene.add(prisonDetail(shadow));const dark=new THREE.MeshStandardMaterial({color:0x090b0a,roughness:1});const head=new THREE.Mesh(new THREE.SphereGeometry(.27,16,12),dark);head.position.set(-side*.12,4.92,0);shadow.add(head);const torso=new THREE.Mesh(new THREE.CylinderGeometry(.3,.43,1.45,12),dark);torso.position.set(-side*.12,3.95,0);shadow.add(torso);for(const dz of [-.42,.42]){const arm=new THREE.Mesh(new THREE.CylinderGeometry(.09,.12,1.2,8),dark);arm.position.set(-side*.12,3.96,dz);arm.rotation.x=dz>0?-.28:.28;shadow.add(arm);}for(const dz of [-.19,.19]){const leg=new THREE.Mesh(new THREE.CylinderGeometry(.12,.08,1.1,8),dark);leg.position.set(-side*.12,2.85,dz);shadow.add(leg);}}
}
// Blood decals use irregular splashes and narrow dried drips on separate scene geometry.
const bloodMaterials=[0x4a0710,0x37050b,0x5b0b13].map(color=>new THREE.MeshStandardMaterial({color,emissive:0x100005,roughness:1,transparent:true,opacity:.94,depthWrite:false,side:THREE.DoubleSide}));
let bloodSeed=48831;function bloodRand(){bloodSeed=(bloodSeed*1664525+1013904223)>>>0;return bloodSeed/4294967296;}
function bloodSplat(parent,x,y,z,rx,ry,width,height,drips=false){const group=new THREE.Group();group.position.set(x,y,z);group.rotation.set(rx,ry,0);group.scale.set(width/2,height/2,1);const material=bloodMaterials[Math.floor(bloodRand()*bloodMaterials.length)],shape=new THREE.Shape();for(let i=0;i<24;i++){const a=i*Math.PI/12;let r=.67+bloodRand()*.47;if(i%6===0)r+=.18;if(drips&&i>=16&&i<=21)r=i===18||i===19?1.75+bloodRand()*.35:Math.max(r,1.08+bloodRand()*.2);const px=Math.cos(a)*r,py=Math.sin(a)*r;if(i===0)shape.moveTo(px,py);else shape.lineTo(px,py);}shape.closePath();const stain=new THREE.Mesh(new THREE.ShapeGeometry(shape,1),material);stain.position.z=.002;group.add(stain);group.traverse(o=>{o.userData.noPlayerCollision=true;});parent.add(group);return group;}
bloodSplat(monsterHead,.42,.02,.71,0,0,.18,.34,true);bloodSplat(monsterBody,.12,3.42,.34,0,0,.3,.68,true);
// Long dried smears along the passage walls, floor, ceiling and sealed tube glass.
for(const side of [-1,1])for(let i=0;i<18;i++){const z=prisonStart+3+bloodRand()*(prisonLength-6),y=.25+bloodRand()*5.9;bloodSplat(scene,side*11.846,y,z,0,side<0?Math.PI/2:-Math.PI/2,.7+bloodRand()*1.2,.8+bloodRand()*1.5,true);}
for(let i=0;i<30;i++){const x=-5.7+bloodRand()*11.4,z=prisonStart+2+bloodRand()*(prisonLength-4);bloodSplat(scene,x,.006,z,-Math.PI/2,0,.45+bloodRand()*1.25,.45+bloodRand()*1.55,false);}
for(let i=0;i<10;i++){const x=-10+bloodRand()*20,z=prisonStart+3+bloodRand()*(prisonLength-6);bloodSplat(scene,x,7.055,z,Math.PI/2,0,.5+bloodRand()*.9,.5+bloodRand()*1.1,false);}
for(const z of [43,51,59,67,75,83,91,99])for(const side of [-1,1]){const y=.55+bloodRand()*2.3,dz=(bloodRand()-.5)*1.1;bloodSplat(scene,side*6.62,y,z+dz,0,side<0?Math.PI/2:-Math.PI/2,.36+bloodRand()*.32,.65+bloodRand()*.75,true);}
// Dead steam lines and drainage grooves lengthen the perspective without adding light.
for(const x of [-10.8,-10.35,10.35,10.8]){const pipe=new THREE.Mesh(new THREE.CylinderGeometry(.1,.1,prisonLength,10),mat(pipeColor));pipe.rotation.x=Math.PI/2;pipe.position.set(x,6.88,prisonCenter);scene.add(prisonDetail(pipe));for(const z of [45,61,77,93,105])prisonDetail(box(.34,.34,.34,x,6.88,z,oxide));}
for(let z=prisonStart+2;z<prisonEnd-1;z+=2.5)prisonDetail(box(2.3,.025,.045,0,.012,z,0x4d4940));
for(let i=0;i<86;i++){const side=i%2?1:-1,z=prisonStart+2+rustRand()*(prisonLength-4),y=.5+rustRand()*5.8,w=.25+rustRand()*1.1,h=.3+rustRand()*1.4;prisonDetail(box(.025,h,w,side*11.83,y,z,[0x493a31,0x684a36,0x373b36][i%3]));}
// A single caged sodium fixture burns at the far end. Every other housing is dead.
box(.75,.14,.7,0,6.96,101,0x262824);box(.16,.56,.16,0,6.61,101,oxide);for(const x of [-.3,.3])box(.035,.45,.035,x,6.25,101,pipeColor);const prisonBulb=sphere(.19,0,6.14,101,0xd69a54);prisonBulb.material.emissive.setHex(0x704317);const prisonLight=new THREE.PointLight(0xffbd72,0,29,2);prisonLight.position.set(0,6.1,101);scene.add(prisonLight);
sign('INTAKE  /  NO RELEASE',5.4,.38,0,3.15,37.23,'#302c27','#ad7956');
// The chase spills through the bulkhead into a second, wider specimen lab.
const labZ=127,labFront=111,labBack=143,labLength=labBack-labFront,labCenter=(labFront+labBack)/2;
box(24,.2,labLength,0,-.12,labCenter,0x343732);box(.25,7,labLength,-12,3.5,labCenter,rust);box(.25,7,labLength,12,3.5,labCenter,rust);box(24,7,.25,0,3.5,labBack,rust);box(24,.25,labLength,0,7.1,labCenter,0x252825);
box(8,7,.28,-8,3.5,labFront,rust);box(8,7,.28,8,3.5,labFront,rust);box(8,1.4,.28,0,6.3,labFront,rust);
const labSign=sign('SPECIMEN LAB  /  B',5,.45,0,2.5,142.82,'#4a4136','#d1b67c');labSign.rotation.y=Math.PI;
const labTubeParts=[];function labPart(mesh){mesh.userData.noPlayerCollision=true;labTubeParts.push(mesh);return mesh;}
for(const x of [-7,0,7]){const glass=new THREE.Mesh(new THREE.CylinderGeometry(1.72,1.82,6.4,24,1,true),new THREE.MeshStandardMaterial({color:x===0?0x71817a:0x4a554f,roughness:1,metalness:.18,side:THREE.DoubleSide,transparent:x===0,opacity:x===0?.24:1,depthWrite:x!==0}));glass.position.set(x,3.2,labZ);scene.add(labPart(glass));for(const y of [.18,1.05,5.4,6.2]){const ring=new THREE.Mesh(new THREE.TorusGeometry(1.78,.12,8,24),mat(oxide));ring.rotation.x=Math.PI/2;ring.position.set(x,y,labZ);scene.add(labPart(ring));}labPart(cylinder(1.75,.18,x,.08,labZ,pipeColor));labPart(cylinder(1.65,.18,x,6.34,labZ,oxide));if(x!==0){const hatch=box(.92,2.35,.08,x,.95,125.34,oxide);labPart(hatch);for(const dx of [-.28,0,.28])labPart(box(.045,1.15,.045,x+dx,1.03,125.28,pipeColor));const lock=new THREE.Mesh(new THREE.TorusGeometry(.11,.035,8,14,Math.PI),mat(0x9a7441));lock.position.set(x+.48,1.49,125.24);scene.add(labPart(lock));}}
// Blood carries over the bulkheads and across the low ceiling of the second chamber.
for(let i=0;i<11;i++){const x=-10.5+bloodRand()*21,y=.3+bloodRand()*5.8;bloodSplat(scene,x,y,142.866,0,Math.PI,.75+bloodRand()*1.1,.7+bloodRand()*1.4,true);}
for(let i=0;i<8;i++){const x=-10+bloodRand()*20,z=labFront+1+bloodRand()*(labLength-2);bloodSplat(scene,x,6.972,z,Math.PI/2,0,.55+bloodRand()*.8,.55+bloodRand()*.9,false);}
for(let i=0;i<5;i++){const x=-2+bloodRand()*4,y=.4+bloodRand()*5.5;bloodSplat(scene,x,y,111.145,0,0,.7+bloodRand()*.9,.7+bloodRand()*1.1,true);}
// More stains inside the specimen lab, especially around the three sealed tanks.
for(let i=0;i<18;i++){const x=-10.8+bloodRand()*21.6,z=labFront+1+bloodRand()*(labLength-2);bloodSplat(scene,x,-.018,z,-Math.PI/2,0,.45+bloodRand()*1.2,.45+bloodRand()*1.25,false);}
for(const side of [-1,1])for(let i=0;i<8;i++){const z=labFront+2+bloodRand()*(labLength-4),y=.35+bloodRand()*5.7;bloodSplat(scene,side*11.846,y,z,0,side<0?Math.PI/2:-Math.PI/2,.7+bloodRand()*1.1,.8+bloodRand()*1.25,true);}
for(const x of [-7,0,7])if(x!==0)for(let i=0;i<3;i++){const side=x<0?-1:1;bloodSplat(scene,x-side*1.66,.5+bloodRand()*2.5,labZ+(bloodRand()-.5)*1.25,0,side<0?Math.PI/2:-Math.PI/2,.34+bloodRand()*.25,.6+bloodRand()*.5,true);}
const labTubeHatch=new THREE.Group();labTubeHatch.position.set(-.5,0,125.34);scene.add(labTubeHatch);labPart(box(1,2.2,.12,.5,1.1,0,oxide,labTubeHatch));labPart(box(.16,.42,.16,1.05,1.16,-.08,0x9a7441,labTubeHatch));labTubeHatch.rotation.y=-Math.PI/2;
const labLight=new THREE.PointLight(0xc89d63,0,18,2);labLight.position.set(-7,6.2,134);scene.add(labLight);const labAlarm=new THREE.PointLight(0x8e3027,0,11,2);labAlarm.position.set(7,2.4,114);scene.add(labAlarm);
// Covered walkway: repeated columns and a low ceiling create pockets of occlusion.
box(3.2,.25,21,-13,3.1,18,0x626e68);for(let z=9;z<=29;z+=4)box(.22,3,.22,-11.6,1.5,z,teal);
// Playground, with muted remnants of its original colors.
box(10,.12,9,-4,.06,20,0x4d6661);box(5,.22,4,-4,.18,22,wood);box(4.6,.05,3.6,-4,.31,22,0xa99c78);
function pole(a,b,r,c){const delta=new THREE.Vector3().subVectors(b,a),m=new THREE.Mesh(new THREE.CylinderGeometry(r,r,delta.length(),10),mat(c));m.position.copy(a).add(b).multiplyScalar(.5);m.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),delta.normalize());m.castShadow=true;scene.add(m);return m;}
for(const x of [-7,-1])for(const dz of [-1.1,1.1])pole(new THREE.Vector3(x,0,15+dz),new THREE.Vector3(x,3.5,15),.065,red);
pole(new THREE.Vector3(-7,3.5,15),new THREE.Vector3(-1,3.5,15),.075,red);
for(const x of [-5.4,-2.7]){for(const dx of [-.36,.36])pole(new THREE.Vector3(x+dx,3.45,15),new THREE.Vector3(x+dx,.7,15),.018,iron);box(.9,.09,.45,x,.66,15,0x3d4947);}
box(2,1.3,2,5,.65,21,teal);const outdoorSlide=box(1,.12,3.1,5,.75,23,blue);outdoorSlide.rotation.x=.4;for(let i=0;i<4;i++)box(.8,.32*(i+1),.4,5,.16*(i+1),19.3+i*.4,wood);
for(const z of [12,26]){box(2.5,.15,.65,-13,.52,z,wood);box(2.5,.7,.1,-13,.9,z-.28,wood);for(const x of [-14,-12])box(.1,.5,.5,x,.25,z,iron);}
// Narrow service passage: the courtyard's far corner is concealed behind a tall divider.
box(.25,4.3,12,11.5,2.15,22.2,concrete);box(1.1,4.3,.25,12.05,2.15,16.2,concrete);box(1.1,4.3,.25,14.45,2.15,16.2,concrete);box(2.5,2.4,1.3,13.2,1.2,28.8,0x586862);
box(.12,2.4,5,14.73,1.5,23,0x535b57);for(let z=21;z<25.5;z+=.2)box(.17,.04,.05,14.58,1.6,z,iron);
for(const x of [12.2,13.5]){pole(new THREE.Vector3(x,.4,30.9),new THREE.Vector3(x,6.5,30.9),.07,iron);}
// Drains, leaf litter, and worn hopscotch marks keep the ground from feeling empty.
for(const z of [11,23,29]){box(.6,.035,1,-9,.025,z,iron);for(let i=0;i<6;i++)box(.5,.02,.04,-9,.05,z-.4+i*.15,0x92978a);}
for(let i=0;i<7;i++){const tile=box(.7,.018,.7,2+(i%2)*.8,.04,11+i*.82,0xaaa58a);}
for(let i=0;i<45;i++){const x=-14+(i*7.37%28),z=8+(i*3.91%23);const leaf=box(.1,.015,.19,x,.04,z,0x7d6a42);leaf.rotation.y=i*1.7;}
const yardLamps=[];for(const [x,z] of [[0,7.2],[-14,13],[-14,27],[0,30.7]]){box(.65,.18,.25,x,3.8,z,0xc4b888);const lamp=new THREE.PointLight(0xf2cc83,24,14,2);lamp.position.set(x,3.6,z);scene.add(lamp);yardLamps.push(lamp);}
const hemi=new THREE.HemisphereLight(0xffefd0,0x5d7270,2.6);scene.add(hemi);const sun=new THREE.DirectionalLight(0xffe2ad,3);sun.position.set(-3,35,20);sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);Object.assign(sun.shadow.camera,{left:-40,right:40,top:40,bottom:-40});scene.add(sun);const emergency=new THREE.PointLight(0xe0aa69,0,15,2);emergency.position.set(3,2.6,-8);scene.add(emergency);
for(const x of [-4,3])for(const z of [-3,3]){box(2.3,.06,.65,x,4.35,z,0xf0e8d4);}
