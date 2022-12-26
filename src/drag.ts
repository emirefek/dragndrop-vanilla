export const setActive = (active: boolean, el: HTMLElement) => {
  if (!el) throw new Error("no element");
  el.style.border = active ? "2px solid red" : "none";
};

export const imagesPanel = document.querySelector(".xboard.xleft");

export const dropHandler = (imgEl: HTMLElement, x: number, y: number) => {
  const dropX = x;
  const dropY = y;

  const containers = document.querySelectorAll(".container.main");
  containers.forEach((container) => {
    const rect = container.getBoundingClientRect();
    const { x, y, width, height } = rect;
    //console.log("rect", rect);
    if (x < dropX && dropX < x + width && y < dropY && dropY < y + height) {
      console.log("drop", container);
      //container.innerHTML = "hello";
      container.appendChild(imgEl);
    }
  });

  const rect = imagesPanel?.getBoundingClientRect();
  const { x: xImg, y: yImg, width: wImg, height: hImg } = rect as DOMRect;
  if (
    xImg < dropX &&
    dropX < xImg + wImg &&
    yImg < dropY &&
    dropY < yImg + hImg
  ) {
    console.log("drop", imagesPanel);
    imagesPanel?.appendChild(imgEl);
  }
};

export const moveHandler = (el: HTMLElement, x: number, y: number) => {
  const newTop = el.offsetTop + y;
  const newLeft = el.offsetLeft + x;
  el.style.top = `${newTop < 0 ? 0 : newTop}px`;
  el.style.left = `${newLeft < 0 ? 0 : newLeft}px`;
};

export const anime = ({
  targets,
  translateX,
  translateY,
  duration,
}: {
  targets: HTMLElement;
  translateX: number;
  translateY: number;
  duration: number;
}) => {
  //const el = document.getElementById("img1");
  if (!targets) throw new Error("no element");
  targets.style.transform = `translate(${translateX}px, ${translateY}px)`;
};
