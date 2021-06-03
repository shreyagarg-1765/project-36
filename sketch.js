//Create variables here
var dog, database,foodS,foodStock;
var foodObj;
var sadDog,happyDog;
var fedTime,lastFed,feed,addFood;
function preload()
{
	//load images here
  sadDog= loadImage("images/dogImg.png")
  happyDog= loadImage("images/happydogimg.png")
}

function setup() {
	createCanvas(1000, 400);
  database= firebase.database();

  foodObj=new Food();

  foodStock= database.ref('Food');
  foodStock.on("value",readStock);
  //foodStock.set(20);

  dog= createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  feed= createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood= createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods)



  
}


function draw() {  
  background("green");

  foodObj.display();

  fedTime= database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  })
   
  fill(255,255,254);
  textSize(15);
  if(lastFed >=12){
    text("Last Feed  "+lastFed %12 +"PM",350,30);
  }
  else if (lastFed ==0){
    text("Last Feed : 12AM" , 350,30)

  }
   else{
     text("Last Feed " + lastFed+ "AM" ,350,30)
   }
   
  drawSprites();
  }
  //add styles here

  function readStock(data){
    foodS=data.val();
    foodObj.updateFoodStock(foodS);
  }
  
  function feedDog()  {
    dog.addImage(happyDog);

    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
    database.ref('/').update({
      Food : foodObj.getFoodStock(),
      FeedTime : hour()

    })
    
    

  }

 function addFoods(){
   foodS++;
   database.ref('/').update({
     Food :foodS
   })
 }

 
/*function writeStock(x){
  if(x<=0){
    x=20;
  }
  else{
    x=x-1;
    foodS=x;
  }
}*/
  

