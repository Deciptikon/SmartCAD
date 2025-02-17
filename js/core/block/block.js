import { colorRed, colorDashLineBlock } from "../../colors.js";
import { input } from "../../InputManager.js";
import { DASH_STYLE_BASE } from "../../constants.js";

export default class Block {
  constructor(position, size, color = colorRed, scale = 1.0) {
    this.position = position;
    this.size = size;
    console.log(`Блок создан... ${color}`);
    this.color = color;
    this.scale = scale;
    this.enable = true;
    this.current = false;
    //console.log("Блок создан...");
  }

  setCurrent(isCurrent) {
    this.current = isCurrent;
  }

  setEnable(isEnable) {
    this.enable = isEnable;
  }

  render(ctx, shift) {
    //console.log("Блок отрисован...");
    if (ctx !== null) {
      ctx.save();

      ctx.fillStyle = this.color;
      ctx.fillRect(
        this.position.x + shift.x,
        this.position.y + shift.y,
        this.size.w,
        this.size.h
      );
      if (this.current) {
        ctx.strokeStyle = colorDashLineBlock;
        ctx.setLineDash(DASH_STYLE_BASE);
        ctx.lineWidth = 1.0;
        ctx.strokeRect(
          this.position.x + shift.x,
          this.position.y + shift.y,
          this.size.w,
          this.size.h
        );
      }
      ctx.restore();
    } else {
      //
    }
  }

  update() {
    if (this.current !== true) {
      return;
    }

    //if (input.keys.has("ArrowRight")) this.position.x += 10;
    //if (input.keys.has("ArrowLeft")) this.position.x -= 10;
    //if (input.keys.has("ArrowDown")) this.position.y += 10;
    //if (input.keys.has("ArrowUp")) this.position.y -= 10;

    this.position.x = this.position.x < 0 ? 0 : this.position.x;
    this.position.y = this.position.y < 0 ? 0 : this.position.y;
  }

  pointInBlock(point) {
    const px = point.x - this.position.x;
    const py = point.y - this.position.y;
    if (!(px < 0) && !(px > this.size.w) && !(py < 0) && !(py > this.size.h)) {
      return true;
    }
    return false;
  }
}
