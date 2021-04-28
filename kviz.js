// vytvoření pole otázek

const otazky = [
    { otazka: 'Co je ikonická hračka z 80. let?',
    foto: 'obrazky/moncicak.jpg',
    odpovedi: ['Kočičák', 'Mončičák', 'Opičák'],
    spravnaOdpoved: 1, alt: 'mončičák'},
    { otazka: 'Jaké je matějovo nejoblíbenější ovoce?',
    foto: 'obrazky/ovoce.jpg',
    odpovedi: ['Kokos', 'Melounek', 'Jahoda', 'Ani jedna z možností'],
    spravnaOdpoved: 2, alt: 'ovoce' },
    { otazka: 'Pro úspěšné absolvování kurzu je potřeba...',
    foto: 'obrazky/pivo.jpg',
    odpovedi: ['Umět JavaScript', 'Chodit po kurzu do hospody'],
    spravnaOdpoved: 0, alt: 'pivo' }
    ]; 

// test, jestli je kvíz univerzální na větší počet otázek
otazky.push({ otazka: 'Testovací otázka,jestli funguje přidání otázky do pole',
foto: 'obrazky/otaznik.jpg',
odpovedi: ['Funguje', 'Nefunguje', 'Těžko říct'],
spravnaOdpoved: 0,
alt: 'otaznik' });

// globální proměnné
const h1 = document.querySelector('h1');
let bod = 0;
let aktualniOtazka = 0;
let cisloOtazky = 1;
let otazkyZKvizu = [];
let odpovediZKvizu = [];  
let dataOdpovediZKvizu = [];
let spravneOdpovediIndex = [];
let spravneOdpovediText = [];
let aktualniSpravnaOdpoved = [];

    function polozenaOtazka(){
      
        if (cisloOtazky > otazky.length ) {
            posledniOtazka();       // pokud je otázka poslední, zavolá se funkce pro zobrazení výsledku kvízu
        } 
        
        if (cisloOtazky <= otazky.length) {

            // vytvořit div s class="kviz"
            // vyložení divu do HTML      
            const kviz = document.createElement('div');
            kviz.className = 'kviz';
            h1.insertAdjacentElement("afterend", kviz);

            // vytvořit div s id="poradi"
            // pořadí otázek 1/x - x/x
            // vložit do HTML do divu s id="kviz"
            const poradi = document.createElement('p');
            poradi.id = 'poradi';
            kviz.appendChild(poradi);
            poradi.innerHTML = 'OTÁZKA' + ' ' + cisloOtazky + '/' + otazky.length;

            // vytvořit div s id="otazka" 
            // vložit do HTML pod div s id="poradi"
            const otazka = document.createElement('p');
            otazka.id = 'otazka';
            kviz.appendChild(otazka);
            otazka.innerHTML = otazky[aktualniOtazka].otazka;   // vložení otázky do HTML
            otazkyZKvizu.push(otazky[aktualniOtazka].otazka);   // uložení do pole se všemi položenými otázkami
            spravneOdpovediIndex.push(otazky[aktualniOtazka].spravnaOdpoved);  // uložení indexu správné odpovědi do pole (k následnému porovnání) - zdroj: pole objektů
            let aktualniSpravnaOdpovedIndex = otazky[aktualniOtazka].spravnaOdpoved;  // zjištění indexu správné odpovědi    
            let aktualniSpravnaOdpovedText = otazky[aktualniOtazka].odpovedi[aktualniSpravnaOdpovedIndex];  // využití tohoto indexu pro zjištění textu správné odpovědi
            spravneOdpovediText.push(aktualniSpravnaOdpovedText);   // vložení totoho textu správné odpovědi do pole
            
            // vytvořit div s class="obsah"
            // vložit do HTML - vnořit do div s class="kviz"
            const obsah = document.createElement('div');
            obsah.className = 'obsah';
            kviz.appendChild(obsah);

            // vytvořit img
            // vložit do HTML  vložení do divu obsah
            const foto = document.createElement('img');
            foto.id = 'obrazek';
            foto.src = otazky[aktualniOtazka].foto;
            foto.alt = otazky[aktualniOtazka].alt;
            obsah.appendChild(foto);

            // vytvořit div s id="moznosti"
            // vytvořit ul
            // vložit do HTML - li vložit do ul s atributem data-odpoved="0" - "x"
            const moznosti = document.createElement('div');
            moznosti.id = 'moznosti';

            const odpovedi = document.createElement('ul');
            odpovedi.id = 'odpovedi';

            let celePoleOdpovedi = otazky[aktualniOtazka].odpovedi;         // naplnění pole možných odpovědí ke konkrétní otázce
            let delkaPoleOdpovedi = Object.keys(celePoleOdpovedi).length;   // zjištění počtu možných odpovědí ke konkrétní otázce
           
            for (i=0;i<delkaPoleOdpovedi;i++) {             // vytvoření potřebného počtu li pro vložení možných odpovědí
                let li = document.createElement('li');
                obsah.appendChild(moznosti);
                moznosti.appendChild(odpovedi);
                odpovedi.appendChild(li);
                li.setAttribute('data-odpoved', i);
                li.addEventListener('click', (odpoved) => {
                    let vybranaOdpoved = odpoved.target.textContent;    // zachycení textu vybrané odpovědi
                    odpovediZKvizu.push(vybranaOdpoved);                // vložení této odpovědi do pole
                    let dataOdpoved = parseInt(odpoved.target.dataset.odpoved); // zachycení data odpovědi vybrané odpovědi
                    dataOdpovediZKvizu.push(dataOdpoved);                       // vložení tohoto data do pole
                });
                li.addEventListener('click', dalsiOtazka);        // při kliku zavolá funkci pro zobrazení další otázky  
                
            } //konec cyklu, který tvoří seznam odpovědí      
                
            vypisMozneOdpovedi(); 
            
                function vypisMozneOdpovedi() {     // vložení možných odpovědí do HTML
                    for (i=0;i<delkaPoleOdpovedi;i++) {
                        let x = Object.values(otazky[aktualniOtazka].odpovedi)[i];
                        let y = document.querySelectorAll('li')[i].innerHTML = x;
                    }
            } // konec funkce vypisMozneOdpovedi()

            aktualniOtazka++;
            cisloOtazky++;
            
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

    // funkce na vytvoření div s class="vysledek"
    let vysledek = document.createElement('div');

    function vytvorDivVysledek() {

        // vložit do HTML - div s class="vysledek"
        // zviditelnit tento div
        vysledek.className = 'vysledek';
        h1.insertAdjacentElement("afterend", vysledek);
        vysledek.style.display = 'block';

        // vložit do HTML - div s id="hodnoceni"
        let hodnoceni = document.createElement('h2');
        hodnoceni.id = 'hodnoceni';
        hodnoceni.innerHTML = 'Tvoje hodnocení';
        vysledek.appendChild(hodnoceni);

        // vytvořit div s id="vysledek-kvizu" - otázky a odpovědi se budou řadit nad tento div
        let vysledekKvizu = document.createElement('h2');
        vysledekKvizu.id = 'vysledek-kvizu';
        vysledek.append(vysledekKvizu);
        // vložení obsahu do divu následuje až po vyhodnocení správných odpovědí


        // vložit do HTML otázky, odpovědi a informaci, zda odpověď byla správna (pokud ne, zobrazit správnou odpověď)
        for (i=0;i<otazkyZKvizu.length;i++) {   // prochází celé pole, kde jsou uložené všechny položené otázky
            let cisloOtazky = i + 1;            // zaznamenává pořadí otázky
            let otazka = document.createElement('h3');     // vytvoření elementu h3 pro vypsání otázky do HTML
            let odpoved = document.createElement('p');      // vytvoření elementu p pro vypsání vybrané odpovědi
            let spravnaOdpoved = document.createElement('p');   // vytvoření elementu p pro vyhodnocení správné/špatné odpovědi, případně vypsání správné odpovědi
                        
            hodnoceni.appendChild(otazka);
            vysledekKvizu.insertAdjacentElement('beforebegin', otazka);

            otazka.innerHTML = cisloOtazky + '. ' + otazkyZKvizu[i];
            otazka.appendChild(odpoved);
            otazka.insertAdjacentElement('afterend', odpoved);

            odpoved.innerHTML = '<em>Tvoje odpověď: </em>' + odpovediZKvizu[i];
            odpoved.appendChild(spravnaOdpoved);
            odpoved.insertAdjacentElement('afterend', spravnaOdpoved);

            spravnaOdpoved.innerHTML = '<em>To je</em> ' + jeOdpovedSpravna() + '. ';
            
        } // konec cyklu, který vkládá odpovědi do HTML

        // vložení výsledku kvízu - kolik otázek z kolika bylo správně a úspěšnost v procentech (v celých procentech)
        vysledekKvizu.innerHTML = 'Správně ' + bod + ' ze ' + otazky.length + ' otázek. Úspěšnost ' + uspesnost() + ' %.';
    
}// konec funkce vytvorDivVysledek



function jeOdpovedSpravna() {

    if (dataOdpovediZKvizu[i] == spravneOdpovediIndex[i]) {     // porovnání jestli je odpověď správná
        // pokud je odpověď správná    
        bod++;      // přičtu bod          
        return '<b>SPRÁVNĚ</b>';  // zobrazím ve vyhodnocení kvízu, že byla odpověď správná 
        
    } else {
        // pokud je odpověď špatná    
        return 'ŠPATNĚ. Správná odpověď je: ' + '<b>' + spravneOdpovediText[i] + '</b>';    // zobrazím ve vyhodnocení kvízu, že byla odpověď špatná a správnou odpověď
     }
}

function uspesnost() {
    return Math.round(bod / otazkyZKvizu.length * 100);    // vrací hodnotu úspěšnosti v procentech (zaokrouhleno na celé číslo)
}













