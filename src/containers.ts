export interface IContainer {
  id: string;
  title: string;
  x: number | string;
  y: number | string;
  width: number;
  height: number;
}

export const moveHandler = (x: number, y: number) => {
  console.log("move", x, y);
};

export function printMousePos() {
  // add mouse click event listener
  document.addEventListener("click", function (e) {
    // get the mouse cursor position at startup:
    const cursorX = e.pageX;
    const cursorY = e.pageY;

    console.log("click", cursorX, cursorY);
    document.getElementById("test")!.innerHTML =
      "x: " + cursorX + ", y: " + cursorY;

    const feedback = isContain(
      cursorX,
      cursorY,
      document.getElementById("img1")!
    );
    console.log("feedback", feedback);
  });
}

export const isContain = (x: number, y: number, el: HTMLElement) => {
  const rect = el.getBoundingClientRect();
  const { left, top, right, bottom } = rect;
  return left < x && x < right && top < y && y < bottom;
};
