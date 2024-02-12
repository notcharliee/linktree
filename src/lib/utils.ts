import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))

export const rgbToHex = (r: number, g: number, b: number) =>
  "#" + componentToHex(r) + componentToHex(g) + componentToHex(b)

const componentToHex = (c: number) =>
  c.toString(16).length == 1 ? "0" + c.toString(16) : c.toString(16)
