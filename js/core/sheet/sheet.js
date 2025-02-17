import { colorWhite, colorGray100 } from "../../colors.js";
import { input } from "../../InputManager.js";
import { roundToNearestMultiple } from "../../otherFunctions.js";
import { STEP_GREED_SHEET } from "../../constants.js";

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
    this.indexCurrentBlock = null;

    this.positionCross = { x: 2 * STEP_GREED_SHEET, y: 2 * STEP_GREED_SHEET };
    this.isCrossInBlock = false;
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
    if (!this.isCrossInBlock) {
      this.drawCross(ctx, STEP_GREED_SHEET, 2.0, "black");
    }
  }

  renderBlocks(ctx) {
    this.listBlocks.forEach((block) => {
      block.render(ctx, { x: -this.positionView.x, y: -this.positionView.y });
    });
  }

  update() {
    if (input.keys.has("ArrowDown")) this.positionView.y += STEP_GREED_SHEET;
    if (input.keys.has("ArrowUp")) this.positionView.y -= STEP_GREED_SHEET;
    if (input.keys.has("ArrowLeft")) this.positionView.x -= STEP_GREED_SHEET;
    if (input.keys.has("ArrowRight")) this.positionView.x += STEP_GREED_SHEET;

    if (input.leftDown) {
      this.positionCross = {
        x: roundToNearestMultiple(
          input.mouse.x + this.positionView.x,
          STEP_GREED_SHEET
        ),
        y: roundToNearestMultiple(
          input.mouse.y + this.positionView.y,
          STEP_GREED_SHEET
        ),
      };
      const currInd = this.blockFromPoint(this.positionCross);

      console.log(currInd);

      if (this.indexCurrentBlock !== null) {
        this.listBlocks[this.indexCurrentBlock].setCurrent(false);
      }
      this.indexCurrentBlock = currInd;
      if (this.indexCurrentBlock !== null) {
        this.listBlocks[this.indexCurrentBlock].setCurrent(true);
        this.isCrossInBlock = true;
      } else {
        this.isCrossInBlock = false;
      }
    }

    if (input.deltaY > 0) this.positionView.y += STEP_GREED_SHEET;
    if (input.deltaY < 0) this.positionView.y -= STEP_GREED_SHEET;
  }

  updateBlocks() {
    this.listBlocks.forEach((block) => {
      block.update();
    });
  }

  blockFromPoint(point) {
    for (let i = 0; i < this.listBlocks.length; i++) {
      if (this.listBlocks[i].pointInBlock(point)) {
        return i;
      }
    }
    return null;
  }

  drawCross(ctx, size, width = 1.0, color = "black") {
    if (this.positionCross !== null) {
      const x = this.positionCross.x;
      const y = this.positionCross.y;

      ctx.save();

      ctx.strokeStyle = color;
      ctx.lineWidth = width;

      ctx.beginPath();
      ctx.moveTo(x - size, y);
      ctx.lineTo(x + size, y);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(x, y - size);
      ctx.lineTo(x, y + size);
      ctx.stroke();

      ctx.restore();
    }
  }
}
