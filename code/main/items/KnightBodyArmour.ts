///<reference path="EqItem.ts"/>
///<reference path="../quest-entities/Player.ts"/>
///<reference path="../quests/Quest.ts"/>
///<reference path="../classes/QuestEntityDamageReason.ts"/>

class KnightBodyArmour extends EqItem{
    // Constructor
    constructor(){
        super("eqItemBodyArmoursKnightBodyArmour",
              "eqItemBodyArmoursKnightBodyArmourName",
              "eqItemBodyArmoursKnightBodyArmourDescription",
              "eqItems/bodyArmours/knightBodyArmour");
    }
    
    // Special ability
    public getSpecialAbility(): string{
        return "Damage taken reduced by 30% (knight body armour)";
    }
    
    // inflictDamage()
    public inflictDamage(player: Player, quest: Quest, damage: number, reason: QuestEntityDamageReason): number{
        return Math.ceil(damage - damage*30/100);
    }
}
