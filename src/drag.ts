export const setActive = (active: boolean, el: HTMLElement) => {
  if (!el) throw new Error("no element");
  el.style.border = active ? "2px solid red" : "none";
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
