var dogImg,happyDog,database,foodS,foodStock,dog,milk;
var feed,addFood,fedTime,lastFed,foodObj,addFoods;

function preload()
{
dogImg=loadImage("images/dogImg.png");
happyDog=loadImage("images/dogImg1.png");
}

function setup() {
createCanvas(1000, 500);
database=firebase.database();

foodObj= new Food();

dog=createSprite(850,250,2,40)
dog.addImage(dogImg)
dog.scale=0.25;

foodStock=database.ref("Food")
foodStock.on("value",readStock)

feed=createButton("Feed the dog");
feed.position(700,95);
feed.mousePressed(feedDog);

addFood=createButton("Add Food");
addFood.position(800,95);
addFood.mousePressed(addFoods);
}


function draw() {  
background(46,139,87)
foodObj.display();
fedTime=database.ref('FeedTime');
fedTime.on("value",function(data){
  lastFed=data.val();
});

fill(0)

if(lastFed>=12){
  text("Last Feed : "+ lastFed%12 + " PM", 350,30);
 }else if(lastFed==0){
   text("Last Feed : 12 AM",350,30);
 }else{
   text("Last Feed : "+ lastFed + " AM", 350,30);
 }
  drawSprites();
 // text("Food Stock:"+foodS,20,20)
  
  
}

function readStock(data){
foodS=data.val();
foodObj.updateFoodStock(foodS);
}

function feedDog(){
  dog.addImage(happyDog);

  //foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  if(foodObj.getFoodStock()<=0){
    foodObj.updateFoodStock(foodObj.getFoodStock()*0);
  }
  else{
    foodObj.updateFoodStock(foodObj.getFoodStock()-1);  
  }

  database.ref("/").update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}