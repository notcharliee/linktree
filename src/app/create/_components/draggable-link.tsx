import { DragHandleHorizontalIcon, TrashIcon } from "@radix-ui/react-icons"

import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/form"
import { Input } from "~/components/input"
import { Label } from "~/components/label"

import { type Control, type UseFieldArrayReturn } from "react-hook-form"


export const DraggableLink = (props: {
  id: string,
  index: number,
  key: number,
  control: Control<{
    links: {
      name: string;
      href: string;
    }[];
    username: string;
    bio?: string | undefined;
    email?: string | undefined;
    primaryColour?: string | undefined;
    secondaryColour?: string | undefined;
    accentColour?: string | undefined;
  }, unknown, {
    links: {
      name: string;
      href: string;
    }[];
    username: string;
    bio?: string | undefined;
    email?: string | undefined;
    primaryColour?: string | undefined;
    secondaryColour?: string | undefined;
    accentColour?: string | undefined;
  }>,
  fieldArray: UseFieldArrayReturn<{
    username: string;
    links: {
      name: string;
      href: string;
    }[];
    bio?: string | undefined;
    email?: string | undefined;
    primaryColour?: string | undefined;
    secondaryColour?: string | undefined;
    accentColour?: string | undefined;
  }, "links", "id">
}) => {
  const {
    attributes,
    listeners,
    transition,
    transform,
    setNodeRef,
  } = useSortable({
    id: props.id,
  })

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  }

  return (
    <div
      className="flex flex-col gap-2"
      ref={setNodeRef}
      style={style}
      key={props.id}
    >
      <div className="flex justify-between items-center">
        <button {...attributes} {...listeners}>
          <DragHandleHorizontalIcon className="h-4 w-4" />
        </button>
        <Label>Link {props.index + 1}</Label>
        <button onClick={() => props.fieldArray.remove(props.index)}>
          <TrashIcon className="h-4 w-4" />
        </button>
      </div>
      <FormField
        control={props.control}
        name={`links.${props.index}.name`}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input placeholder="Example" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={props.control}
        name={`links.${props.index}.href`}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input placeholder="https://example.com" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}