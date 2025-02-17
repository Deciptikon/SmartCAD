import { colorWhite, colorGreen, colorRed } from "./colors.js";
import Block from "./core/block/block.js";
import Sheet from "./core/sheet/sheet.js";

import { input } from "./InputManager.js";

const canvas = document.getElementById("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

canvas.tabIndex = 1000;
canvas.focus();

const ctx = canvas.getContext("2d");

let needUpdate = true;

//---------------------------------------------------
let b0 = new Block({ x: 100, y: 100 }, { w: 100, h: 100 });
let b1 = new Block(
  { x: 350, y: 200 },
  { w: 200, h: 100 },
  "rgb(100, 255, 100)"
);
//let listBocks = [b0, b1];

let s = new Sheet(
  { x: 0, y: 0 },
  { w: canvas.width, h: canvas.height },
  { w: 500, h: 900 }
);

s.addBlock(b0);
s.addBlock(b1);

function animate() {
  requestAnimationFrame(animate);
  needUpdate = (input.getActivity() ? true : false) || needUpdate;
  if (needUpdate) {
    needUpdate = false;
    ctx.fillStyle = colorWhite;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    s.update();
    s.updateBlocks();

    s.renderBackground(ctx);
    s.renderBlocks(ctx);
  }
}

animate();
