import { ISidebar } from "@/types";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import FilePresentOutlinedIcon from "@mui/icons-material/FilePresentOutlined";
import SegmentOutlinedIcon from "@mui/icons-material/SegmentOutlined";
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

export const SIDEBAR_LINKS: ISidebar[] = [
  {
    title: "Dashboard",
    link: "/app/home",
    icon: DashboardOutlinedIcon,
  },
  {
    title: "File Annual Returns",
    icon: FilePresentOutlinedIcon,
    subs: [
      {
        title: "All Professionals",
        link: "/app/professionals",
      },
      {
        title: "Add New Professional",
        link: "/app/professionals/add",
      },
    ],
  },
  {
    title: "Statement",
    link: "/app/statement",
    icon: SegmentOutlinedIcon,
  },
  {
    title: "Notification",
    link: "/app/notification",
    icon: NotificationsNoneOutlinedIcon,
  },
  {
    title: "Account",
    link: "/app/account",
    icon: AccountCircleOutlinedIcon
  }
];
