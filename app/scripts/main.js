var b2Vec2 = Box2D.Common.Math.b2Vec2
 , b2BodyDef = Box2D.Dynamics.b2BodyDef
 , b2Body = Box2D.Dynamics.b2Body
 , b2FixtureDef = Box2D.Dynamics.b2FixtureDef
 , b2Fixture = Box2D.Dynamics.b2Fixture
 , b2World = Box2D.Dynamics.b2World
 , b2MassData = Box2D.Collision.Shapes.b2MassData
 , b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape
 , b2CircleShape = Box2D.Collision.Shapes.b2CircleShape
 , b2DebugDraw = Box2D.Dynamics.b2DebugDraw;

window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       || 
              window.webkitRequestAnimationFrame || 
              window.mozRequestAnimationFrame    || 
              window.oRequestAnimationFrame      || 
              window.msRequestAnimationFrame     || 
              function(/* function */ callback, /* DOMElement */ element){
                window.setTimeout(callback, 1000 / 60);
              };
})();

var canvas = document.getElementById("worldC");
var ctx = canvas.getContext("2d");
var world;
var bodyDef;
var fixDef;
var rightPipe;

function init() {
   world = new b2World(
         new b2Vec2(0, 10)    //gravity
      ,  true                 //allow sleep
   );
   
   var SCALE = 30;
 
   fixDef = new b2FixtureDef;
   fixDef.density = 1.0;
   fixDef.friction = 0.5;
   fixDef.restitution = 0.2;
 
   bodyDef = new b2BodyDef;
 
   //create ground
   bodyDef.type = b2Body.b2_staticBody;
   
   // positions the center of the object (not upper left!)
   bodyDef.position.x = canvas.width / 2 / SCALE;
   bodyDef.position.y = (canvas.height / SCALE)- 0.5/2;
   
   fixDef.shape = new b2PolygonShape;
   
   // half width, half height. eg actual height here is 1 unit
   fixDef.shape.SetAsBox((canvas.width / SCALE) / 2, 0.5 / 2);
   world.CreateBody(bodyDef).CreateFixture(fixDef);
   
   fixDef.shape.SetAsBox(0.5/2 , canvas.height / SCALE / 2);
   bodyDef.position.x = 0.5/2;
   bodyDef.position.y = 10;
   world.CreateBody(bodyDef).CreateFixture(fixDef);
   
   fixDef.shape.SetAsBox(0.5/2 , canvas.height / SCALE / 2);
   bodyDef.position.x = canvas.width/SCALE - 0.5/2;
   bodyDef.position.y = 10;
   world.CreateBody(bodyDef).CreateFixture(fixDef);
   rightPipe = bodyDef;
   
   
   
   //setup debug draw
   var debugDraw = new b2DebugDraw();
   debugDraw.SetSprite(document.getElementById("worldC").getContext("2d"));
   debugDraw.SetDrawScale(SCALE);
   debugDraw.SetFillAlpha(0.3);
   debugDraw.SetLineThickness(1.0);
   debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
   world.SetDebugDraw(debugDraw);
 
   // restart
}; // init()

function update() {
   world.Step(
         1 / 60   //frame-rate
      ,  10       //velocity iterations
      ,  10       //position iterations
   );
   world.DrawDebugData();
   world.ClearForces();
 
   requestAnimFrame(update);
}; // update()

init();
requestAnimFrame(update);

$('canvas').click(function(){
/*
	   //create dynamic circle object
   bodyDef.type = b2Body.b2_dynamicBody;
   fixDef.shape = new b2CircleShape(
      Math.random() + 0.1 //radius
   );
   bodyDef.position.x = 1;
   bodyDef.position.y = 2;
   world.CreateBody(bodyDef).CreateFixture(fixDef);
   
   // create dynamic polygon object
   bodyDef.type = b2Body.b2_dynamicBody;
   fixDef.shape = new b2PolygonShape;
   fixDef.shape.SetAsBox(
         Math.random() + 0.1 //half width
      ,  Math.random() + 0.1 //half height
   );
   bodyDef.position.x = Math.random() * 25;
   bodyDef.position.y = Math.random() * 10;
   world.CreateBody(bodyDef).CreateFixture(fixDef);
*/
});