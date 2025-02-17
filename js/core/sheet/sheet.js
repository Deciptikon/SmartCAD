import { colorWhite } from "../../colors.js";
import { input } from "../../InputManager.js";

export default class Sheet {
  constructor(
    positionView,
    sizeWindow,
    sizeSheet,
    colorBackground = colorWhite
  ) {
    this.positionView = positionView;
    this.sizeSheet = sizeSheet;
    this.sizeWindow = sizeWindow;
    this.scale = 1.0;
    this.colorBackground = colorBackground;
    this.colorOutground = "rgb(100, 100, 100)";
    console.log("Страница создана...");
    this.listBlocks = [];
  }

  addBlock(block) {
    this.listBlocks.push(block);
  }

  renderBackground(ctx) {
    ctx.fillStyle = this.colorOutground;
    ctx.fillRect(0, 0, this.sizeWindow.w, this.sizeWindow.h);
    ctx.fillStyle = this.colorBackground;
    ctx.fillRect(
      0 - this.positionView.x,
      0 - this.positionView.y,
      this.sizeSheet.w,
      this.sizeSheet.h
    );
  }

  renderBlocks(ctx) {
    this.listBlocks.forEach((block) => {
      block.render(ctx, { x: -this.positionView.x, y: -this.positionView.y });
    });
  }

  update() {
    if (input.keys.has("ArrowDown")) this.positionView.y += 10;
    if (input.keys.has("ArrowUp")) this.positionView.y -= 10;

    if (input.deltaY > 0) this.positionView.y += 10;
    if (input.deltaY < 0) this.positionView.y -= 10;
  }
}
