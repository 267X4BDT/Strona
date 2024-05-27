const currentImage = document.getElementById('current-image');
const prevButton = document.getElementById('prev-btn');
const nextButton = document.getElementById('next-btn');
const firstButton = document.getElementById('first-btn');
const lastButton = document.getElementById('last-btn');
const personName = document.getElementById('person-name');
const personAge = document.getElementById('person-age');
const personTraits = document.getElementById('person-traits');
const personCrime = document.getElementById('person-crime');

const images = [
    {
        src: 'image1.jpg',
        name: 'Randall Crawford',
        age: 50,
        traits: 'nadwaga, rude włosy ',
        crime: 'napad z bronią w ręku/ podszywanie pod oficera policji'
    },
    {
        src: 'image2.jpg',
        name: 'Stanley Hopson',
        age: 175,
        traits: 'blizna na lewym ramieniu',
        crime: 'kierowanie zorganizowaną grupą przestępczą'
    },
    {
        src: 'image3.jpg',
        name: 'Karen Crawford',
        age: 53,
        traits: 'rude włosy, perłowa biżuteria',
        crime: 'groźby, prześlanowania, zastraszenia'
    },
    {
        src: 'image4.jpg',
        name: 'Dusty Marlow',
        age: 27,
        traits: 'liczne tatuaże,',
        crime: 'ucieczka z więzienia'
    },
    {
        src: 'image5.jpg',
        name: 'Doktor Kuzniak',
        age: 48,
        traits: 'okulary',
        crime: 'zabójstwo'
    },
];

let currentIndex = 0;

function showImage(index) {
    currentImage.src = 'images/' + images[index].src;
    personName.textContent = 'Imię i nazwisko: ' + images[index].name;
    personAge.textContent = 'Wiek: ' + images[index].age;
    personTraits.textContent = 'Znaki szczególne: ' + images[index].traits;
    personCrime.textContent = 'Typ przestępstwa: ' + images[index].crime;
}

function showPreviousImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
}

function showNextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
}

function showFirstImage() {
    currentIndex = 0;
    showImage(currentIndex);
}

function showLastImage() {
    currentIndex = images.length - 1;
    showImage(currentIndex);
}

prevButton.addEventListener('click', showPreviousImage);
nextButton.addEventListener('click', showNextImage);
firstButton.addEventListener('click', showFirstImage);
lastButton.addEventListener('click', showLastImage);

document.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowLeft') {
        showPreviousImage();
    } else if (event.key === 'ArrowRight') {
        showNextImage();
    }
});

showImage(currentIndex);
