var trex, ground, invisibleGround,trexRunning,groundImage,obstacle,cloudImage ,o1,o2,o3,o4,o5,o6, obstacleGroup, cloudGroup, gameState, gameOver, restart, gameOverIMG, restartIMG, die, jump, checkpoint

function preload(){
  trexRunning = loadAnimation("trex1.png","trex3.png","trex4.png");
  groundImage=loadImage("ground2.png");
  cloudImage=loadImage("cloud.png")
  o1=loadImage("obstacle1.png")
  o2=loadImage("obstacle2.png")
  o3=loadImage("obstacle3.png")
  o4=loadImage("obstacle4.png")
  o5=loadImage("obstacle5.png")
  o6=loadImage("obstacle6.png")
  gameOverIMG= loadImage("gameOver.png")
  restartIMG= loadImage("restart.png")
  die=loadSound("die.mp3")
  jump=loadSound("jump.mp3")
  checkpoint=loadSound("checkPoint.mp3")  
  

  
}


function setup() {
  createCanvas(600, 400);
  trex = createSprite (120,380,20,20);
  ground = createSprite (300,385,600,5);
  invisibleGround = createSprite(300,392,600,5);
  trex.addAnimation ("Running",trexRunning);
  trex.scale=1/3;
  ground.addImage("ground",groundImage)
  invisibleGround.visible=false;
  obstacleGroup = new Group();
  cloudGroup = new Group();
  gameState = "play"
  gameOver=createSprite (200,200,20,20)
  gameOver.addImage("GO",gameOverIMG)
  gameOver.visible= false;
  restart=createSprite(200,300,20,20)
  restart.addImage("R",restartIMG)
  restart.visible= false;
}


function draw() {
  
  
  background(255);
  
  drawSprites();
  

  

  
  if (gameState==="play"){
    spawnObstacle();
    spawnCloud();
      ground.velocityX=-2;
  if (ground.x<0){
    ground.x=300      
      }
      if (keyDown("space")&&trex.y>374)
      
  {
    trex.velocityY=-10
    jump.play()
    
  }
    trex.velocityY=trex.velocityY+0.28 
    
  
  
 // console.log(trex.y);
  

  trex.collide(invisibleGround);
  if (trex.isTouching(obstacleGroup)) {
    gameState="end";
    die.play()
  }
  }
  
  if (gameState==="end"){
    
    
    
    ground.velocityX=0;
    obstacleGroup.setVelocityXEach(0)
    cloudGroup.setVelocityXEach(0)
    obstacleGroup.setLifetimeEach(-1)
      cloudGroup.setLifetimeEach(-1)
    trex.velocityY=0;
    gameOver.visible=true;
    restart.visible=true;
    
      }
    

  if(mousePressedOver(restart)) {
    reset();
  }
    
  
  
}




function spawnCloud(){
if (frameCount%60===0)
    {
      
    var cloud = createSprite(700,random(100,200),20,20);
      cloud.velocityX=-2;
      cloudGroup.add(cloud)
      cloud.addImage("cloud",cloudImage)
      cloud.lifetime=350;
    }
}

function spawnObstacle(){
if (frameCount%100===0)
    {
      
    var obstacle = createSprite(700,380,20,20);
      obstacle.velocityX=-2;
      
      obstacleGroup.add(obstacle)
  
    var rand = Math.round( random(1,6))
    
    console.log (rand)
      
 if(rand===1) {
      obstacle.addImage("o1",o1)
                 }
   else if (rand===2) {
      obstacle.addImage("o2",o2)
   }
      else if (rand===3) {
      obstacle.addImage("o3",o3)
      }
      
      else if (rand===4) {
      obstacle.addImage("o4",o4)
      }
      else if (rand===5) {
      obstacle.addImage("o5",o5)
      }
      else {
      obstacle.addImage("o6",o6)
           }
           
      
      obstacle.scale=0.35;
      
      switch(rand)
      { 
        case 1:obstacle.addImage ("o1",o1);
        break;
        case 2:obstacle.addImage ("o2",o2); 
        break; 
        case 3:obstacle.addImage ("o3",o3);
        break; 
        case 4:obstacle.addImage ("o4",o4); 
        break; 
        case 5:obstacle.addImage ("o5",o5);
        break; 
        default:obstacle.addImage ("o6",o6);;
        break; }
      
      obstacle.lifetime=350;

      
    }
}

function reset(){
  gameState = "play";
  
  gameOver.visible = false;
  restart.visible = false;
  
  obstacleGroup.destroyEach();
  cloudGroup.destroyEach();
  
    

  
}
