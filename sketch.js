var bg, bgImg
var rocket, rocketImg
var astroid, cloud
var spaceIsDown = false
var gameState = 0

var cloudGroup
var astroidGroup

function preload(){
 bgImg = loadImage("sky.jpg")
 rocketImg = loadImage("rocket.png")
 astroidImg = loadImage("astroid.png")
 cloudImg = loadImage("cloud.png")
}

function setup(){
  createCanvas(400,600)
  
  bg = createSprite(200, 300, 400, 600)
  bg.addImage("bg", bgImg)
  bg.scale = 3
  bg.velocityY = -3

  rocket = createSprite(200, 500, 10, 10)
  rocket.addImage("rocket", rocketImg)
  rocket.scale = 0.15

  cloudGroup = new Group()
  astroidGroup = new Group()
}

function draw(){
  background("white");
  if (bg.y < 0) {
    bg.y = bg.height/3
  }

  drawSprites()

  if (gameState === 1){
    spawnClouds()
    spawnAstroids()
  }

  if (gameState === 2){
    cloudGroup.setVelocityYEach(0)
    astroidGroup.setVelocityYEach(0)
    
    stroke("red")
    strokeWeight(4)
    textSize(45)
    text("Game Over (Reload)", 0, 300)
  }

  if (keyDown("SPACE") && gameState !== 2){
    rocket.y -= 10
    spaceIsDown = true
    if (gameState === 0){
      gameState = 1
    }
  } else{
    spaceIsDown = false
  }

  if (keyDown("LEFT_ARROW") && gameState === 1){
    rocket.x -= 5
  }

  if (keyDown("RIGHT_ARROW") && gameState === 1){
    rocket.x += 5
  }

  if (spaceIsDown === false && gameState === 1){
    rocket.y += 5
  }

  if (rocket.isTouching(astroidGroup) || rocket.isTouching(cloudGroup)){
    gameState = 2
    rocket.velocityY = 0
  }
}

function spawnClouds(){
    if (frameCount%150 === 0){
      cloud1 = createSprite(random(0, 500), 0, 10, 10)
      cloud1.velocityY = 1.5
      cloud1.addImage("cloud", cloudImg)
      cloud1.scale = 0.1
      cloud1.lifetime = 1000
      cloudGroup.add(cloud1)
   }
}

function spawnAstroids(){
  if (frameCount%225 === 0){
    astroid = createSprite(random(0, 400), 0, 10, 10)
    astroid.velocityY = 1.5
    astroid.addImage("astroid", astroidImg)
    astroid.scale = 0.1
    astroid.lifetime = 1000
    astroidGroup.add(astroid)
 }
}