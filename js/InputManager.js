export class InputManager {
  constructor() {
    this.keys = new Set();
    this.deltaY = 0;
    this.mouse = { x: 0, y: 0 };
    this.active = false;
    this.leftDown = false;
    this.rightDown = false;

    canvas.addEventListener("contextmenu", (event) => {
      event.preventDefault();

      //isMenuVisible = true;
      let menuX = event.offsetX;
      let menuY = event.offsetY;
      //drawMenu();
    });

    window.addEventListener("keydown", (e) => {
      this.keys.add(e.key);
      this.active = true;
      console.log(`add ${e.key}`);
    });

    window.addEventListener("keyup", (e) => {
      this.keys.delete(e.key);
      console.log(`del ${e.key}`);
      this.active = true;
    });

    window.addEventListener("mousemove", (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
      this.deltaY = 0;
      if (this.leftDown) {
        this.active = true;
        console.log(`${this.mouse.x}   ${this.mouse.y}`);
      }
    });

    window.addEventListener("mousedown", (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
      this.active = true;
      this.deltaY = 0;

      if (e.button === 0) {
        this.leftDown = true;
        console.log("Левая кнопка");
      } else if (e.button === 2) {
        this.rightDown = true;
        console.log("Правая кнопка");
      }
    });

    window.addEventListener("mouseup", (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
      this.deltaY = 0;
      this.active = true;
      this.leftDown = false;
      console.log(`m u`);
    });

    window.addEventListener("wheel", (e) => {
      this.deltaY = e.deltaY;
      if (this.deltaY < 0) {
        console.log("Колесо вверх");
      } else if (this.deltaY > 0) {
        console.log("Колесо вниз");
      }
      this.active = true;
    });
  }

  getActivity() {
    let active = this.active ? true : false;
    this.active = false;

    return active;
  }
}

export const input = new InputManager();
