import "winbox";

import { Params } from "winbox";

declare const WinBox: WinBox.WinBoxConstructor;

//interface WinBoxOptions {}

export default function useWinBox() {
  return {
    create(options: Params) {
      return new WinBox({
        ...options,
      });
    },
  };
}
