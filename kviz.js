// vytvoření pole otázek
const otazky = [
{ otazka: 'Co je ikonická hračka z 80. let?',
foto: 'obrazky/moncicak.jpg',
odpovedi: {odpoved0: 'Kočičák', odpoved1: 'Mončičák', odpoved2: 'Opičák'},
spravnaOdpoved: 1 },
{ otazka: 'Jaké je matějovo nejoblíbenější ovoce?',
foto: 'obrazky/ovoce.jpg',
odpovedi: {odpoved0: 'Kokos', odpoved1: 'Melounek', odpoved2: 'Jahoda', odpoved3: 'Ani jedna z možností'},
spravnaOdpoved: 2 },
{ otazka: 'Pro úspěšné absolvování kurzu je potřeba...',
foto: 'obrazky/pivo.jpg',
odpovedi: {odpoved0: 'Umět JavaScript', odpoved1: 'Chodit po kurzu do hospody'},
spravnaOdpoved: 0 }
]; 

// globální proměnné
const h1 = document.querySelector('h1');
let aktualniOtazka = 0;
let cisloOtazky = 1;
let otazkyZKvizu = [];
let odpovediZKvizu = [];  
let dataOdpovediZKvizu = [];
let spravneOdpovedi = [];   // pole pro uložení správných odpovědí k porovnání s odpovědí zadané uživatelem

    function polozenaOtazka(){
      
        if (cisloOtazky > otazky.length ) {
            posledniOtazka();       // pokud je otázka poslední, zavolá se funkce pro zobrazení výsledku kvízu
        } 
        
        if (cisloOtazky <= otazky.length) {
            // console.log(aktualniOtazka); //test
                
            const kviz = document.createElement('div');
            kviz.className = 'kviz';
            h1.insertAdjacentElement("afterend", kviz);

            // vytvořit div s id poradi
            // pořadí otázek 1/3 - 3/3
            // vložit do HTML do divu s id kviz
            const poradi = document.createElement('p');
            poradi.id = 'poradi';
            kviz.appendChild(poradi);
            poradi.innerHTML = 'OTÁZKA' + ' ' + cisloOtazky + '/' + otazky.length;

            // vytvořit div s id otazka - vložit pod div s id poradi
            const otazka = document.createElement('p');
            otazka.id = 'otazka';
            kviz.appendChild(otazka);
            otazka.innerHTML = otazky[aktualniOtazka].otazka;   // vložení aktální otázky do HTML
            otazkyZKvizu.push(otazky[aktualniOtazka].otazka);   // vložení aktuální otázky do pole s otázkami z kvízu
            // console.log(otazkyZKvizu);   // test
            spravneOdpovedi.push(otazky[aktualniOtazka].spravnaOdpoved);   // vložení správné odpovědi do pole k ověření // vkládá zatím jen číslo odpovědi... pro kontrolu jestli se pole zobrazuje
            // console.log(spravneOdpovedi);   // test

            // vytvořit div se třídou obsah
            // který bude vnořený do divu se třídou kviz
            // vložit do HTML
            const obsah = document.createElement('div');
            obsah.className = 'obsah';
            kviz.appendChild(obsah);

            // vytvořit img
            // vložení do divu obsah
            // vložit do HTML
            const foto = document.createElement('img');
            foto.id = 'obrazek';
            foto.src = otazky[aktualniOtazka].foto;
            foto.alt = 'mončičák';
            obsah.appendChild(foto);

            // vytvořit div s id moznosti
            // vytvořit ul
            // li vložit do ul s atributem data-odpoved="0" - "2"
            // vložit do HTML
            const moznosti = document.createElement('div');
            moznosti.id = 'moznosti';

            const odpovedi = document.createElement('ul');
            odpovedi.id = 'odpovedi';

            let celePoleOdpovedi = otazky[aktualniOtazka].odpovedi; 
            // console.log(celePoleOdpovedi);   // test
            let delkaPoleOdpovedi = Object.keys(celePoleOdpovedi).length;   // zjištění počtu možných odpovědí ke konkrétní otázce
            // console.log(delkaPoleOdpovedi);  // test

            for (i=0;i<delkaPoleOdpovedi;i++) {             // vytvoření potřebného počtu li pro vložení možných odpovědí
                let li = document.createElement('li');
                obsah.appendChild(moznosti);
                moznosti.appendChild(odpovedi);
                odpovedi.appendChild(li);
                li.setAttribute('data-odpoved', i);
                li.addEventListener('click', function() {li.className = 'vybrana-odpoved';});   // při kliku přidání třídy na vybranou odpověď pro zjištění data-odpoved
                li.addEventListener('click', ulozOdpoved);        // při kliku volání funkce ulozOdpoved - měla by uložit text odpovědi
                li.addEventListener('click', dalsiOtazka);        // při kliku volání funkce pro zobrazení další otázky  
                
            } //konec cyklu, který tvoří seznam odpovědí      
                
            vypisMozneOdpovedi(); 
            
                function vypisMozneOdpovedi() {     // vložení možných odpovědí do HTML
                    for (i=0;i<delkaPoleOdpovedi;i++) {
                        let x = Object.values(otazky[aktualniOtazka].odpovedi)[i];
                        let y = document.querySelectorAll('li')[i].innerHTML = x;
                    // console.log(x);   // test
                        
                    }
            } // konec funkce vypisMozneOdpovedi()

        
            // console.log(aktualniOtazka); // test
            aktualniOtazka++;
            cisloOtazky++;
            // console.log(aktualniOtazka); // test

        } // konec podmínky, která se vykonává, dokud kvíz pokračuje (následuje další otázka)
   
    } // konec funkce polozenaOtazka()


    function dalsiOtazka() {  
        smazDivKviz();
        polozenaOtazka();
    }

    function posledniOtazka() {
        vytvorDivVysledek(); 
    }

    function smazDivKviz() {
        let kviz = document.querySelector('.kviz');
        kviz.remove();
    }

    function ulozOdpoved() {
        let vybranaOdpoved = document.querySelector('.vybrana-odpoved').textContent;
        odpovediZKvizu.push(vybranaOdpoved);
        let dataOdpoved = parseInt(document.querySelector('.vybrana-odpoved').dataset.odpoved);
        dataOdpovediZKvizu.push(dataOdpoved);

        console.log(vybranaOdpoved);
        console.log(odpovediZKvizu);
        console.log(dataOdpoved); 
        console.log(dataOdpovediZKvizu);
    }

    let vysledek = document.createElement('div');

    function vytvorDivVysledek() {

        vysledek.className = 'vysledek';
        h1.insertAdjacentElement("afterend", vysledek);
        vysledek.style.display = 'block';

        let hodnoceni = document.createElement('h2');
        hodnoceni.id = 'hodnoceni';
        hodnoceni.innerHTML = 'Tvoje hodnocení';
        vysledek.appendChild(hodnoceni);

        let vysledekKvizu = document.createElement('h2');
        vysledekKvizu.id = 'vysledek-kvizu';
        vysledek.append(vysledekKvizu);
        vysledekKvizu.innerHTML = "Správně \ x ze " + otazky.length + '\ otázek. \ Úspěšnost \ x \ %.';

        for (i=0;i<otazkyZKvizu.length;i++) {
            let otazka = document.createElement('h3');
            let odpoved = document.createElement('p');
            let spravnaOdpoved = document.createElement('p');
                        
            hodnoceni.appendChild(otazka);
            vysledekKvizu.insertAdjacentElement('beforebegin', otazka);

            otazka.innerHTML = otazkyZKvizu[i];
            otazka.appendChild(odpoved);
            otazka.insertAdjacentElement('afterend', odpoved);

            odpoved.innerHTML = 'Tvoje odpověď: ' + odpovediZKvizu[i];
            odpoved.appendChild(spravnaOdpoved);
            odpoved.insertAdjacentElement('afterend', spravnaOdpoved);

            spravnaOdpoved.innerHTML = 'To je ' + jeOdpovedSpravna();
            //spravneOdpovedi[i];       

        } // konec cyklu, který vkládá odpovědi do HTML

    }// konec funkce vytvorDivVysledek

function jeOdpovedSpravna () {
    if (dataOdpovediZKvizu[i] == spravneOdpovedi[i]) {
        return 'SPRÁVNĚ';
    } else {
        return 'ŠPATNĚ';    }


}













