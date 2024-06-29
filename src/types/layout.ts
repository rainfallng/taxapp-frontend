import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

export interface IDefaultMenu {
  title: string;
  link?: string;
}

export interface ISidebar extends IDefaultMenu {
  icon: OverridableComponent<SvgIconTypeMap<unknown, "svg">> & {
    muiName: string;
  };
  subs?: (IDefaultMenu & { link: string })[];
}

export interface IProfileMenuBar extends IDefaultMenu {
  subs?: (IDefaultMenu & { link: string })[];
}
