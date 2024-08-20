import { Avatar, Box, Title } from "@mantine/core";
import { Dispatch, SetStateAction, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { useAuth } from "../../../context/auth-and-perm/AuthProvider";
import { linksData } from "../../../data/sidebar";
import ArrowSideBar_IC from "../../atoms/icons/ArrowSideBar";
import Logo from "../../atoms/icons/Logo";
import classes from "./DoubleNavbar.module.css";
import { LinksGroup } from "./LinksGroup";
import { useLocation, useParams } from "react-router-dom";
import SideBarAccount from "./SideBarAccount";
import DetailsProject from "./DetailsProject";

interface SideBar2 {
  collapsed: boolean;
  setCollapsed: Dispatch<SetStateAction<boolean>>;
  toggled: boolean;
  setToggled: Dispatch<SetStateAction<boolean>>;
}

export function SideBar2({
  collapsed,
  setCollapsed,
  toggled,
  setToggled,
}: SideBar2) {
  const { hasPermission } = useAuth();
  const location = useLocation();
  const { id } = useParams();
  const accountLocation = location.pathname.startsWith("/corporate-account");
  const detailsProjectLocation =
    location.pathname.startsWith("/details-project");

  const renderLinks = (links: any) => {
    return links.map((link: any) => {
      if (link.links) {
        const nestedLinks = link.links;
        return (
          <LinksGroup key={link.label} {...link}>
            {nestedLinks.map((nestedLink: any) => (
              <LinksGroup key={nestedLink.label} {...nestedLink} />
            ))}
          </LinksGroup>
        );
      } else {
        return <LinksGroup key={link.label} {...link} />;
      }
    });
  };

  const activeLinks = renderLinks(linksData);
  // const accountLinks = renderLinks(accountData);
  // const detailsProjectLinks = renderLinks(projectData(id));

  return (
    <nav
      className={`${
        collapsed || toggled ? "w-[17.5rem] z-10" : "w-[63px]"
      } relative transition-ease ${classes.navbar}`}
    >
      <div className={classes.wrapper}>
        <div className="absolute bottom-[25px] right-[15px] rounded-md z-10  cursor-pointer">
          <ArrowSideBar_IC
            className={`transition-ease collapsed-button-sidebar  ${
              collapsed ? "scale-x-[1]" : "scale-x-[-1]"
            } `}
            onClick={() => setCollapsed(!collapsed)}
          />
        </div>
        <div
          className={` relative flex flex-col  justify-between ${classes.main}`}
        >
          {/* <DetailsProject accountLinks={[]} classes={classes} /> */}
          <div>
            <Title
              order={5}
              className={`${classes.title} flex items-center gap-4`}
            >
              <Avatar
                color="white"
                radius="sm"
                className="bg-main w-[40px] h-[40px]"
              >
                <FaRegUser className="w-[16px]" />
              </Avatar>
              My account
            </Title>
            <Box mih={220} p="md">
              {activeLinks}
            </Box>
          </div>

          <div className="mx-5 my-5">
            <Logo />
          </div>
          <div
            onClick={() => setToggled(!toggled)}
            className="absolute md:hidden top-[20px] left-[10px] bg-main rounded-md w-6 h-6 flex justify-center items-center text-white text-[20px]"
          >
            x
          </div>
        </div>
      </div>
    </nav>
  );
}
