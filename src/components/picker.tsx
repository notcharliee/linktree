"use client"

import { rgbToHex } from "~/lib/utils"

import { Input } from "./input"
import { Popover, PopoverContent, PopoverTrigger } from "~/components/popover"

export const ColourPicker = (props: {
  value: string
  onChange: (value: string) => void
}) => (
  <Popover>
    <PopoverTrigger className="flex h-9 w-full items-center rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white disabled:cursor-not-allowed disabled:opacity-50">
      <div
        className="mr-2 h-5 w-5 rounded border bg-white"
        style={{ backgroundColor: props.value }}
      />
      <span className="font-mono">{props.value}</span>
    </PopoverTrigger>
    <PopoverContent className="w-full">
      <div className="grid grid-cols-5 gap-2">
        <button
          className="h-9 w-9 rounded border bg-red-400"
          onClick={() => props.onChange(rgbToHex(248, 113, 113))}
        />
        <button
          className="h-9 w-9 rounded border bg-orange-400"
          onClick={() => props.onChange(rgbToHex(251, 146, 60))}
        />
        <button
          className="h-9 w-9 rounded border bg-yellow-400"
          onClick={() => props.onChange(rgbToHex(250, 204, 21))}
        />
        <button
          className="h-9 w-9 rounded border bg-green-400"
          onClick={() => props.onChange(rgbToHex(74, 222, 128))}
        />
        <button
          className="h-9 w-9 rounded border bg-blue-400"
          onClick={() => props.onChange(rgbToHex(96, 165, 250))}
        />
        <button
          className="h-9 w-9 rounded border bg-purple-400"
          onClick={() => props.onChange(rgbToHex(192, 132, 252))}
        />
        <button
          className="h-9 w-9 rounded border bg-pink-400"
          onClick={() => props.onChange(rgbToHex(244, 114, 182))}
        />
        <Input
          className="col-span-3 w-[124px]"
          defaultValue={props.value}
          onChange={(event) => props.onChange(event.currentTarget.value)}
        />
      </div>
    </PopoverContent>
  </Popover>
)
