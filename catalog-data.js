/* Datos reutilizables del catálogo. Cada ficha referencia ejercicios por ID. */
(function(root){
const exerciseLibrary=[];
const byId=new Map();
// Conserva los identificadores de rutinas ya guardadas, pero muestra nombres concretos.
const aliases={
 'Máquina inclinada':'Press de pecho inclinado en máquina',
 'Máquina abdominal':'Crunch abdominal en máquina',
 'Chest Press':'Press de pecho en máquina',
 'Shoulder Press':'Press de hombros en máquina',
 'Extensión máquina':'Extensión de tríceps en máquina',
 'Prensa':'Prensa de piernas',
 'Remo':'Remo con mancuerna',
 'Remo máquina':'Remo sentado en máquina',
 'Remo en máquina':'Remo sentado en máquina',
 'Remo sentado':'Remo sentado en polea',
 'Press en Smith':'Press de pecho en máquina Smith',
 'Press inclinado':'Press de pecho inclinado',
 'Press con mancuernas':'Press de pecho con mancuernas',
 'Curl máquina':'Curl de bíceps en máquina',
 'Curl polea':'Curl de bíceps en polea',
 'Curl mancuerna':'Curl de bíceps con mancuerna',
 'Extensión sobre cabeza':'Extensión de tríceps sobre la cabeza',
 'Extensión de tríceps sobre cabeza':'Extensión de tríceps sobre la cabeza',
 'Extensión tríceps':'Extensión de tríceps en polea alta',
 'Triceps Pushdown':'Extensión de tríceps en polea alta',
 'Pushdown tríceps':'Extensión de tríceps en polea alta',
 'Pushdown':'Extensión de tríceps en polea alta',
 'Abductor máquina':'Abducción de cadera en máquina',
 'Abductores':'Abducción de cadera en máquina',
 'Pullover polea':'Pullover en polea alta',
 'Curl femoral':'Curl femoral tumbado en máquina',
 'Extensión de piernas':'Extensión de cuádriceps en máquina',
 'Extensión de cuádriceps':'Extensión de cuádriceps en máquina',
 'Gemelos':'Elevación de talones en máquina',
 'Calf Machine':'Elevación de talones en máquina',
 'Gemelos de pie':'Elevación de talones de pie',
 'Elevación de gemelos':'Elevación de talones de pie',
 'Elevaciones de gemelos':'Elevación de talones de pie',
 'Calf Raise':'Elevación de talones de pie',
 'Calf Raises':'Elevación de talones de pie',
 'Gemelos unilateral':'Elevación de talones a una pierna',
 'Gemelos sentado':'Elevación de talones sentado en máquina',
 'Hip Thrust máquina':'Hip Thrust en máquina',
 'Gemelos en prensa':'Elevación de talones en prensa',
 'Elevación lateral':'Elevaciones laterales',
 'Elevaciones con mancuernas':'Elevaciones laterales con mancuernas',
 'Puente de glúteo':'Puente de glúteos'
};
const canonical=name=>aliases[name]||name;
const rawSlug=name=>name.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const slug=name=>rawSlug(canonical(name));
const advanced=new Set(['Dominada lastrada','Handstand Push-Up','Pistol Squat','Nordic Curl','Ab Wheel','Hanging Leg Raise']);
const beginner=new Set(['Sentadilla','Flexiones','Flexión inclinada','Puente de glúteos','Glute Bridge','Dead Bug','Bird Dog','Plancha','Gemelos de pie','Wall Sit']);
const equipmentFor=name=>{
 if(/mochila/i.test(name))return 'Mochila';
 if(/banda/i.test(name))return 'Banda elástica';
 if(/mancuerna|goblet|farmer carry/i.test(name))return 'Mancuernas';
 if(/pallof/i.test(name))return 'Banda o polea';
 if(/polea|pushdown|face pull|pullover/i.test(name))return 'Polea';
 if(/smith|máquina|machine|chest press|shoulder press|hack squat|jalón|prensa|pec deck|high row|curl femoral|extensión de cuádriceps|extensión de piernas|abductor|abducción de cadera/i.test(name))return 'Máquina';
 if(/barra/i.test(name))return 'Barra';
 if(/^Remo$|^Remo sentado$|^Remo con agarre amplio$/.test(name))return 'Máquina o mancuerna';
 if(/hip thrust|press inclinado|curl de bíceps|elevaci[oó]n lateral|elevaciones laterales/i.test(name))return 'Peso corporal o equipo';
 return 'Peso corporal';
};
function register(name,muscle='Cuerpo completo'){
 name=canonical(name);
 const id=slug(name);if(byId.has(id))return id;
 const equipment=equipmentFor(name),location=/Máquina|Polea|Barra/.test(equipment)?'Gimnasio':equipment==='Peso corporal'||equipment==='Mochila'?'Casa':'Ambos';
 const difficulty=advanced.has(name)?'Avanzado':beginner.has(name)?'Principiante':'Intermedio';
 const type=/plancha|dead bug|bird dog|crunch|pallof|hollow|ab wheel/i.test(name)?'Core':/shuffle|desplazamiento|carrera|aceleraci[oó]n|shadow boxing|a-march/i.test(name)?'Cardio':/salto|pogo/i.test(name)?'Potencia':'Fuerza';
 const item={id,name,primaryMuscle:muscle,secondaryMuscles:[],difficulty,location,equipment,type,alternatives:[]};
 byId.set(id,item);exerciseLibrary.push(item);return id;
}
const groups={
 'Pecho':'Flexión inclinada|Flexión normal|Flexión declinada|Flexión diamante|Chest Press|Pec Deck|Press con mancuernas|Press inclinado|Fondos',
 'Espalda':'Remo con mochila|Superman|Remo invertido|Dominada asistida|Jalón al pecho|Remo sentado|High Row|Pullover polea|Dominada|Dominada lastrada',
 'Hombros':'Pike Push-Up|Shoulder Press|Press de hombros con mancuernas|Elevaciones laterales|Elevaciones laterales en polea|Reverse Pec Deck|Face Pull|Handstand Push-Up',
 'Bíceps':'Curl con mochila|Curl máquina|Curl polea|Curl mancuerna|Preacher Curl|Hammer Curl|Dominada supina',
 'Tríceps':'Flexión cerrada|Pushdown|Extensión máquina|Extensión sobre cabeza',
 'Cuádriceps':'Sentadilla|Zancada|Split Squat|Bulgarian Split Squat|Prensa|Hack Squat|Extensión de piernas|Smith Squat|Pistol Squat',
 'Isquiotibiales':'Puente de glúteo|Peso muerto rumano con mochila|Curl femoral|Curl femoral sentado|Peso muerto rumano con mancuernas|Nordic Curl',
 'Glúteos':'Glute Bridge|Hip Thrust|Zancadas|Abductor máquina|Patada en polea|Hip Thrust máquina',
 'Gemelos':'Gemelos de pie|Gemelos unilateral|Calf Machine|Gemelos sentado|Gemelos en prensa',
 'Core':'Dead Bug|Bird Dog|Plancha|Side Plank|Reverse Crunch|Mountain Climbers|Hollow Body Hold|Crunch polea|Pallof Press|Ab Wheel|Hanging Knee Raise|Hanging Leg Raise'
};
Object.entries(groups).forEach(([muscle,names])=>names.split('|').forEach(name=>register(name,muscle)));
const alternatives={
 'Prensa de piernas':['Hack Squat','Smith Squat','Goblet Squat'],
 'Chest Press':['Press con mancuernas','Press en Smith','Flexiones'],
 'Jalón al pecho':['Dominada asistida','Jalón unilateral'],
 'Remo sentado':['Remo en máquina','Remo con mancuerna'],
 'Curl femoral':['Curl femoral sentado','Peso muerto rumano con mancuernas'],
 'Shoulder Press':['Press de hombros con mancuernas','Press de hombros en Smith'],
 'Elevaciones laterales':['Elevaciones laterales en polea','Elevaciones con mancuernas'],
 'Gemelos':['Gemelos en prensa','Gemelos de pie'],
 'Crunch en polea':['Máquina abdominal','Reverse Crunch'],
 'Press inclinado':['Máquina inclinada','Press con mancuernas'],
 'Reverse Pec Deck':['Face Pull'],
 'Extensión de cuádriceps':['Prensa'],
 'Hip Thrust':['Hip Thrust máquina','Glute Bridge'],
 'Abductores':['Patada en polea'],
 'Triceps Pushdown':['Extensión máquina'],
 'Extensión de tríceps sobre cabeza':['Extensión sobre cabeza'],
 'Curl de bíceps':['Curl polea'],
 'Hammer Curl':['Curl mancuerna'],
 'Hack Squat':['Prensa']
};
const step=(name,sets,amount,muscle,mode='reps',rest=45,range='',alternates=null)=>({id:register(name,muscle),sets,amount,mode,rest,range:range||String(amount),alternates:alternates||alternatives[name]||[]});
const day=(name,items)=>({name,exercises:items});
const presetRoutines=[
 {id:'home-a',name:'Full Body en casa A',category:'Casa',description:'Cuerpo completo · mochila opcional',level:'Principiante / Intermedio',duration:'35–45 min',equipment:'Peso corporal · mochila opcional',days:[day('Día 1',[
 step('Sentadilla',3,12,'Cuádriceps','reps',45,'12–20'),step('Flexiones',3,6,'Pecho','reps',45,'6–15'),step('Zancadas hacia atrás',3,8,'Cuádriceps','reps',45,'8–12 por pierna'),step('Remo con mochila',3,10,'Espalda','reps',45,'10–15'),step('Puente de glúteos',3,15,'Glúteos','reps',40,'15–20'),step('Pike Push-Up',2,6,'Hombros','reps',45,'6–12'),step('Elevaciones de gemelos',3,15,'Gemelos','reps',35,'15–25'),step('Dead Bug',3,8,'Core','reps',35,'8–12 por lado')])]},
 {id:'home-b',name:'Full Body en casa B',category:'Casa',description:'Cuerpo completo · estabilidad',level:'Principiante / Intermedio',duration:'35–45 min',equipment:'Peso corporal · mochila opcional',days:[day('Día 1',[
 step('Bulgarian Split Squat',3,8,'Cuádriceps','reps',50,'8–12 por pierna'),step('Flexiones',3,8,'Pecho','reps',45,'8–15'),step('Peso muerto rumano con mochila',3,10,'Isquiotibiales','reps',50,'10–15'),step('Remo inclinado con mochila',3,10,'Espalda','reps',45,'10–15'),step('Glute Bridge unilateral',3,8,'Glúteos','reps',40,'8–15 por pierna'),step('Elevaciones laterales con botellas o mochila',3,12,'Hombros','reps',35,'12–20'),step('Plancha lateral',3,20,'Core','time',35,'20–40 s por lado'),step('Mountain Climbers controlados',3,20,'Core','reps',35,'20–30')])]},
 {id:'home-legs',name:'Core + Piernas',category:'Casa',description:'Piernas y estabilidad del tronco',level:'Principiante / Intermedio',duration:'30–40 min',equipment:'Peso corporal · mochila opcional',days:[day('Día 1',[
 step('Sentadilla',3,15,'Cuádriceps','reps',45,'15–20'),step('Zancada hacia atrás',3,10,'Cuádriceps','reps',45,'10 por lado'),step('Bulgarian Split Squat',3,8,'Cuádriceps','reps',50,'8–12 por lado'),step('Hip Thrust',3,12,'Glúteos','reps',45,'12–20'),step('Peso muerto rumano con mochila',3,10,'Isquiotibiales','reps',45,'10–15'),step('Elevación de gemelos',3,20,'Gemelos','reps',35,'20'),step('Dead Bug',3,10,'Core','reps',35,'10 por lado'),step('Plancha',3,30,'Core','time',35,'30–60 s'),step('Plancha lateral',3,20,'Core','time',35,'20–45 s por lado'),step('Bird Dog',3,10,'Core','reps',35,'10 por lado'),step('Reverse Crunch',3,10,'Core','reps',35,'10–15')])]},
 {id:'gym-full',name:'Full Body - Máquinas',category:'Gimnasio',description:'Cuerpo completo · máquinas y poleas',level:'Principiante / Intermedio',duration:'45–60 min',equipment:'Máquinas · poleas',days:[day('Día 1',[
 step('Prensa de piernas',3,8,'Cuádriceps','reps',60,'8–12'),step('Chest Press',3,8,'Pecho','reps',60,'8–12'),step('Jalón al pecho',3,8,'Espalda','reps',60,'8–12'),step('Remo sentado',3,8,'Espalda','reps',60,'8–12'),step('Curl femoral',3,10,'Isquiotibiales','reps',50,'10–15'),step('Shoulder Press',2,8,'Hombros','reps',50,'8–12'),step('Elevaciones laterales',3,12,'Hombros','reps',40,'12–20'),step('Gemelos',3,12,'Gemelos','reps',40,'12–20'),step('Crunch en polea',3,10,'Core','reps',40,'10–15')])]},
 {id:'gym-ppl',name:'Push Pull Legs',category:'Gimnasio',description:'Tres días: empuje, tirón y piernas',level:'Intermedio',duration:'Por día: 30–50 min',equipment:'Máquinas · poleas',days:[
 day('Push',[step('Chest Press',3,8,'Pecho','reps',60,'8–12'),step('Press inclinado',3,8,'Pecho','reps',60,'8–12'),step('Shoulder Press',3,8,'Hombros','reps',60,'8–12'),step('Elevación lateral',3,12,'Hombros','reps',40,'12–20',alternatives['Elevaciones laterales']),step('Triceps Pushdown',3,10,'Tríceps','reps',40,'10–15'),step('Extensión de tríceps sobre cabeza',2,10,'Tríceps','reps',40,'10–15')]),
 day('Pull',[step('Jalón al pecho',3,8,'Espalda','reps',60,'8–12'),step('Remo sentado',3,8,'Espalda','reps',60,'8–12'),step('Remo con agarre amplio',3,10,'Espalda','reps',50,'10–12',['High Row']),step('Reverse Pec Deck',3,12,'Hombros','reps',40,'12–20'),step('Curl de bíceps',3,8,'Bíceps','reps',40,'8–12'),step('Hammer Curl',2,10,'Bíceps','reps',40,'10–15')]),
 day('Legs',[step('Hack Squat',3,8,'Cuádriceps','reps',60,'8–12'),step('Curl femoral',3,10,'Isquiotibiales','reps',50,'10–15'),step('Extensión de cuádriceps',3,10,'Cuádriceps','reps',50,'10–15'),step('Hip Thrust',3,8,'Glúteos','reps',60,'8–12'),step('Gemelos',4,10,'Gemelos','reps',40,'10–20'),step('Abductores',2,12,'Glúteos','reps',40,'12–20')])]},
 {id:'gym-upper-lower',name:'Torso Pierna 4 días',category:'Gimnasio',description:'Dos días de torso y dos de piernas',level:'Intermedio',duration:'Por día: 35–55 min',equipment:'Máquinas · poleas',days:[
 day('Torso A',[step('Chest Press',3,8,'Pecho'),step('Jalón al pecho',3,8,'Espalda'),step('Remo sentado',3,8,'Espalda'),step('Shoulder Press',3,8,'Hombros'),step('Elevaciones laterales',3,12,'Hombros'),step('Curl bíceps',2,10,'Bíceps'),step('Pushdown tríceps',2,10,'Tríceps')]),
 day('Pierna A',[step('Hack Squat',3,8,'Cuádriceps'),step('Curl femoral',3,10,'Isquiotibiales'),step('Hip Thrust',3,8,'Glúteos'),step('Extensión de cuádriceps',2,12,'Cuádriceps'),step('Gemelos',3,12,'Gemelos'),step('Crunch polea',3,10,'Core')]),
 day('Torso B',[step('Press inclinado',3,8,'Pecho'),step('Remo máquina',3,8,'Espalda'),step('Jalón neutro',3,10,'Espalda'),step('Pec Deck',2,10,'Pecho'),step('Reverse Pec Deck',3,12,'Hombros'),step('Elevación lateral',3,12,'Hombros'),step('Hammer Curl',2,10,'Bíceps'),step('Extensión tríceps',2,10,'Tríceps')]),
 day('Pierna B',[step('Prensa',3,8,'Cuádriceps'),step('Curl femoral sentado',3,10,'Isquiotibiales'),step('Zancadas en Smith',3,8,'Cuádriceps','reps',50,'8–12 por lado'),step('Extensión de cuádriceps',3,10,'Cuádriceps'),step('Abductores',2,15,'Glúteos'),step('Gemelos',3,15,'Gemelos'),step('Dead Bug',3,10,'Core')])]}
];
const sports=[
 ['Fútbol','Piernas · estabilidad',[['Split Squat',8,'Cuádriceps'],['Puente glúteo unilateral',10,'Glúteos'],['Saltos verticales controlados',5,'Cuádriceps'],['Desplazamiento lateral',20,'Cuádriceps','time'],['Dead Bug',10,'Core'],['Aceleraciones cortas',3,'Cuerpo completo']]],
 ['Tenis','Desplazamiento · core',[['Lateral Shuffle',20,'Cuádriceps','time'],['Split Squat',8,'Cuádriceps'],['Pallof Press',10,'Core'],['Rotación con banda',10,'Core'],['Calf Raises',15,'Gemelos'],['Plancha lateral',25,'Core','time']]],
 ['Rugby','Fuerza · estabilidad',[['Goblet Squat',8,'Cuádriceps'],['Push-Up',10,'Pecho'],['Remo',10,'Espalda'],['Zancadas',8,'Cuádriceps'],['Farmer Carry',1,'Cuerpo completo','reps','20–30 m'],['Pallof Press',10,'Core']]],
 ['Básquet','Piernas · estabilidad',[['Squat',10,'Cuádriceps'],['Split Squat',8,'Cuádriceps'],['Saltos verticales',5,'Cuádriceps'],['Saltos laterales cortos',6,'Cuádriceps'],['Elevación de talones de pie',15,'Gemelos'],['Plancha lateral',25,'Core','time']]],
 ['CrossFit','Fuerza · estabilidad',[['Goblet Squat',8,'Cuádriceps'],['Push-Ups',8,'Pecho'],['Remo mancuerna',10,'Espalda'],['Step-Ups',10,'Cuádriceps'],['Plancha',20,'Core','time']]],
 ['Hyrox','Carrera · fuerza',[['Carrera 400 m',1,'Cuerpo completo','reps','400 m'],['Goblet Squat',12,'Cuádriceps'],['Walking Lunges',10,'Cuádriceps'],['Push-Ups',10,'Pecho'],['Farmer Carry',1,'Cuerpo completo','reps','20–30 m']]],
 ['Hockey','Piernas · core',[['Split Squat',10,'Cuádriceps'],['Lateral Shuffle',20,'Cuádriceps','time'],['Wall Sit',30,'Cuádriceps','time'],['Single Leg Bridge',10,'Glúteos'],['Pallof Press',10,'Core'],['Plancha lateral',30,'Core','time']]],
 ['Boxeo','Movimiento · estabilidad',[['Shadow Boxing técnico',60,'Cuerpo completo','time'],['Split Squat',8,'Cuádriceps'],['Push-Ups',10,'Pecho'],['Remo con banda',12,'Espalda'],['Pallof Press',10,'Core'],['Dead Bug',10,'Core']]],
 ['Pádel','Desplazamiento · core',[['Lateral Shuffle',20,'Cuádriceps','time'],['Reverse Lunge',8,'Cuádriceps'],['Split Squat',8,'Cuádriceps'],['Pallof Press',10,'Core'],['Calf Raise',15,'Gemelos'],['Side Plank',25,'Core','time']]],
 ['Vóley','Piernas · hombros',[['Squat',10,'Cuádriceps'],['Split Squat',8,'Cuádriceps'],['Saltos verticales',4,'Cuádriceps'],['Calf Raises',15,'Gemelos'],['Face Pull con banda',15,'Hombros'],['Dead Bug',10,'Core']]],
 ['Natación','Espalda · estabilidad',[['Remo',12,'Espalda'],['Pullover con banda o polea',12,'Espalda'],['Face Pull',15,'Hombros'],['Dead Bug',10,'Core'],['Side Plank',30,'Core','time'],['Glute Bridge',15,'Glúteos']]],
 ['Handball','Piernas · hombros',[['Split Squat',8,'Cuádriceps'],['Lateral Shuffle',20,'Cuádriceps','time'],['Saltos verticales',5,'Cuádriceps'],['Remo',12,'Espalda'],['Face Pull',15,'Hombros'],['Pallof Press',10,'Core']]],
 ['Atletismo / Sprint','Piernas · estabilidad',[['Split Squat',8,'Cuádriceps'],['Single Leg Bridge',10,'Glúteos'],['Calf Raise',15,'Gemelos'],['A-March',20,'Cuerpo completo','time'],['Pogos suaves',10,'Gemelos'],['Dead Bug',8,'Core']]],
 ['Ciclismo','Piernas · core',[['Split Squat',10,'Cuádriceps'],['Step-Up',10,'Cuádriceps'],['Hip Thrust',15,'Glúteos'],['Elevación de talones de pie',15,'Gemelos'],['Dead Bug',10,'Core'],['Side Plank',30,'Core','time']]]
];
const sportsRoutines=sports.map(([sport,description,items])=>({id:'sport-'+slug(sport),name:'Rápida · '+sport,category:'Deportes',description,level:'Intermedio',duration:'15–25 min',equipment:'Peso corporal · equipo opcional',days:[day('Circuito',items.map(([name,amount,muscle,mode='reps',range])=>step(name,sport==='CrossFit'?4:3,amount,muscle,mode,30,range||String(amount))))]}));
for(const routine of [...presetRoutines,...sportsRoutines])for(const d of routine.days)for(const x of d.exercises)for(const alt of x.alternates){const main=byId.get(x.id)?.primaryMuscle||'Cuerpo completo';const altId=register(alt,main);const item=byId.get(x.id);if(!item.alternatives.includes(altId))item.alternatives.push(altId)}
const legacyIds=new Map(Object.entries(aliases).map(([oldName,newName])=>[rawSlug(oldName),slug(newName)]));
const getExercise=id=>byId.get(id)||byId.get(legacyIds.get(id));
root.RTCatalog={exerciseLibrary,presetRoutines,sportsRoutines,allRoutines:[...presetRoutines,...sportsRoutines],getExercise,slug};
if(typeof module!=='undefined')module.exports=root.RTCatalog;
})(typeof window==='undefined'?globalThis:window);
