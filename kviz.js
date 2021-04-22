// definice pole otázek
const otazky = [
    { otazka: 'Co je ikonická hračka z 80. let',
    foto: 'obrazky/moncicak.jpg',
    odpovedi: {odpoved0: 'Kočičák', odpoved1: 'Mončičák', odpoved2: 'Opičák'},
    spravnaOdpoved: 1 }
]; 

const kviz = document.querySelector('.kviz');

// vytvořit div s id poradi - pořadí otázek 1/3 - 3/3
const poradi = document.createElement('p');
poradi.id = 'poradi';
kviz.appendChild(poradi);
poradi.innerHTML = 'OTÁZKA 1/3';

// vytvořit div s id otazka
const otazka = document.createElement('p');
otazka.id = 'otazka';
kviz.appendChild(otazka);
otazka.innerHTML = otazky[0].otazka;

// vytvořit div se třídou obsah, který bude vnořený do divu se třídou kviz + vložit do HTML

const obsah = document.createElement('div');
obsah.className = 'obsah';
kviz.appendChild(obsah);

// vytvořit img, vložení do divu obsah + vložit do HTML
const foto = document.createElement('img');
foto.className = 'foto';
foto.id = 'obrazek';
foto.src = otazky[0].foto;
foto.alt = 'mončičák';
obsah.appendChild(foto);

// vytvořit ul, vložení do divu s id moznosti
// li vložit do ul s atributem data-odpoved="0" - "2"
// vložit do HTML
const moznosti = document.createElement('div');
moznosti.id = 'moznosti';

const odpovedi = document.createElement('ul');
odpovedi.id = 'odpovedi';

const odpoved0 = document.createElement('li');
odpoved0.setAttribute("data-odpoved", "0");
odpoved0.innerHTML = otazky[0].odpovedi.odpoved0;

const odpoved1 = document.createElement('li');
odpoved1.setAttribute("data-odpoved", "1");
odpoved1.innerHTML = otazky[0].odpovedi.odpoved1;

const odpoved2 = document.createElement('li');
odpoved2.setAttribute("data-odpoved", "2");
odpoved2.innerHTML = otazky[0].odpovedi.odpoved2;

obsah.appendChild(moznosti);
moznosti.appendChild(odpovedi);
odpovedi.appendChild(odpoved0);
odpovedi.appendChild(odpoved1);
odpovedi.appendChild(odpoved2);

//test
