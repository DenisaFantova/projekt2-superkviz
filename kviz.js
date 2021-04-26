// function priNacteniStranky() {
   
    // definice pole otázek
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
  const h1 = document.querySelector('h1');
         let aktualniOtazka = 0;
         let cisloOtazky = 1;

    let otazkyZKvizu = [];
    let odpovediZKvizu = [1, 2, 3];
    let spravneOdpovedi = [];
  

  // }   // konec funkce priNacteniStranky()
        function polozenaOtazka(){
             if (cisloOtazky > otazky.length ) {
                posledniOtazka();
               
            }
             
         console.log(aktualniOtazka);
            // let kviz = document.querySelector('.kviz');
           
            const kviz = document.createElement('div');
            kviz.className = 'kviz';
            h1.insertAdjacentElement("afterend", kviz);

            // vytvořit div s id poradi - pořadí otázek 1/3 - 3/3
           
            const poradi = document.createElement('p');
            poradi.id = 'poradi';
            kviz.appendChild(poradi);
            poradi.innerHTML = 'OTÁZKA' + ' ' + cisloOtazky + '/' + otazky.length;

            // vytvořit div s id otazka
            const otazka = document.createElement('p');
            otazka.id = 'otazka';
            kviz.appendChild(otazka);
            otazka.innerHTML = otazky[aktualniOtazka].otazka;
            otazkyZKvizu.push(otazky[aktualniOtazka].otazka);
            console.log(otazkyZKvizu);
            spravneOdpovedi.push(otazky[aktualniOtazka].spravnaOdpoved);
            console.log(spravneOdpovedi);

            // vytvořit div se třídou obsah, který bude vnořený do divu se třídou kviz + vložit do HTML

            const obsah = document.createElement('div');
            obsah.className = 'obsah';
            kviz.appendChild(obsah);

            // vytvořit img, vložení do divu obsah + vložit do HTML
            const foto = document.createElement('img');
            foto.className = 'foto';
            foto.id = 'obrazek';
            foto.src = otazky[aktualniOtazka].foto;
            foto.alt = 'mončičák';
            obsah.appendChild(foto);

            // PRVNÍ OTÁZKA

            // vytvořit ul, vložení do divu s id moznosti
            // li vložit do ul s atributem data-odpoved="0" - "2"
            // vložit do HTML
            const moznosti = document.createElement('div');
            moznosti.id = 'moznosti';

            const odpovedi = document.createElement('ul');
            odpovedi.id = 'odpovedi';

            let celePoleOdpovedi = otazky[aktualniOtazka].odpovedi;
            console.log(celePoleOdpovedi);
            let delkaPoleOdpovedi = Object.keys(celePoleOdpovedi).length;
            console.log(delkaPoleOdpovedi);

            for (i=0;i<delkaPoleOdpovedi;i++) {
            
                
                let li = document.createElement('li');

                 obsah.appendChild(moznosti);
                moznosti.appendChild(odpovedi);
                odpovedi.appendChild(li);
                li.setAttribute('data-odpoved', i);
                li.addEventListener('click', function() {li.className = 'vybrana-odpoved';});
                li.addEventListener('click', ulozDataOdpovedi);
                li.addEventListener('click', dalsiOtazka);
              
                
               
            } //konec cyklu, který tvoří seznam odpovědí      
                
        vypisMozneOdpovedi(); 
        
            function vypisMozneOdpovedi() {
                for (i=0;i<delkaPoleOdpovedi;i++) {
                    let x = Object.values(otazky[aktualniOtazka].odpovedi)[i];
                    let y = document.querySelectorAll('li')[i].innerHTML = x;
                    console.log(x);
                }
            } // konec funkce vypisMozneOdpovedi()
    
          
            function ulozDataOdpovedi() {
             let vybranaOdpoved = document.getElementsByClassName('vybrana-odpoved').dataset.odpoved;
              console.log(vybranaOdpoved);
                console.log('ulož data odpovědi');
                
            } // konec funkce ulozDataOdpovedi
       console.log(aktualniOtazka);
       
            aktualniOtazka++;
             cisloOtazky++;
           console.log(aktualniOtazka);

         
        
        } // konec funkce polozenaOtazka()


 
   function dalsiOtazka() {  
            smazDivKviz();
        polozenaOtazka();
         
   }

   function posledniOtazka() {
      
       vytvorDivVysledek();
       smazDivKviz();
   }

   function smazDivKviz() {
       let kviz = document.querySelector('.kviz');
        kviz.remove();
      
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
        
            
        // let hodnoceni = document.querySelector('#hodnoceni');
        hodnoceni.appendChild(otazka);
        vysledekKvizu.insertAdjacentElement('beforebegin', otazka);

        otazka.innerHTML += otazkyZKvizu[i];
        otazka.appendChild(odpoved);
        otazka.insertAdjacentElement('afterend', odpoved);

        odpoved.innerHTML += odpovediZKvizu[i];
        odpoved.appendChild(spravnaOdpoved);
        odpoved.insertAdjacentElement('afterend', spravnaOdpoved);

        spravnaOdpoved.innerHTML += spravneOdpovedi[i];       
    };

   

    
  }





        // const odpoved0 = document.createElement('li');
        // odpoved0.setAttribute("data-odpoved", "0");
        // odpoved0.addEventListener('click', vybranaOdpoved);
        // odpoved0.innerHTML = otazky[0].odpovedi.odpoved0;

        // const odpoved1 = document.createElement('li');
        // odpoved1.setAttribute("data-odpoved", "1");
        // odpoved1.addEventListener('click', vybranaOdpoved);
        // odpoved1.innerHTML = otazky[0].odpovedi.odpoved1;

        // const odpoved2 = document.createElement('li');
        // odpoved2.setAttribute("data-odpoved", "2");
        // odpoved2.innerHTML = otazky[0].odpovedi.odpoved2;
        // odpoved2.addEventListener('click', vybranaOdpoved);

        // obsah.appendChild(moznosti);
        // moznosti.appendChild(odpovedi);
        // odpovedi.appendChild(odpoved0);
        // odpovedi.appendChild(odpoved1);
        // odpovedi.appendChild(odpoved2);

  
    







