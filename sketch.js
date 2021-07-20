var spaceImg, space;
var meteorite, meteoriteImg, meteoriteGroup;
var rocket, rocketImg;
var gameState = "play"

function preload(){
    rocketImg = loadImage("rocket.jpg")
    spaceImg = loadImage("space.jpg")
    meteoriteImg = loadImage("meteorite.jpg")
}

function setup(){
createCanvas(600,600)
space= createSprite(300,300)
space.addImage("bg image", spaceImg);
space.velocityY = 1;

meteoriteGroup = new Group()
rocket = createSprite(200,200,50,50)
rocket.scale = 0.2;
rocket.addImage("rocket", rocketImg)

}

function draw(){
background(0);
if(gameState === "play"){
    if(keyDown("left_arrow")){
        rocket.x = rocket.x - 3;
    }
    if(keyDown("right_arrow")){
        rocket.x = rocket.x + 3;
    }
    if(keyDown("space")){
        rocket.velocityY = -10;
    }
    rocket.velocityY = rocket.velocityY + 0.8;

    if(space.y > 400){
        space.y = 300
    }
    spawnMeteorites()

    if(meteoriteGroup.isTouching(rocket) || rocket.y>600){
        rocket.velocityY = 0;
        rocket.destroy()
        gameState = "end"
    }
    drawSprites();
}
if(gameState === "end"){
    stroke ("yellow")
    fill("white");
    textSize(30)
    text("Game Over", 230,250)
}
}

function spawnMeteorites(){
    if(frameCount % 200 === 0){
        var meteorite = createSprite(200,10)
        meteorite.scale = 0.05;
        meteorite.x = Math.round(random(120,400))

        meteorite.addImage(meteoriteImg);
        meteorite.velocityY = 1
         
        rocket.depth = meteorite.depth;
        rocket.depth+=1;

        meteorite.lifetime = 600;
        meteoriteGroup.add(meteorite)
    }
}