import { DragGesture } from "@use-gesture/vanilla";
import { anime, moveHandler, setActive } from "./drag";

export interface IContainer {
  id: string;
  title: string;
  x: number | string;
  y: number | string;
  width: number;
  height: number;
}

export const dragHandlerAdd = (el: HTMLElement) => {
  new DragGesture(el, ({ active, movement: [mx, my] }) => {
    const parentContainer = el.parentElement as HTMLElement;
    setActive(active, parentContainer as HTMLElement);
    anime({
      targets: parentContainer as HTMLElement,
      translateX: active ? mx : 0,
      translateY: my,
      duration: active ? 0 : 1000,
    });
    if (!active) {
      console.log("end", mx, my);
      const element = parentContainer as HTMLElement;
      element.style.transform = `translate(${0}px, ${0}px)`;
      moveHandler(parentContainer as HTMLElement, mx, my);
    }
  });
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
