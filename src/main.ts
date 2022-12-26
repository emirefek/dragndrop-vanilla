import { DragGesture } from "@use-gesture/vanilla";
import { anime, dropHandler, moveHandler, setActive } from "./drag";
import { IContainer, dragHandlerAdd, printMousePos } from "./containers";

// Mouse Position Handler
printMousePos();

// Image & useGesture Handler
const images = document.querySelectorAll(".ximg");

const imageListeners = images.forEach((el) => {
  const gesture = new DragGesture(el, ({ active, movement: [mx, my] }) => {
    setActive(active, el as HTMLElement);
    anime({
      targets: el as HTMLElement,
      translateX: active ? mx : 0,
      translateY: active ? my : 0,
      duration: active ? 0 : 1000,
    });
    const parentContainer = el.parentElement as HTMLElement;
    parentContainer.style.overflow = "visible";

    if (!active) {
      const { x, y } = el.getBoundingClientRect();
      dropHandler(el as HTMLElement, x + mx, y + my);
      console.log("drop", x + mx, y + my);
      parentContainer.style.overflow = "auto";
    }
  });
});

// when you want to remove the listener
//gesture.destroy();

// Container Handler

const containerNest = document.querySelector<HTMLDivElement>("#containerNest");
if (!containerNest) throw new Error("no containerNest");

// const containers: IContainer[] = [];

let containers = document.querySelectorAll(".container.handle");
const containerListeners = containers.forEach((el) => {
  const gesture = dragHandlerAdd(el as HTMLElement);
});

// Add Container Button Handler
const addContainerBtn = document.querySelector<HTMLDivElement>("#addContainer");
addContainerBtn?.addEventListener("click", () => {
  console.log("add container");
  const container = document.createElement("div");
  const handle = document.createElement("div");
  const close = document.createElement("div");

  container.classList.add("container", "main", "resizable");
  handle.classList.add("container", "handle");
  close.classList.add("container", "close");

  container.appendChild(handle);
  container.appendChild(close);
  containerNest?.appendChild(container);

  close.addEventListener("click", () => {
    container.remove();
  });

  dragHandlerAdd(handle);
});
