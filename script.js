//#region Enemies
    function Enemy(name, type, specialAbility, hitPoints, power, dodge, block){
        this.name = name;
        this.type = type;
        this.specialAbility = specialAbility;
        this.hitPoints = hitPoints;
        this.power = power;
        this.dodge = dodge;
        this.block = block;
    }
    //                           name                         type           ability       hp  p   d   b
    var goblin = new Enemy     ('Wrag the Goblin',           'Goblin',      'Club Swing',  5,  5,  25, 5 );
    var owlbear = new Enemy    ('Owlbear',                   'Owlbear',     'Claw Strike', 10, 10, 20, 10);
    var mindFlayer = new Enemy ('Vussadire the Mind Flayer', 'Mind Flayer', 'Mind Blast',  15, 15, 15, 15);
    var redDragon = new Enemy  ('Relidos the Red Dragon',    'Red Dragon',  'Fire Breath', 20, 20, 10, 20);
    var tarrasque = new Enemy  ('Tarrasque',                 'Tarrasque',   'Chomp',       25, 25, 5,  25);
//#endregion
////////
//#region Heroes
    function Hero(name, type, specialAbility, experience, hitPoints, power, dodge, block){
        this.name = name;
        this.type = type;
        this.specialAbility = specialAbility;
        this.experience = experience;
        this.hitPoints = hitPoints;
        this.power = power;
        this.dodge = dodge;
        this.block = block;
    }
    //                        name      type       ability        xp hp  p   d   b
    var rogue = new Hero    ('Tavion', 'Rogue',   'Sneak Attack', 0, 15, 20, 25, 5 );
    var paladin = new Hero  ('Landen', 'Paladin', 'Divine Smite', 0, 20, 15, 5,  25);
//#endregion
////////
//#region Dice & Chances
    /* Original Assignment Multiplier
    var heroMultiplier;
    function HeroRoll(){
        heroMultiplier = Math.floor(Math.random() * 11);
        return heroMultiplier;
    }

    var enemyMultiplier;
    function EnemyRoll(){
        enemyMultiplier = Math.floor(Math.random() * 11);
        return enemyMultiplier;
    } */

    var halfChance;
    function FiftyPercent(){
        halfChance = Math.floor(Math.random() * 2 + 1);
        return halfChance;
    }
    // console.log(FiftyPercent());

    var d20;
    function dice20Sided(){
        d20 = Math.floor(Math.random() * 20 + 1);
        return d20;
    }
    // console.log(dice20Sided());

    var d30;
    function dice30Sided(){
        d30 = Math.floor(Math.random() * 30 + 1);
        return d30;
    }
    // console.log(dice30Sided());

    var enemySelect;
    function EnemyChances(){
        enemySelect = Math.floor(Math.random() * 100 + 1);
        return enemySelect;
    }
    // console.log(EnemyChances());
//#endregion
////////
//#region Explanation
    /* Battle:
        Selection:
            Hero- Randomly selected with a 50% chance of either hero being picked. Rogue is halfChance #1 and Paladin is halfChance #2.

            Enemy- Randomly selected, but the harder the enemy, the less likely they're to be picked (Goblin-30% (enemySelect #1-30), Owlbear-25% (enemySelect #31-55), Mind Flayer-20% (enemySelect #56-75), Red Dragon-15% (enemySelect #76-90), Tarrasque-10% (enemySelect #91-100)).

            First Turn/Attack- It is a 50% chance of whether the hero or enemy will attack first. Hero is halfChance #1 and enemy is halfChance #2.
            
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
//#endregion
////////
//#region Battle
    var currentHero;
    var currentEnemy;
    var attacker;
    var defender;

    function Battle(){
        // Hero Select
        FiftyPercent();
        if (halfChance == 1){
            currentHero = rogue;
        } else{
            currentHero = paladin;
        }
        console.log(`Hero: ${currentHero.name}, the ${currentHero.type}`);
        document.getElementById('heroChosen').innerHTML = `Hero: ${currentHero.name}, the ${currentHero.type}`;
        document.getElementById('heroAbility').innerHTML = `Ability: ${currentHero.specialAbility}`;
        document.getElementById('heroHp').innerHTML = `Total Hit Points: ${currentHero.hitPoints}`;
        document.getElementById('heroPower').innerHTML = `Power: ${currentHero.power}`;
        document.getElementById('heroDodge').innerHTML = `Dodge: ${currentHero.dodge}`;
        document.getElementById('heroBlock').innerHTML = `Block: ${currentHero.block}`;


        // Enemy Select
        EnemyChances();
        if (enemySelect >= 1 && enemySelect <= 30){
            currentEnemy = goblin;
        } else if (enemySelect >= 31 && enemySelect <= 55){
            currentEnemy = owlbear;
        } else if (enemySelect >= 56 && enemySelect <= 75){
            currentEnemy = mindFlayer;
        } else if (enemySelect >= 76 && enemySelect <= 90){
            currentEnemy = redDragon;
        } else{
            currentEnemy = tarrasque;
        }
        console.log(`Enemy: ${currentEnemy.name}`);
        document.getElementById('enemyChosen').innerHTML = `Enemy: ${currentEnemy.name}`;
        document.getElementById('enemyAbility').innerHTML = `Ability: ${currentEnemy.specialAbility}`;
        document.getElementById('enemyHp').innerHTML = `Total Hit Points: ${currentEnemy.hitPoints}`;
        document.getElementById('enemyPower').innerHTML = `Power: ${currentEnemy.power}`;
        document.getElementById('enemyDodge').innerHTML = `Dodge: ${currentEnemy.dodge}`;
        document.getElementById('enemyBlock').innerHTML = `Block: ${currentEnemy.block}`;
        
        // First Attacker
        FiftyPercent();
        // Hero Attacks First
        if (halfChance == 1){
            attacker = currentHero;
            defender = currentEnemy;
        // Enemy Attacks First
        } else{
            attacker = currentEnemy;
            defender = currentHero;
        }

        // Turn
        function Turn(){
            console.log('------------------------------');
            console.log(`It is ${attacker.name}'s turn to attack`);
            document.getElementById('characterTurn').innerHTML = `It is ${attacker.name}'s turn to attack`;

            // Roll to Hit
            dice30Sided();
            console.log(`${attacker.name} rolls a(n) ${d30} to hit ${defender.name} with ${attacker.specialAbility}`);
            document.getElementById('rollToHit').innerHTML = `${attacker.name} rolls a(n) ${d30} to hit ${defender.name} with ${attacker.specialAbility}`;

            // Attack Hits
            if (d30 >= defender.dodge){
                console.log(`${attacker.name}'s ${attacker.specialAbility} hits ${defender.name}`);
                document.getElementById('attackHits').innerHTML = `${attacker.name}'s ${attacker.specialAbility} hits ${defender.name}`;

                // Roll for Damage
                dice20Sided();
                console.log(`${attacker.name} rolls a(n) ${d20} for damage`);
                document.getElementById('damageRoll').innerHTML = `${attacker.name} rolls a(n) ${d20} for damage`;
                d20 += attacker.power;
                console.log(`${attacker.name}'s damage roll + power = ${d20} damage`);
                document.getElementById('damageRoll&Power').innerHTML = `${attacker.name}'s damage roll + their power = ${d20} damage`;
                d20 -= defender.block;

                // Attack Does Damage
                if (d20 > 0){
                    console.log(`${defender.name} blocks ${defender.block} damage and takes ${d20} damage`);
                    document.getElementById('damageDone').innerHTML = `${defender.name} blocks ${defender.block} damage and takes ${d20} damage`;
                    defender.hitPoints -= d20;

                    // Defender Dies
                    if (defender.hitPoints <= 0){
                        console.log(`${defender.name} has 0 hit points left and dies`);
                        document.getElementById('characterDies').innerHTML = `${defender.name} has 0 hit points left and dies`;
                        console.log('------------------------------');
                        console.log(`${attacker.name} wins the battle`);
                        document.getElementById('characterWins').innerHTML = `${attacker.name} wins the battle`;

                    // Defender Doesn't Die
                    } else{
                        console.log(`${defender.name} has ${defender.hitPoints} hit point(s) left`);
                        document.getElementById('characterDoesNotDie').innerHTML = `${defender.name} has ${defender.hitPoints} hit point(s) left`;
                        [attacker, defender] = [defender, attacker];
                    }

                // Attack Doesn't Do Damage
                } else{
                    console.log(`${defender.name} blocks all damage`);
                    document.getElementById('noDamage').innerHTML = `${defender.name} blocks all damage`;
                    [attacker, defender] = [defender, attacker];
                }

            // Attack Misses
            } else{
                console.log(`${attacker.name}'s ${attacker.specialAbility} misses`);
                document.getElementById('attackMisses').innerHTML = `${attacker.name}'s ${attacker.specialAbility} misses`;
                [attacker, defender] = [defender, attacker];
            }
        }
        console.log(Turn());
    }
    console.log(Battle());
//#endregion
