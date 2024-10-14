import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Maximize, Link, Clipboard, Trash2 } from "lucide-react"; // Import icons from lucide-react
import React from "react";

const ImageMenu = ({
  children,
  id,
}: {
  children: React.ReactNode;
  id: string;
}) => {
  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
      <ContextMenuContent className="w-40">
        <ContextMenuItem className="pl-2 cursor-pointer" inset>
          <Maximize className="mr-2 w-4 h-4" />
          Open Fullscreen
        </ContextMenuItem>
        <ContextMenuItem className="pl-2 cursor-pointer" inset>
          <Link className="mr-2 w-4 h-4" />
          Copy Public URL
        </ContextMenuItem>
        <ContextMenuItem className="pl-2 cursor-pointer" inset>
          <Clipboard className="mr-2 w-4 h-4" />
          Copy ID
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem
          className="pl-2 cursor-pointer text-red-500 bg-red-100 dark:text-red-200 dark:bg-red-950 hover:!text-red-500 hover:!bg-red-200 hover:dark:!text-red-200 hover:dark:!bg-red-900 transition-all"
          inset
        >
          <Trash2 className="mr-2 w-4 h-4" />
          Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default ImageMenu;
