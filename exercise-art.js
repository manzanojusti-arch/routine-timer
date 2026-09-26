/* Dibujos SVG pequeños y accesibles, generados a partir del movimiento de cada ejercicio. */
(function(root){
const clean=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
const escape=s=>String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function pose(name){const n=clean(name);
 if(/bird dog/.test(n))return 'bird';
 if(/dead bug/.test(n))return 'deadbug';
 if(/side plank|plancha lateral/.test(n))return 'sideplank';
 if(/plancha|hollow/.test(n))return 'plank';
 if(/crunch|ab wheel|hanging knee|hanging leg/.test(n))return 'crunch';
 if(/flexion|push.?up|fondos/.test(n))return 'pushup';
 if(/dominad|jalon/.test(n))return 'pullup';
 if(/remo|high row|pullover|face pull|pec deck posterior|reverse pec deck/.test(n))return 'row';
 if(/shadow boxing/.test(n))return 'box';
 if(/farmer carry/.test(n))return 'carry';
 if(/carrera|aceleraci|shuffle|desplazamiento|a-march|mountain climbers/.test(n))return 'run';
 if(/saltos|pogo/.test(n))return 'jump';
 if(/wall sit/.test(n))return 'wallsit';
 if(/hip thrust|puente|bridge/.test(n))return 'bridge';
 if(/peso muerto|nordic/.test(n))return 'hinge';
 if(/zancad|lunge|split squat|step.?up|pistol/.test(n))return 'lunge';
 if(/sentadilla|squat|prensa|extension de (piernas|cuadriceps)/.test(n))return 'squat';
 if(/femoral|abductor|abduccion|patada/.test(n))return 'legs';
 if(/gemelos|calf|talones/.test(n))return 'calf';
 if(/pallof|rotaci/.test(n))return 'rotate';
 if(/curl|preacher/.test(n))return 'curl';
 if(/triceps|pushdown|extension sobre cabeza|extension maquina/.test(n))return 'triceps';
 if(/elevacion|laterales/.test(n))return 'raise';
 if(/press|pike|handstand/.test(n))return /shoulder|hombro|pike|handstand/.test(n)?'overhead':'press';
 return 'stand';
}
const shapes={
 stand:'<circle cx="58" cy="19" r="7"/><path d="M58 27v31 M58 35 37 48 M58 35 79 48 M58 58 42 86 M58 58 75 86"/>',
 squat:'<circle cx="59" cy="20" r="7"/><path d="M58 28 68 53 82 66 91 84 M68 53 43 66 31 84 M59 34 82 40 95 37 M59 34 46 42"/><path class="motion" d="M106 31v27m0 0-5-6m5 6 5-6"/>',
 lunge:'<circle cx="58" cy="18" r="7"/><path d="M58 26 59 56 83 68 86 85 M59 56 39 69 23 84 M58 34 40 48 M58 34 77 48"/><path class="motion" d="M101 29v26m0 0-5-6m5 6 5-6"/>',
 hinge:'<circle cx="73" cy="24" r="7"/><path d="M70 31 45 53 39 79 M45 53 51 68 46 86 M45 53 68 67 78 86 M61 41 76 55"/><path class="motion" d="M91 30q12 15 0 30m0 0-2-8m2 8 8-4"/>',
 bridge:'<circle cx="24" cy="70" r="7"/><path d="M31 68 46 63 72 42 89 63 91 86 M46 63 45 85 M61 52 68 72"/><path class="motion" d="M68 29v-13m0 0-6 7m6-7 6 7"/>',
 pushup:'<circle cx="24" cy="51" r="7"/><path d="M31 52 64 57 97 67 M41 54 36 80 M52 56 52 81 M97 67 102 82"/><path class="motion" d="M71 36v14m0 0-5-6m5 6 5-6"/>',
 pullup:'<path class="equipment" d="M21 9h74 M34 9v4 M82 9v4"/><circle cx="58" cy="35" r="7"/><path d="M58 43v27 M57 49 34 13 M59 49 82 13 M58 70 46 88 M58 70 72 88"/><path class="motion" d="M102 63V37m0 0-5 6m5-6 5 6"/>',
 row:'<circle cx="72" cy="25" r="7"/><path d="M70 33 47 56 49 80 M47 56 63 70 69 86 M47 56 33 71 26 84 M63 41 39 48 28 43"/><path class="motion" d="M17 42h12m0 0-6-5m6 5-6 5"/>',
 press:'<circle cx="49" cy="19" r="7"/><path d="M49 27v33 M49 60 35 85 M49 60 67 85 M49 37 72 36 91 38 M49 37 34 47"/><path class="equipment" d="M94 29v19 M87 29v19 M84 36h14"/><path class="motion" d="M100 56h10m0 0-6-5m6 5-6 5"/>',
 overhead:'<circle cx="58" cy="25" r="7"/><path d="M58 33v30 M58 63 42 88 M58 63 75 88 M58 40 40 27 40 10 M58 40 78 27 78 10"/><path class="equipment" d="M33 9h14 M71 9h14"/><path class="motion" d="M99 44V18m0 0-5 6m5-6 5 6"/>',
 raise:'<circle cx="58" cy="20" r="7"/><path d="M58 28v34 M58 62 42 87 M58 62 75 87 M58 37 29 39 M58 37 87 39"/><path class="equipment" d="M23 33v12 M93 33v12"/><path class="motion" d="M105 60V43m0 0-5 5m5-5 5 5"/>',
 curl:'<circle cx="58" cy="20" r="7"/><path d="M58 28v33 M58 61 42 87 M58 61 76 87 M58 36 44 51 36 30 M58 36 72 51 81 30"/><path class="equipment" d="M30 30h12 M75 30h12"/><path class="motion" d="M97 55q8-18-1-26m0 0 1 8m-1-8 8 3"/>',
 triceps:'<circle cx="58" cy="21" r="7"/><path d="M58 29v33 M58 62 42 88 M58 62 75 88 M58 38 45 42 53 16 M58 38 71 42 65 16"/><path class="equipment" d="M49 12h20"/><path class="motion" d="M97 34v22m0 0-5-6m5 6 5-6"/>',
 legs:'<circle cx="49" cy="19" r="7"/><path d="M49 27v34 M49 36 31 47 M49 36 69 47 M49 61 40 81 M49 61 80 64 91 51"/><path class="motion" d="M93 77V55m0 0-5 6m5-6 5 6"/>',
 calf:'<circle cx="58" cy="17" r="7"/><path d="M58 25v35 M58 33 41 47 M58 33 75 47 M58 60 43 80 42 87 M58 60 76 80 75 87"/><path class="motion" d="M100 70V45m0 0-5 6m5-6 5 6"/>',
 plank:'<circle cx="24" cy="51" r="7"/><path d="M31 52 67 59 97 68 M40 55 30 73 28 82 M96 68 101 82"/><path class="motion" d="M60 47h21"/>',
 sideplank:'<circle cx="29" cy="49" r="7"/><path d="M35 53 63 60 97 77 M37 55 32 82 M58 58 64 25 M97 77 103 85"/><path class="motion" d="M66 20v-9m0 0-5 5m5-5 5 5"/>',
 crunch:'<circle cx="30" cy="50" r="7"/><path d="M36 53 60 70 80 60 95 78 M60 70 53 85 M49 61 47 43"/><path class="motion" d="M19 32q12-14 27 0m0 0-8-1m8 1-3-8"/>',
 deadbug:'<circle cx="24" cy="70" r="7"/><path d="M31 69h37 M45 67 42 34 M54 67 71 42 M68 69 80 50 90 57 M68 69 79 82"/><path class="motion" d="M91 26 81 36m0 0 7-1m-7 1 1-8"/>',
 bird:'<circle cx="38" cy="49" r="7"/><path d="M44 54 70 59 88 56 104 47 M70 59 67 83 M55 57 36 75 30 85 M51 56 18 43"/><path class="motion" d="M83 38 98 33m0 0-7-3m7 3-5 6"/>',
 rotate:'<circle cx="58" cy="20" r="7"/><path d="M58 28v34 M58 62 42 86 M58 62 76 86 M58 38 81 43 96 41 M58 38 42 46"/><path class="motion" d="M74 17q23 0 24 21m0 0-6-5m6 5 5-6"/>',
 run:'<circle cx="66" cy="20" r="7"/><path d="M64 27 55 55 41 69 29 86 M55 55 75 67 94 85 M59 37 37 38 M59 37 82 47"/><path class="motion" d="M94 24h17m0 0-6-5m6 5-6 5"/>',
 jump:'<circle cx="58" cy="21" r="7"/><path d="M58 29v32 M58 37 32 19 M58 37 84 19 M58 61 34 81 M58 61 83 81"/><path class="motion" d="M106 55V29m0 0-6 7m6-7 6 7"/>',
 carry:'<circle cx="58" cy="19" r="7"/><path d="M58 27v33 M58 60 42 85 M58 60 76 85 M58 35 35 52 32 67 M58 35 81 52 84 67"/><path class="equipment" d="M23 65h18v15H23z M75 65h18v15H75z"/><path class="motion" d="M99 22h13m0 0-5-4m5 4-5 4"/>',
 box:'<circle cx="55" cy="19" r="7"/><path d="M55 27 59 57 39 71 30 85 M59 57 77 71 84 84 M56 36 48 45 43 37 M56 36 81 38 98 35"/><path class="motion" d="M93 23h17m0 0-6-5m6 5-6 5"/>',
 wallsit:'<path class="equipment" d="M37 23v63"/><circle cx="52" cy="29" r="7"/><path d="M47 35 47 63 75 63 78 85 M47 63 36 84 M47 43 66 53"/><path class="motion" d="M95 49v16"/>'
};
function svg(name,equipment='',className=''){
 const id=root.RTCatalog?.slug(name)||clean(name).replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
 const drawings=root.RTExerciseDrawings,pair=drawings?.map[id];
 if(pair){const label=escape(name),frame=(key,phase)=>`<img src="data:image/svg+xml;base64,${drawings.images[key]}" width="240" height="240" alt="${phase}: ${label}" loading="lazy" decoding="async">`;return `<span class="rt-exercise-art rt-art-pair ${escape(className)}" role="group" aria-label="Movimiento de ${label}">${frame(pair[0],'Inicio')}${frame(pair[1],'Final')}</span>`}
 const kind=pose(name),gear=clean(equipment),base=shapes[kind];
 const floor='<path class="ground" d="M12 90h96"/>';
 const frame=/maquina|polea|smith|barra/.test(gear)&&!['pullup','wallsit'].includes(kind)?'<path class="equipment frame" d="M13 84V13h12 M108 84V13H96"/>':'';
 const pack=/mochila/.test(gear)?'<path class="equipment" d="M64 39h12v17H64z"/>':'';
 const band=/banda/.test(gear)?'<path class="equipment" d="M16 46Q30 35 39 44"/>':'';
 return `<svg class="rt-exercise-art ${escape(className)}" viewBox="0 0 120 100" role="img" aria-label="Esquema de ${escape(name)}" xmlns="http://www.w3.org/2000/svg"><title>Esquema de ${escape(name)}</title><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3.2">${floor}${frame}${base}${pack}${band}</g></svg>`
}
root.RTExerciseArt={pose,svg};
if(typeof module!=='undefined')module.exports=root.RTExerciseArt;
})(typeof window==='undefined'?globalThis:window);
