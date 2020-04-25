///<reference path="../classes/Place.ts"/>
///<reference path="../render-areas/RenderArea.ts"/>
///<reference path="../classes/Game.ts"/>
///<reference path="../modules/Database.ts"/>
///<reference path="../modules/Algo.ts"/>
///<reference path="../enums/VersionType.ts"/>

class Cfg extends Place{
    // The render area
    private renderArea: RenderArea = new RenderArea();

    // The map used for the language selection : match the select's options id with the actual usually two letters code used by the Saving module
    private languageSelectionMap: { [s: string]: string; } = {
        "cfgLanguageEn": "en",
        "cfgLanguageBr": "br",
        "cfgLanguageCz": "cz",
        "cfgLanguageEs": "es",
        "cfgLanguageFr": "fr",
        "cfgLanguageNl": "nl",
        "cfgLanguageZh": "zh",
        "cfgLanguageDe": "de",
        "cfgLanguageSe": "se",
        "cfgLanguageHu": "hu",
        "cfgLanguageId": "id",
        "cfgLanguageKr": "kr",
        "cfgLanguagePl": "pl",
        "cfgLanguageUk": "uk",
        "cfgLanguageRu": "ru",
        "cfgLanguageTr": "tr",
        "cfgLanguageEl": "el"
        };

    private versionSelectionMap: { [s: string]: string; } = {
        "cfgVersionBeer" : VersionType.BEER,
        "cfgVersionCandy" : VersionType.CANDY,
        "cfgVersionHealthy" : VersionType.HEALTHY
    }

    // Constructor
    constructor(game: Game){
        super(game);
        
        // Resize the area
        this.renderArea.resize(100, 48);
        
        // Update for the first time
        this.update();
    }
    
    // getRenderArea()
    public getRenderArea(): RenderArea{
        return this.renderArea;
    }
    
    // Private methods
    private drawAbout(x: number, y: number): void{
        // The title
        this.renderArea.drawArray(Database.getAscii("text/About"), x + 34, y);
        
        // Who?
        this.renderArea.drawString("Who?", x + 2, y + 7);
        this.renderArea.addBold(x+2, x+6, y+7);
        
        // Who...
        this.renderArea.drawString("Ideas, game design & code of CandyBox 2 by aniwey. (Which CandyBox 3 is based on)", x + 4, y + 9);
        this.renderArea.drawString("Ideas, game design & code of elements added in CandyBox 3 by apomalyn and Adaendra.", x + 4, y + 10);
        this.renderArea.drawString("Ascii art by Tobias Nordqvist, GodsTurf, dixsept, Dani \"Deinol\" Gómez and aniwey.", x + 4, y + 11);
        
        // License?
        this.renderArea.drawString("License?", x + 2, y + 14);
        this.renderArea.addBold(x+2, x+10, y+14);
        
        // License...
        this.renderArea.drawString("The game source code is published under the GPLv3 license. This means you are free to modify and", x + 4, y + 16);
        this.renderArea.drawString("redistribute the game, even for commercial purposes, under some conditions.", x, y + 17);
        this.renderArea.addHtmlLink(x + 76, y + 17, "source_code.html", "Learn more.");
        
        this.renderArea.drawString("The ascii art is published under the CC-BY-SA license, which means that you can reuse it if you", x + 4, y + 19);
        this.renderArea.drawString("credit the artist who made the art and share your modifications under the same license.", x, y + 20);
        this.renderArea.addHtmlLink(x + 88, y + 20, "ascii_art.html", "Learn more.");
        
        // Aything else?
        this.renderArea.drawString("Anything else?", x + 2, y + 23);
        this.renderArea.addBold(x+2, x+16, y+23);
        
        // Contact
        this.renderArea.drawString("Feel free to contact us by twitter https://twitter.com/_adaendra if you have any comments or questions :)", x + 4, y + 25);
    }

    private drawConfigurationText(x: number, y: number): void{
        this.renderArea.drawArray(Database.getAscii("text/Configuration"), x + 17, y);
    }

    // ------------------------- //
    // ----- INVERT COLORS ----- //
    // ------------------------- //
    private drawCfgInvertColors(x: number, y: number): void{
        // Text
        this.renderArea.drawString(Database.getText("cfgInvertColors"), x, y);
        this.renderArea.drawString(Database.getTranslatedText("cfgInvertColors"), x, y + 1, true);

        // The checkbox
        this.renderArea.addCheckbox(x +
            Algo.takeBiggest(Database.getText("cfgInvertColors").length, Database.getTranslatedText("cfgInvertColors").length)
            + 2,
            y,
            new CallbackCollection(this.invertColorsChecked.bind(this)),
            new CallbackCollection(this.invertColorsUnchecked.bind(this)),
            "cfgInvertColorsCheckbox",
            Saving.loadBool("gameInvertedColors"));
    }

    private invertColorsChecked(): void{
        this.setInvertedColors(true);
    }
    
    private invertColorsUnchecked(): void{
        this.setInvertedColors(false);
    }

    private setInvertedColors(invertedColors: boolean): void{
        Saving.saveBool("gameInvertedColors", invertedColors);
        this.getGame().applyInvertedColorsToCss();
        this.update();
        this.getGame().updateStatusBar(); // We also update the status bar to fix the selected tab's color
        this.getGame().updatePlace();
    }

    // -------------------- //
    // ----- LANGUAGE ----- //
    // -------------------- //
    private drawCfgLanguage(x: number, y: number): void{
        // Text
        this.renderArea.drawString(Database.getText("cfgChooseLanguage"), x, y);
        this.renderArea.drawString(Database.getTranslatedText("cfgChooseLanguage"), x, y + 1, true);

        // List
        this.renderArea.addList(x + Algo.takeBiggest(Database.getText("cfgChooseLanguage").length,
            Database.getTranslatedText("cfgChooseLanguage").length) + 2,
            x + Algo.takeBiggest(Database.getText("cfgChooseLanguage").length,
            Database.getTranslatedText("cfgChooseLanguage").length) + 20,
            y, "cfgLanguageList",
            new CallbackCollection(this.languageSelected.bind(this)),
            [
                "cfgLanguageEn", "English",
                "cfgLanguageBr", "Brazilian Portuguese (by TranslaCAT)",
                "cfgLanguageZh", "Chinese (by Fan Zhang)",
                "cfgLanguageCz", "Czech (by Keranis)",
                "cfgLanguageNl", "Dutch (by Noël Wierema and Vincent van Gennep, corrections by Wessel van den Putte)",
                "cfgLanguageFr", "French (by aniwey and Adaendra)",
                "cfgLanguageDe", "German (by Kai Kubasta)",
                "cfgLanguageEl", "Greek (by VagosLabrou)",
                "cfgLanguageHu", "Hungarian (by The_Reaper_CooL)",
                "cfgLanguageId", "Indonesian (by Richard Sudaryono)",
                "cfgLanguageKr", "Korean (by jiyeonnn03)",
                "cfgLanguagePl", "Polish (by Patryk Połomski)",
                "cfgLanguageRu", "Russian (by Julia Richter (Zen Chelios Jr.))",
                "cfgLanguageEs", "Spanish (by Saúl Ruiz Calleja and Tania López Camino)",
                "cfgLanguageSe", "Swedish (by Jessica Tsiamis)",
                "cfgLanguageTr", "Turkish (by B. Güler)",
                "cfgLanguageUk", "Ukrainian (by Volodymyr Lataniuk)"
            ]
        );

        // Add the link which will call the selectRightLanguage method after the html dom is created
        this.renderArea.addLinkCallbackCollection(new CallbackCollection(this.selectRightLanguage.bind(this)));

        // Add the special message for the chinese translation
        if(Saving.loadString("gameLanguage") == "zh"){
            this.renderArea.drawString("中文版翻译会导致少量图像显示错误，我会尽量修复它们的！", x + 9, y + 2, true);
        }
        // Add the TranslaCAT ascii art
        else if(Saving.loadString("gameLanguage") == "br"){
            this.renderArea.drawArray(Database.getAscii("general/translaCAT"), x + 70, y - 1);
            this.renderArea.addHtmlLink(x + 76, y + 7, "http://www.translacat.com/", "TranslaCAT");
        }
    }

    private languageSelected(): void{
        // Get the selected language id
        var id: string = $("#cfgLanguageList").find(":selected").attr("id");
        
        // Set the new language
        if(this.languageSelectionMap[id] != null){
            Saving.saveString("gameLanguage", this.languageSelectionMap[id]);
        }
        
        // Update Cfg
        this.update();
        this.getGame().updatePlace();
    }
    
    private selectRightLanguage(): void{
        // We iterate over all languages
        for(var language in this.languageSelectionMap){
            // If this is the right one, we select it
            if(Saving.loadString("gameLanguage") == this.languageSelectionMap[language]){
                $("#" + language).prop('selected', true);
            }
        }
    }

    // ------------------- //
    // ----- VERSION ----- //
    // ------------------- //
    private drawCfgVersion(x: number, y: number): void {
        // Text
        this.renderArea.drawString(Database.getText("cfgVersion"), x, y);
        this.renderArea.drawString(Database.getTranslatedText("cfgVersion"), x, y + 1, true);

        // List
        this.renderArea.addList(x + Algo.takeBiggest(Database.getText("cfgVersion").length, Database.getTranslatedText("cfgVersion").length) + 2,
            x + Algo.takeBiggest(Database.getText("cfgVersion").length, Database.getTranslatedText("cfgVersion").length) + 20,
            y,
            "cfgVersionList",
            new CallbackCollection(this.versionSelected.bind(this)),
            [
                "cfgVersionCandy", VersionType.CANDY,
                "cfgVersionBeer", VersionType.BEER,
                "cfgVersionHealthy", VersionType.HEALTHY
            ]
        );

        // Add the link which will call the selectRightLanguage method after the html dom is created
        this.renderArea.addLinkCallbackCollection(new CallbackCollection(this.selectRightVersion.bind(this)));
    }

    private versionSelected(): void{
        // Get the selected version id
        var id: string = $("#cfgVersionList").find(":selected").attr("id");

        // Set the new version
        if(this.versionSelectionMap[id] != null){
            Saving.saveString("gameVersion", this.versionSelectionMap[id]);
        }

        // Update Cfg
        this.update();
        this.getGame().updatePlace();
    }

    private selectRightVersion(): void{
        // We iterate over all versions
        for(var version in this.versionSelectionMap){
            // If this is the right one, we select it
            if(Saving.loadString("gameVersion") == this.versionSelectionMap[version]){
                $("#" + version).prop('selected', true);
            }
        }
    }

    // ------------------------------ //
    // ----- UPDATE RENDER AREA ----- //
    // ------------------------------ //
    private update(): void{
        // Erase everything
        this.renderArea.resetAllButSize();
        
        // The "Configuration" text
        this.drawConfigurationText(0, 0);
        
        // Language selection
        this.drawCfgLanguage(0, 8);
        
        // Invert colors checkbox
        this.drawCfgInvertColors(0, 12);

        // Version selection
        this.drawCfgVersion(0, 16);

        // "About" section
        this.drawAbout(0, 22);

    }
}
