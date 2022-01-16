let img
let dim = {width: 180, height: 270};
let {Engine, Runner, Bodies, Composite, Mouse,Render, MouseConstraint, Events} = Matter;
let walls = [];
let books = [];

var c = {width: 800, height: 580}

walls.push(Bodies.rectangle(c.width/2,c.height,c.width,10, { isStatic: true }));
walls.push(Bodies.rectangle(c.width/2,0,c.width,10, { isStatic: true }));
walls.push(Bodies.rectangle(0,c.height/2,10,c.height, { isStatic: true }));
walls.push(Bodies.rectangle(c.width,c.height/2,10,c.height, { isStatic: true }));
let canvas;
function preload() {
  for(let i = 1; i <= 3; i++) {
    let book = {
      body: Bodies.rectangle(50+i*50,50,dim.width,dim.height),
      img: loadImage("../books/img" + i + ".png"),
    }
    books.push(book);
  }
}

function setup() {
  canvas = createCanvas(c.width,c.height);
  imageMode(CENTER);
  let engine = Engine.create();
  for(let i = 0; i < books.length; i++) {
    Composite.add(engine.world, books[i].body);
  }
  Composite.add(engine.world, walls);
  let runner = Runner.create();
  Runner.run(runner, engine);
  let mouse = Mouse.create(canvas.elt);
  mouse.pixelRatio = 2;
  let mc = MouseConstraint.create(engine, {mouse: mouse});
  Composite.add(engine.world, mc);

  var render = Render.create({
    element: document.body,
    engine: engine
});

//  Render.run(render);


}

function draw() {
   background("#DBF9FC");
   //background(0);
   for(let i = 0; i < books.length; i++) {
     let b = books[i];
      push();
      let pos = b.body.position;
      translate(pos.x, pos.y);
      rotate(b.body.angle);
      image(b.img, 0,0,dim.width,dim.height);
      pop();
   }
 
}

