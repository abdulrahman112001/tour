import { Button, Menu, MenuProps } from "@mantine/core";
import { t } from "i18next";
import React, { ReactNode } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";

interface DropDownProps {
  children: ReactNode;
}

function DropDown({ children }: DropDownProps) {
  return (
    <div className="relative">
      <Menu shadow="md" width={100}>
        <Menu.Target>
          <Button className="!bg-main text-[12px] !flex items-center gap-2">
            <p> {t("Actions")}</p>
            <div className="mx-1">
              <MdKeyboardArrowDown />
            </div>
          </Button>
        </Menu.Target>
        <Menu.Dropdown className="p-0">
          {React.Children.map(children, (child, index) => (
            // Explicitly declaring child as a ReactNode
            <Menu.Item
              key={index}
              className="rounded-none border-b border-solid border-[#f2f2f5] p-0"
            >
              <div className="p-2">{child}</div>
            </Menu.Item>
          ))}
        </Menu.Dropdown>
      </Menu>
    </div>
  );
}

export default DropDown;
