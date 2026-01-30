const canvas = document.getElementById('canvas');
let character = new MovableObject();



function init() {
    character.src = '../img/2_character_pepe/2_walk/W-22.png';
    let ctx = canvas.getContext("2d");
    
    console.log(character);
    
}