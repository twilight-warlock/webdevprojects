const {
  Engine,
  Render,
  Runner,
  World,
  Bodies,
  MouseConstraint,
  Mouse,
} = Matter;

const width = 800,
  height = 600;

const engine = Engine.create();
const { world } = engine;
const render = Render.create({
  element: document.body,
  engine: engine,
  options: {
    width,
    wireframes: false,
    height,
  },
});
Render.run(render);
Runner.run(Runner.create(), engine);

World.add(
  world,
  MouseConstraint.create(engine, {
    mouse: Mouse.create(render.canvas),
  })
);

const walls = [
  Bodies.rectangle(400, 0, 800, 25, {
    isStatic: true,
  }),
  Bodies.rectangle(0, 300, 25, 600, {
    isStatic: true,
  }),
  Bodies.rectangle(400, 600, 800, 25, {
    isStatic: true,
  }),
  Bodies.rectangle(800, 300, 25, 600, {
    isStatic: true,
  }),
];

for (let i = 0; i < 50; i++) {
  if (Math.random() > 0.5) {
    World.add(
      world,
      Bodies.rectangle(
        Math.floor(Math.random() * (width - 50)),
        Math.floor(Math.random() * (height - 50)),
        50,
        50
      )
    );
  } else {
    World.add(
      world,
      Bodies.circle(
        Math.floor(Math.random() * (width - 70)),
        Math.floor(Math.random() * (height - 70)),
        35
      )
    );
  }
}
World.add(world, walls);
// // alert("Coonected");
