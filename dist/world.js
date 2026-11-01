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
box(5.8,.2,4.8,3,-.1,-9,0xaaa28f);box(.18,3.6,4.8,.1,1.7,-9,cream);box(.18,3.6,4.8,5.9,1.7,-9,cream);box(5.8,3.6,.18,3,1.7,-11.4,cream);
box(2.6,.28,.8,3,.55,-10.7,blue);for(const x of [2,4])box(.12,.5,.6,x,.2,-10.7,wood);box(2.6,.8,.14,3,1,-11.04,blue);
sign('PLEASE WAIT HERE',2.5,.5,3,2.35,-11.28);
// A physical tabletop toy occupies the wait without introducing a screen.
box(2.7,.16,2.7,3,.84,-8.65,wood);for(const x of [1.9,4.1])for(const z of [-9.75,-7.55])box(.12,.8,.12,x,.4,z,wood);
const mazeRows=['#######','#.#...#','#.#.#.#','#...#.#','#####.#','#.....#','#######'];
const mazeOrigin={x:1.92,z:-9.73},cell=.36;box(2.55,.04,2.55,3,.94,-8.65,cream);
for(let row=0;row<7;row++)for(let col=0;col<7;col++)if(mazeRows[row][col]==='#')box(.34,.16,.34,mazeOrigin.x+col*cell,1.03,mazeOrigin.z+row*cell,teal);
const goal=cylinder(.13,.018,mazeOrigin.x+5*cell,.975,mazeOrigin.z+5*cell,0x509052);
const marble=sphere(.105,mazeOrigin.x+cell,1.07,mazeOrigin.z+cell,yellow);let marbleCell=[1,1],moves=0,won=false;
// Reading nook, low bookshelf, cushions, and a wooden shape sorter.
box(.6,.8,2.2,.55,.4,-9.7,wood);for(let i=0;i<7;i++)box(.43,.47,.15,.57,.65,-10.5+i*.25,[blue,red,yellow,teal][i%4]);
box(1.1,.05,1.2,4.9,.04,-8,teal);sphere(.43,4.9,.28,-8.2,red).scale.y=.55;
box(.65,.45,.65,4.85,.27,-10.6,wood);cylinder(.12,.08,4.7,.54,-10.6,blue);box(.2,.08,.2,5,.54,-10.6,red);
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
for(const x of [-.25,.25]){const eye=sphere(.068,x,.16,Math.sqrt(.78*.78-x*x-.16*.16)+.004,0x28251f,verity);eye.scale.y=1.45;eye.scale.z=.35;}
const pts=[];for(let i=0;i<=40;i++){const x=-.35+i*.7/40,y=-.13-.23*(1-(x/.35)**2),z=Math.sqrt(.78*.78-x*x-y*y)+.008;pts.push(new THREE.Vector3(x,y,z));}const smile=new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts),40,.027,8,false),mat(0x28251f));verity.add(smile);
// Expand the original room into a connected, roofless facility, without scaling its furniture.
const remove=[];scene.traverse(o=>{if(o.isMesh&&o.geometry.type==='BoxGeometry'&&Math.abs(o.position.x)>=7.6&&Math.abs(o.position.x)<=8.1&&o.geometry.parameters.depth>=12.9)remove.push(o);});remove.forEach(o=>scene.remove(o));
box(44,.28,34,0,-.32,-9.5,0xa09b87);
box(6,.04,20,-8.7,-.05,-3.5,0xbcb69c);box(6,.04,20,8.7,-.05,-3.5,0xbcb69c);box(44,.04,3,0,-.05,-12,0xbcb69c);
// Low cutaway partitions reveal the many rooms; openings are actual gaps.
function wallX(x,z1,z2,door){const h=1.9;if(door===undefined){box(.18,h,z2-z1,x,h/2,z1+(z2-z1)/2,cream);return;}if(door-1.1>z1)box(.18,h,door-1.1-z1,x,h/2,(z1+door-1.1)/2,cream);if(door+1.1<z2)box(.18,h,z2-door-1.1,x,h/2,(z2+door+1.1)/2,cream);}
function wallZ(z,x1,x2){box(x2-x1,1.9,.18,(x1+x2)/2,.95,z,cream);}
const rooms=[];
function room(name,x,z,w,d,type,color){box(w-.12,.04,d-.12,x,-.02,z,color);wallX(x-w/2,z-d/2,z+d/2,x>0?z:undefined);wallX(x+w/2,z-d/2,z+d/2,x<0?z:undefined);wallZ(z-d/2,x-w/2,x+w/2);wallZ(z+d/2,x-w/2,x+w/2);const label=sign(name,w*.8,.8,x,.09,z+d/2-1);label.rotation.x=-Math.PI/2;rooms.push({name,x,z,w,d,type});return rooms[rooms.length-1];}
room('ART STUDIO',-16.5,1,11,11,'art',0xd8baa1);room('READING ROOM',-16.5,-10,11,11,'library',0xc4c8a4);room('MUSIC ROOM',-16.5,-21,11,11,'music',0xb4bdcb);
room('CAFETERIA',16.5,1,11,11,'cafe',0xd1c4a8);room('CLASSROOM',16.5,-10,11,11,'class',0xb6c6b9);room('SOFT PLAY',16.5,-21,11,11,'soft',0xd4b49c);
// Rear wing, reached along the long cross corridor.
for(const [name,x,type,color] of [['COSTUME ROOM',-7.5,'costume',0xcbbbc7],['NAP ROOM',-2.5,'nap',0xb3bdca],['STAFF ROOM',2.5,'staff',0xc4c0aa],['STORAGE',7.5,'storage',0xb8af9e]]){const r=room(name,x,-20.5,5,12,type,color); }
// Replace front partitions of rear rooms with real doors to the cross corridor.
const frontWalls=scene.children.filter(o=>o.isMesh&&o.geometry.type==='BoxGeometry'&&o.position.z===-14.5&&o.geometry.parameters.width===5);frontWalls.forEach(o=>{const x=o.position.x;scene.remove(o);box(1.4,1.9,.18,x-1.8,.95,-14.5,cream);box(1.4,1.9,.18,x+1.8,.95,-14.5,cream);});
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
room('MAINTENANCE',7,-8.7,2,4,'utility',0xb9b5a5);box(1.2,1.7,.4,7,.85,-10.1,0x697b7c);
// Broad wall openings connect the main hall to both side wings.
for(const x of [-8,8]){wallX(x,-6.5,6.5,1);}
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
// Locked gate opens only into a short, roofed service recess with a second solid door.
for(let x=-1.85;x<=1.9;x+=.23)box(.055,3.3,.09,x,1.65,31.2,iron);for(const y of [.12,1.6,3.25])box(4,.08,.12,0,y,31.2,iron);
box(.12,3.35,.16,0,1.67,31.12,iron);box(.3,.36,.13,.18,1.35,31.01,0x9c8353);const shackle=new THREE.Mesh(new THREE.TorusGeometry(.12,.028,8,16,Math.PI),mat(iron));shackle.position.set(.18,1.57,31.01);scene.add(shackle);
box(4,3.5,.2,0,1.75,34.5,0x444b47);box(.2,3.5,3,-2,1.75,33,concrete);box(.2,3.5,3,2,1.75,33,concrete);box(4,.2,3,0,3.5,33,concrete);
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
