///<reference path="../classes/QuestEntity.ts"/>
///<reference path="../quests/Quest.ts"/>
///<reference path="../classes/Pos.ts"/>
///<reference path="../classes/Naming.ts"/>
///<reference path="../render-areas/RenderArea.ts"/>
///<reference path="../classes/CollisionBoxCollection.ts"/>
///<reference path="../classes/CollisionBox.ts"/>
///<reference path="../classes/QuestEntityMovement.ts"/>
///<reference path="../classes/RenderTransparency.ts"/>
///<reference path="../quest-entity-weapons/QuestEntityWeapon.ts"/>
///<reference path="../classes/QuestLogMessage.ts"/>
///<reference path="../modules/Version.ts"/>

class MediumFish extends QuestEntity{
    // Constructor
    constructor(quest: Quest, pos: Pos){
        super();
        super.constructQuestEntity(quest,
              pos,
              new Naming("A fish", "a fish"),
              new RenderArea(8, 4),
              new Pos(0, 0),
              new CollisionBoxCollection(new CollisionBox(this, new Pos(1, 1), new Pos(7, 1)),
                                         new CollisionBox(this, new Pos(0, 2), new Pos(8, 1)),
                                         new CollisionBox(this, new Pos(1, 3), new Pos(7, 1))
                                        ),
              new QuestEntityMovement(new Pos(-1, 0))
             );
        
        // Set destructible
        this.setDestructible(true);
        this.setMaxHp(30);
        this.setHp(30);
        
        // Set the ascii art
        this.getRenderArea().drawArray(Database.getAscii("places/quests/theSea/mediumFish"));
        
        // Set the transparency
        this.setTransparency(new RenderTransparency(" ", "%"));
        
        // Set the weapon and its delay
        this.addQuestEntityWeapon(new QuestEntityWeapon(this.getQuest(), this, new Naming("Its fins", "its fins"), new CollisionBoxCollection(new CollisionBox(this, new Pos(-1, -1), new Pos(10, 6))), 3));
        this.getLastQuestEntityWeapon().getCloseCombatDelay().setFixedDelay(4);
    }
    
    // willDie()
    public willDie(): void{
        this.getQuest().getGame().getQuestLog().addMessage(new QuestLogMessage(this.getDeathMessage() + " (and found " + Algo.pluralFormat(this.getQuest().foundCandies(15), Version.getSingular(), Version.getPlural()) + ")", this.getQuest().getCandiesFoundMessage()));
    }
}
