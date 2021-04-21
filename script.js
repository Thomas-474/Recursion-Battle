//#region Enemies
    function Enemy(name, type, specialAbility, totalHitPoints, hitPoints, power, dodge, block){
        this.name = name;
        this.type = type;
        this.specialAbility = specialAbility;
        this.totalHitPoints = totalHitPoints;
        this.hitPoints = hitPoints;
        this.power = power;
        this.dodge = dodge;
        this.block = block;
    }
    //                           name                         type           ability       totalHp  hp  p   d   b
    var goblin = new Enemy     ('Wrag the Goblin',           'Goblin',      'Club Swing',   5,      5,  2,  10, 2);
    var owlbear = new Enemy    ('Owlbear',                   'Owlbear',     'Claw Strike',  10,     10, 4,  8,  4);
    var mindFlayer = new Enemy ('Vussadire the Mind Flayer', 'Mind Flayer', 'Mind Blast',   15,     15, 6,  6,  6);
    var redDragon = new Enemy  ('Relidos the Red Dragon',    'Red Dragon',  'Fire Breath',  20,     20, 8,  4,  8);
    var tarrasque = new Enemy  ('Tarrasque',                 'Tarrasque',   'Chomp',        25,     25, 10, 2,  10);
//#endregion
////////
//#region Heroes
    function Hero(name, type, specialAbility, experience, totalHitPoints, hitPoints, power, dodge, block){
        this.name = name;
        this.type = type;
        this.specialAbility = specialAbility;
        this.experience = experience;
        this.totalHitPoints = totalHitPoints;
        this.hitPoints = hitPoints;
        this.power = power;
        this.dodge = dodge;
        this.block = block;
    }
    //                        name      type       ability        xp  totalHp  hp  p  d   b
    var rogue = new Hero    ('Tavion', 'Rogue',   'Sneak Attack', 0,   17,     17, 8, 10, 2);
    var paladin = new Hero  ('Landen', 'Paladin', 'Divine Smite', 0,   20,     20, 6, 2,  10);
//#endregion
////////
//#region Dice & Randomizers
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
    var enemySelect;
    function EnemyChances(){
        enemySelect = Math.floor(Math.random() * 100 + 1);
        return enemySelect;
    }
//#endregion
////////
//#region Explanation
    /*
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
//#region Battle Set Up
    // Variables
    var currentHero;
    var currentEnemy;
    var attacker;
    var defender;
    // Clearing Battle Log Function
    function ClearBattleLog(){
        document.getElementById('characterTurn').innerHTML = '';
        document.getElementById('rollToHit').innerHTML = '';
        document.getElementById('attackHits').innerHTML = '';
        document.getElementById('damageRoll').innerHTML = '';
        document.getElementById('damageRoll&Power').innerHTML = '';
        document.getElementById('damageDone').innerHTML = '';
        document.getElementById('characterDies').innerHTML = '';
        document.getElementById('characterWins').innerHTML = '';
        document.getElementById('characterDoesNotDie').innerHTML = '';
        document.getElementById('noDamage').innerHTML = '';
        document.getElementById('attackMisses').innerHTML = '';
    }
    // Resetting HP Function
    function ResettingHP(){
        goblin.hitPoints = 5;
        owlbear.hitPoints = 10;
        mindFlayer.hitPoints = 15;
        redDragon.hitPoints = 20;
        tarrasque.hitPoints = 25;
        rogue.hitPoints = 17;
        paladin.hitPoints = 20;
    }
    // Turn Button Disabled
    document.getElementById("turnBtn").disabled = true;
    // Skip Turns Button Disabled
    document.getElementById("skipBtn").disabled = true;
    // Battle Set Up Function
    function BattleSetUp(){
        // Clearing Battle Log
        ClearBattleLog();
        // Clearing Background Image
        document.getElementById("body").style.backgroundImage = "none";
        // Enables Turn Button
        document.getElementById("turnBtn").disabled = false;
        // Enables Skip Turns Button
        document.getElementById("skipBtn").disabled = false;
        // Hero Select
        FiftyPercent();
        if (halfChance == 1){
            currentHero = rogue;
        } else{
            currentHero = paladin;
        }
        document.getElementById('heroChosen').innerHTML = `Hero: ${currentHero.name}, the ${currentHero.type}`;
        document.getElementById('heroAbility').innerHTML = `Ability: ${currentHero.specialAbility}`;
        document.getElementById('heroTotalHp').innerHTML = `Total Hit Points: ${currentHero.totalHitPoints}`;
        document.getElementById('heroHp').innerHTML = `Current Hit Points: ${currentHero.hitPoints}`;
        document.getElementById('heroPower').innerHTML = `Power: ${currentHero.power}`;
        document.getElementById('heroDodge').innerHTML = `Dodge: ${currentHero.dodge}`;
        document.getElementById('heroBlock').innerHTML = `Block: ${currentHero.block}`;
        // Enemy Select
        EnemyChances();
        if (enemySelect >= 1 && enemySelect <= 30){
            document.getElementById("body").style.backgroundImage = "url('GoblinBackground.jpg')";
            currentEnemy = goblin;
        } else if (enemySelect >= 31 && enemySelect <= 55){
            document.getElementById("body").style.backgroundImage = "url('OwlbearBackground.jpg')";
            currentEnemy = owlbear;
        } else if (enemySelect >= 56 && enemySelect <= 75){
            document.getElementById("body").style.backgroundImage = "url('MindFlayerBackground.jpg')";
            currentEnemy = mindFlayer;
        } else if (enemySelect >= 76 && enemySelect <= 90){
            document.getElementById("body").style.backgroundImage = "url('RedDragonBackground.jpg')";
            currentEnemy = redDragon;
        } else{
            document.getElementById("body").style.backgroundImage = "url('TarrasqueBackground.jpg')";
            currentEnemy = tarrasque;
        }
        document.getElementById('enemyChosen').innerHTML = `Enemy: ${currentEnemy.name}`;
        document.getElementById('enemyAbility').innerHTML = `Ability: ${currentEnemy.specialAbility}`;
        document.getElementById('enemyTotalHp').innerHTML = `Total Hit Points: ${currentEnemy.totalHitPoints}`;
        document.getElementById('enemyHp').innerHTML = `Current Hit Points: ${currentEnemy.hitPoints}`;
        document.getElementById('enemyPower').innerHTML = `Power: ${currentEnemy.power}`;
        document.getElementById('enemyDodge').innerHTML = `Dodge: ${currentEnemy.dodge}`;
        document.getElementById('enemyBlock').innerHTML = `Block: ${currentEnemy.block}`;
        // 50/50 for First Attacker
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
    }
//#endregion
////////
//#region Battle
    // Turns Function
    function Turn(){
        // Clearing Battle Log
        ClearBattleLog();
        // Character's Turn to Attack
        document.getElementById('characterTurn').innerHTML = `It is ${attacker.name}'s turn to attack`;
        // Roll to Hit
        dice30Sided();
        document.getElementById('rollToHit').innerHTML = `${attacker.name} rolls a(n) ${d30} to hit ${defender.name} with ${attacker.specialAbility}`;
        // Attack Hits
        if (d30 >= defender.dodge){
            document.getElementById('attackHits').innerHTML = `${attacker.name}'s ${attacker.specialAbility} hits ${defender.name}`;
            // Roll for Damage
            dice20Sided();
            document.getElementById('damageRoll').innerHTML = `${attacker.name} rolls a(n) ${d20} for damage`;
            // (Roll Number + Attacker's Power) - Defender's Block
            d20 += attacker.power;
            document.getElementById('damageRoll&Power').innerHTML = `${attacker.name}'s damage roll + their power = ${d20} damage`;
            d20 -= defender.block;
            // Attack Does Damage
            if (d20 > 0){
                document.getElementById('damageDone').innerHTML = `${defender.name} blocks ${defender.block} damage and takes ${d20} damage`;
                defender.hitPoints -= d20;
                // Current HP Updates
                document.getElementById('heroHp').innerHTML = `Current Hit Points: ${currentHero.hitPoints}`;
                document.getElementById('enemyHp').innerHTML = `Current Hit Points: ${currentEnemy.hitPoints}`;
                // Defender Dies
                if (defender.hitPoints <= 0){
                    // HP Reset
                    ResettingHP();
                    // Who Wins & Loses
                    document.getElementById('characterDies').innerHTML = `${defender.name} has 0 hit points left and dies`;
                    document.getElementById('characterWins').innerHTML = `${attacker.name} wins the battle`;
                    // Turn Button Disabled
                    document.getElementById("turnBtn").disabled = true;
                    // Skip Turns Button Disabled
                    document.getElementById("skipBtn").disabled = true;
                // Defender Doesn't Die
                } else{
                    // Defender's Remaining HP
                    document.getElementById('characterDoesNotDie').innerHTML = `${defender.name} has ${defender.hitPoints} hit point(s) left`;
                    // Current Attacker & Defender Switch Positions as Turn Ends
                    [attacker, defender] = [defender, attacker];
                }
            // Attack Doesn't Do Damage
            } else{
                document.getElementById('noDamage').innerHTML = `${defender.name} blocks all damage`;
                // Current Attacker & Defender Switch Positions as Turn Ends
                [attacker, defender] = [defender, attacker];
            }
        // Attack Misses
        } else{
            document.getElementById('attackMisses').innerHTML = `${attacker.name}'s ${attacker.specialAbility} misses`;
            // Current Attacker & Defender Switch Positions as Turn Ends
            [attacker, defender] = [defender, attacker];
        }
    }
//#endregion
////////
//#region Skip to End of Battle
    // Skip Turns Function
    function SkipTurns(){
        // Clearing Battle Log
        ClearBattleLog();
        // Character's Turn to Attack
        document.getElementById('characterTurn').innerHTML = `It is ${attacker.name}'s turn to attack`;
        // Roll to Hit
        dice30Sided();
        document.getElementById('rollToHit').innerHTML = `${attacker.name} rolls a(n) ${d30} to hit ${defender.name} with ${attacker.specialAbility}`;
        // Attack Hits
        if (d30 >= defender.dodge){
            document.getElementById('attackHits').innerHTML = `${attacker.name}'s ${attacker.specialAbility} hits ${defender.name}`;
            // Roll for Damage
            dice20Sided();
            document.getElementById('damageRoll').innerHTML = `${attacker.name} rolls a(n) ${d20} for damage`;
            // (Roll Number + Attacker's Power) - Defender's Block
            d20 += attacker.power;
            document.getElementById('damageRoll&Power').innerHTML = `${attacker.name}'s damage roll + their power = ${d20} damage`;
            d20 -= defender.block;
            // Attack Does Damage
            if (d20 > 0){
                document.getElementById('damageDone').innerHTML = `${defender.name} blocks ${defender.block} damage and takes ${d20} damage`;
                defender.hitPoints -= d20;
                // Current HP Updates
                document.getElementById('heroHp').innerHTML = `Current Hit Points: ${currentHero.hitPoints}`;
                document.getElementById('enemyHp').innerHTML = `Current Hit Points: ${currentEnemy.hitPoints}`;
                // Defender Dies
                if (defender.hitPoints <= 0){
                    // HP Reset
                    ResettingHP();
                    // Who Wins & Loses
                    document.getElementById('characterDies').innerHTML = `${defender.name} has 0 hit points left and dies`;
                    document.getElementById('characterWins').innerHTML = `${attacker.name} wins the battle`;
                    // Turn Button Disabled
                    document.getElementById("turnBtn").disabled = true;
                    // Skip Turns Button Disabled
                    document.getElementById("skipBtn").disabled = true;
                // Defender Doesn't Die
                } else{
                    // Defender's Remaining HP
                    document.getElementById('characterDoesNotDie').innerHTML = `${defender.name} has ${defender.hitPoints} hit point(s) left`;
                    // Current Attacker & Defender Switch Positions as Turn Ends
                    [attacker, defender] = [defender, attacker];
                    SkipTurns();
                }
            // Attack Doesn't Do Damage
            } else{
                document.getElementById('noDamage').innerHTML = `${defender.name} blocks all damage`;
                // Current Attacker & Defender Switch Positions as Turn Ends
                [attacker, defender] = [defender, attacker];
                SkipTurns();
            }
        // Attack Misses
        } else{
            document.getElementById('attackMisses').innerHTML = `${attacker.name}'s ${attacker.specialAbility} misses`;
            // Current Attacker & Defender Switch Positions as Turn Ends
            [attacker, defender] = [defender, attacker];
            SkipTurns();
        }
    }
//#endregion
