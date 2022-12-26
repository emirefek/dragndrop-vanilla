import { DragGesture } from "@use-gesture/vanilla";
import useWinBox from "./winbox";
import { anime, setActive } from "./drag";
import { IContainer, moveHandler, printMousePos } from "./containers";

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
    if (!active) {
      console.log("end", mx, my);
    }
  });
});

// when you want to remove the listener
//gesture.destroy();

// Winbox Handler
const { create } = useWinBox();

const containerNest = document.querySelector<HTMLDivElement>("#containerNest");
if (!containerNest) throw new Error("no containerNest");

const containers: IContainer[] = [];

const wbContainers = containers.map((container) => {
  return create({
    title: container.title,
    root: containerNest,
    id: container.id,
    x: container.x,
    y: container.y,
    width: container.width,
    height: container.height,

    onmove: moveHandler,
    onclose(force) {
      return !force && !confirm("Do you really want to close this window?");
    },
  });
});

// Add Container Button Handler
const addContainerBtn = document.querySelector<HTMLDivElement>("#addContainer");
addContainerBtn?.addEventListener("click", () => {
  const params = {
    id: containers.length.toString(),
    title: "container " + containers.length.toString(),
    x: "center",
    y: "center",
    width: 300,
    height: 300,

    onmove: moveHandler,
    onclose(force: any) {
      return !force && !confirm("Do you really want to close this window?");
    },
  };
  containers.push(params);
  create(params);
  console.log("add container");
});
