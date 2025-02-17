import { colorRed } from "../../colors.js";
import { input } from "../../InputManager.js";

export default class Block {
  constructor(positionView, size, color = colorRed, scale = 1.0) {
    this.positionView = positionView;
    this.size = size;
    console.log(`Блок создан... ${color}`);
    this.color = color;
    this.scale = scale;
    this.enable = true;
    this.current = false;
    //console.log("Блок создан...");
  }

  setCurrent(val) {
    this.current = val !== 0 ? true : false;
  }

  setEnable(val) {
    this.enable = val !== 0 ? true : false;
  }

  render(ctx, shift) {
    //console.log("Блок отрисован...");
    if (ctx !== null) {
      ctx.fillStyle = this.color;
      ctx.fillRect(
        this.positionView.x + shift.x,
        this.positionView.y + shift.y,
        this.size.w,
        this.size.h
      );
      if (this.current) {
        ctx.strokeStyle = "black"; // Цвет линии
        ctx.lineWidth = 0.5; // Толщина линии
        ctx.strokeRect(
          this.positionView.x + shift.x,
          this.positionView.y + shift.y,
          this.size.w,
          this.size.h
        );
      }
    } else {
      //
    }
  }

  update() {
    if (input.keys.has("ArrowRight")) this.positionView.x += 1;
    if (input.keys.has("ArrowLeft")) this.positionView.x -= 1;
    if (input.keys.has("ArrowDown")) this.positionView.y += 1;
    if (input.keys.has("ArrowUp")) this.positionView.y -= 1;

    this.positionView.x = this.positionView.x < 0 ? 0 : this.positionView.x;
    this.positionView.y = this.positionView.y < 0 ? 0 : this.positionView.y;
  }
}
