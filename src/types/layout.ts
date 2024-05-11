import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

export interface ISidebar {
    title: string;
    link?: string;
    icon: OverridableComponent<SvgIconTypeMap<unknown, "svg">> & {
        muiName: string;
    };
    subs?: (Omit<ISidebar, "subs" | "icon"> & { link: string })[];
  }
  