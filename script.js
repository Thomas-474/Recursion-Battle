//#region Enemies
function Enemy(name, enemyType, specialAbility, hitPoints, power, dodge, block){
    this.name = name;
    this.enemyType = enemyType;
    this.specialAbility = specialAbility;
    this.hitPoints = hitPoints;
    this.power = power;
    this.dodge = dodge;
    this.block = block;
}
//                           name         type           ability       hp   p   d   b
var goblin = new Enemy     ('Wrag',      'Goblin',      'Club Swing',  5,   5,  25, 5 );
var owlbear = new Enemy    ('Owlbear',   'Owlbear',     'Claw Strike', 10,  10, 20, 10);
var mindFlayer = new Enemy ('Vussadire', 'Mind Flayer', 'Mind Blast',  15,  15, 15, 15);
var redDragon = new Enemy  ('Relidos',   'Red Dragon',  'Fire Breath', 20,  20, 10, 20);
var tarrasque = new Enemy  ('Tarrasque', 'Tarrasque',   'Chomp',       25,  25, 5,  25);

//#endregion
////////
//#region Heroes
function Hero(name, playerType, experience, hitPoints, power, dodge, block){
    this.name = name;
    this.playerType = playerType;
    this.experience = experience;
    this.hitPoints = hitPoints;
    this.power = power;
    this.dodge = dodge;
    this.block = block;
}
//                        name      type      xp  hp  p   d   b
var rogue = new Hero    ('Tavion', 'rogue',   0,  15, 20, 25, 5 );
var paladin = new Hero  ('Landen', 'paladin', 0,  20, 15, 5,  25);

//#endregion
////////
//#region Multipliers
var heroMultiplier;
function HeroRoll(){
    heroMultiplier = Math.floor(Math.random() * 11);
    return heroMultiplier;
}

var enemyMultiplier;
function EnemyRoll(){
    enemyMultiplier = Math.floor(Math.random() * 11);
    return enemyMultiplier;
}

//#endregion
