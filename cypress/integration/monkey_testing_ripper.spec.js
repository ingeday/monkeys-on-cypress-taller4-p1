import { cyan } from "color-name"

describe('Wikipedia under monkeys', function(){
    
    it('visit wikipedia and survives monkeys', function() {
        cy.visit('https://es.wikipedia.org/wiki/Wikipedia:Portada');
        cy.wait(1000);
        randomEvent(10);
    });
})

function randomEvent(monkeysLeft) {
    // 
    function getRandomInt(min, max) {
        min=Math.ceil(min); 
        max=Math.floor(max);

        return Math.floor(Math.random() * (max-min)) + min;
    };

    function getRandomObject(arrayObject) {
        return Math.floor(Math.random()*arrayObject.length)
    }

    var monkeysLeft=monkeysLeft;
    if(monkeysLeft>0) {
        //  Seleccionar un elemento al azar que corresponda a uno de los 4 eventos 
        let objectsToSelect=['a','input','button','select'];
        
        let objectSelected = objectsToSelect[getRandomObject(objectsToSelect)];

        console.info(`It's a ${objectSelected}`);

        if(objectSelected==='a') {
            cy.get(objectSelected).then($links => {
                monkeysLeft = monkeysLeft - 1;
                var randomLink = $links.get(getRandomInt(0, $links.length));
                
                if(!Cypress.dom.isHidden(randomLink)) {
                    cy.wrap(randomLink).click({force: true});
                    
                    cy.wait(1000);
                }
                
    
            })
        }

        if(objectSelected==='input') {
            cy.get(objectSelected+'[type="search"]').then($links => {
                var randomInput = $links.get(getRandomInt(0, $links.length));
                if(Cypress.dom.isVisible(randomInput)) {
                    cy.wrap(randomInput).type(' Hello world ');
                    
                    cy.wait(2000);
                    
                }
            })
        }

        if(objectSelected==='select') {
            cy.get(objectSelected).then($links => {
                var randomSelect = $links.get(getRandomInt(0, $links.length));
                if(!Cypress.dom.isHidden(randomSelect)) {
                    cy.wrap(randomSelect).find('option').then($elm=>{
                        var aIndex=getRandomInt(0,$elm.length);
                        cy.wrap(randomSelect).select($elm[aIndex].value);

                        
                        cy.wait(2000);
                        
                    })
                }
                
                
            })
        }

        if(objectSelected==='button') {
            cy.get(objectSelected).then($links => {  
                
                var randomButton = $links.get(getRandomInt(0, $links.length));  

                if(Cypress.dom.isVisible(randomButton)) {            
                    console.log($links);
                    var randomInput = $links.get(getRandomInt(0, $links.length));
                    cy.wrap(randomInput).click({force:true});

                    
                    cy.wait(2000);
                    
                }
            })
        }

        monkeysLeft = monkeysLeft - 1;
        randomEvent(monkeysLeft);
        
    }

}

function randomClick(monkeysLeft) {
    function getRandomInt(min, max) {
        min=Math.ceil(min); 
        max=Math.floor(max);

        return Math.floor(Math.random() * (max-min)) + min;
    };

    var monkeysLeft=monkeysLeft;

    if(monkeysLeft>0) {
        cy.get('a').then($links => {
            var randomLink = $links.get(getRandomInt(0, $links.length));

            if(!Cypress.dom.isHidden(randomLink)) {
                cy.wrap(randomLink).click({force: true});
                monkeysLeft = monkeysLeft - 1;
            }
            cy.wait(500);
            randomClick(monkeysLeft);
        })
    }

}