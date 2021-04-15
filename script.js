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
    function Hero(name, playerType, specialAbility, experience, hitPoints, power, dodge, block){
        this.name = name;
        this.playerType = playerType;
        this.specialAbility = specialAbility;
        this.experience = experience;
        this.hitPoints = hitPoints;
        this.power = power;
        this.dodge = dodge;
        this.block = block;
    }
    //                        name      type       ability        xp hp  p   d   b
    var rogue = new Hero    ('Tavion', 'rogue',   'Sneak Attack', 0, 15, 20, 25, 5 );
    var paladin = new Hero  ('Landen', 'paladin', 'Divine Smite', 0, 20, 15, 5,  25);
//#endregion
////////
//#region Multipliers
    /*
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
    */
    var halfChance;
    function FiftyPercent(){
        halfChance = Math.floor(Math.random() * 2 + 1);
        return halfChance;
    }

    var d20;
    function dice20Sided(){
        d20 = Math.floor(Math.random() * 20 + 1);
        return d20;
    }

    var d30;
    function dice30Sided(){
        d30 = Math.floor(Math.random() * 30 + 1);
        return d30;
    }

    var enemySelect
    function EnemyChances(){
        enemySelect = Math.floor(Math.random() * 100 + 1);
        return enemySelect;
    }
//#endregion
////////
//#region Battle
    /* Battle:
        Selection:
            Hero- Randomly selected with a 50% chance of either hero being picked.

            Enemy- Randomly selected, but the harder the enemy, the less likely they're to be picked (Goblin-30% (enemySelect #1-30), Owlbear-25% (enemySelect #31-55), Mind Flayer-20% (enemySelect #56-75), Red Dragon-15% (enemySelect #76-90), Tarrasque-10% (enemySelect #91-100)).

            First Turn/Attack- It is a 50% chance of whether the hero or enemy will attack first.
        Stats:
            Hit Points- The amount of health a character has and how much damage they can take before they die.

            Power- The base strength of a character's attack. Factor in how much damage a character deals to another. The number of strength is added to attack rolls.

            Dodge- The stat used to determine how well a character can dodge an attack.

            Block- The stat used to absorb an attack. An incoming attack's damage is subtracted by the block stat. 
        Turn Cycle:
            Roll to Hit- The character attacking rolls a d30. If the number is greater than or equel to their opponent's dodge stat, then the attack hits, otherwise the attack misses and the turn ends.

            Roll for Damage- The attacking character rolls a d20. That character's power stat is added to the roll. The sum of the 2 numbers is then subtracted by the opponent's block stat to make the final damage number. If the final damage number is greater than 0, then the opponent's hit points stat is subtracted by the final damage number, otherwise no damage is done to the opponent and the turn ends.

            End of Turn- If the opponent's hit points stat is equal to or less than 0, then the game ends and the current attacking character wins, otherwise the attacking character's turn ends and the other character's turn starts.
    */

    function Battle(){
        ;
    }

//#endregion
