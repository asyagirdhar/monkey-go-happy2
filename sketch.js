//to make global variables
      var player, player_running;
      var ground, back, backimg,bananaimg,stoneimg;
      var bananasgroup,obstaclegroup;

      var count=0;

      function preload() {

        //to make animations  
        player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png"); 
           backimg = loadImage("jungle.jpg");
          bananaimg = loadImage("banana.png");
        stoneimg =    loadImage("stone.png"); 



      }
      function setup() {
        //create canvas
            createCanvas(400, 400);

        //to make the count coloured and with a different font and size
          stroke("white");
            textSize(20);
            fill("white");

        //to make a player
          player = createSprite(50,380,20,20);
          player.addAnimation("running", player_running);
          player.scale=0.09;

//to make the background
            back = createSprite(20,200,400,200);
          back.addImage("ground",backimg);
          back.scale=1;

          back.velocityX = -1;
            back.x = back.width /2;

        //to make the ground
            ground = createSprite(20,380,600,10);
          ground.x = ground.width /2;

//to make bananagroup
          bananasgroup=new Group();


//to make obstacle group
          obstaclegroup=new Group();


      }

      function draw() {
        //to give background
        background(205);

        //when space is pressed then the player jumps
       if(keyDown("space") && player.y>=299)
               {
                  player.velocityY = -10 ;

                }
//to give gravity
                  player.velocityY=player.velocityY+0.8;      


//to move the background
        if (back.x < 0){
             back.x = back.width/2;


              }
//to make ground move
        if (ground.x < 0){
          ground.x = ground.width/2;


              }


//to reduce the size of the player when touching obstacles  
        if(obstaclegroup.isTouching(player))
        {
            player.scale=0.07;

        }
//to collide player with ground
          player.collide(ground);

        //to call bananas and obstacles
        spawnbananas();
        spawnobstacles();

        
        //to add 2 points after touching banana
         if(bananasgroup.isTouching(player))
        {
             bananasgroup.destroyEach();
            count=count+2;
       }

        switch(count){
          case 10:player.scale=0.12;
          break;
          case 20:player.scale=0.14;
              break;
              case 30:player.scale=0.16;
              break;
             case 40:player.scale=0.18;
              break; 
              default:break;
        }


        drawSprites();
        text("Score: "+ count, 270, 50);
      }
//to spawn bananas
      function spawnbananas() {
        //write code here to spawn the clouds
        if (frameCount % 80 === 0) {
            var banana = createSprite(600,290,40,10);
          banana.addImage(bananaimg);
            banana.scale = 0.09;
            banana.velocityX = -3;

             //assign lifetime to the variable
           banana.lifetime = 300;

            //adjust the depth
           banana.depth = player.depth;
            player.depth = player.depth + 1;

            //add each cloud to the group
         bananasgroup.add(banana);
        }

      }
//to spawn obstacles
      function spawnobstacles() {
          if(frameCount % 60 === 0) {
            var obstacle = createSprite(600,375,10,40);
            obstacle.velocityX = - 4;
           obstacle.addImage(stoneimg); 

            obstacle.scale = 0.09;
            obstacle.lifetime = 300;
            //add each obstacle to the group
            obstaclegroup.add(obstacle);
        }
      }

