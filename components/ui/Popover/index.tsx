import React from "react";
import * as Popover from "@radix-ui/react-popover";
import "./style.css";

const PopoverComp = () => {
  return (
    <Popover.Root>
      <Popover.Trigger className="PopoverTrigger">Show info</Popover.Trigger>
      <Popover.Portal>
        <Popover.Content>
          <Popover.Content>Some content</Popover.Content>
          <Popover.Arrow />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default PopoverComp;
