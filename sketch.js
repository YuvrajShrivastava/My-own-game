var man_running,man
var ground
var score = 0;
var obstacle
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var gameOverImage
var gameOver

function preload(){
man_running = loadAnimation("m1.jpg","m2.jpg","m3.jpg","m4.jpg");
obstacleImage = loadImage("o1.jpg");
gameOverImage = loadImage("gameOver.png");
}

function setup() {
    createCanvas(600,200);
    man = createSprite(50,130,20,50);
    man.addAnimation("running", man_running);
    man.scale = 0.3;

    ground = createSprite(0,190,1200,10);
    ground.x = ground.width /2;
    //ground.velocityX = -(6 + 3*score/100);
    gameOver=createSprite(300,100);
    gameOver.addImage(gameOverImage);
  
    gameOver.scale=0.5;
    gameOver.visible = false
    obstaclesGroup = new Group();
  
}

function draw(){
    background(300);
    if (gameState===PLAY){
        //score = score + Math.round(getFrameRate()/60);

         

       
         if(keyDown("space") && man.y >= 129) {
           man.velocityY = -13;
         }
       
         man.velocityY = man.velocityY + 0.8
       
       
       
         man.collide(ground);
         
    
         spawnObstacles();
       
        if(obstaclesGroup.isTouching(man)){
             gameState = END;
         
         }
        }else
        if (gameState === END ) {

            gameOver.visible=true
            
            //set velcity of each game object to 0
           
            man.velocityY = 0;
            obstaclesGroup.setVelocityXEach(0);
           
            
            //change the trex animation
       
            
            //set lifetime of the game objects so that they are never destroyed
            obstaclesGroup.setLifetimeEach(-1);
        }

   
    drawSprites();

}
function spawnObstacles() {
    if(frameCount % 60 === 0) {
      var obstacle = createSprite(600,152,10,40);    
      //generate random obstacles
obstacle.addImage(obstacleImage)
          
      obstacle.velocityX = -(10 + 3*score/100);
      
                
      obstacle.scale = 1;
      obstacle.lifetime = 300;
      score = score+1;
      obstacle.depth = man.depth
      man.depth = obstacle.depth+1

      obstaclesGroup.add(obstacle);
    }
  }