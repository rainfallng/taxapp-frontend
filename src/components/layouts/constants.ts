import { ISidebar, UserType } from "@/types";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import FilePresentOutlinedIcon from "@mui/icons-material/FilePresentOutlined";
import SegmentOutlinedIcon from "@mui/icons-material/SegmentOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined';

export const SIDEBAR_LINKS: Record<string, ISidebar[]> = {
  [UserType.COMPANY]: [
    {
      title: "Profile",
      link: "/app/profile",
      icon: AccountCircleOutlinedIcon,
    },
    {
      title: "Dashboard",
      link: "/app/home",
      icon: DashboardOutlinedIcon,
    },
    {
      title: "File Returns",
      icon: FileCopyOutlinedIcon,
      subs: [
        {
          title: "PAYE",
          link: "/app/returns/paye",
        },
        {
          title: "Withholding Tax Returns",
          link: "/app/returns/withholding",
        },
        {
          title: "Projection Returns",
          link: "/app/returns/projection",
        },
        {
          title: "Annual Returns",
          link: "/app/returns/annual",
        },
        {
          title: "Schedule Returns",
          link: "/app/returns/schedule",
        },
        {
          title: "Filing History",
          link: "/app/returns/history",
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
      title: "Help & Support",
      link: "/app/help",
      icon: SupportAgentIcon,
    },
  ],
  [UserType.INDIVIDUAL]: [
    {
      title: "Profile",
      link: "/app/profile",
      icon: AccountCircleOutlinedIcon,
    },
    {
      title: "Dashboard",
      link: "/app/home",
      icon: DashboardOutlinedIcon,
    },
    {
      title: "File Returns",
      icon: FilePresentOutlinedIcon,
      subs: [
        {
          title: "Annual Returns",
          link: "/app/returns",
        },
        {
          title: "Filing History",
          link: "/app/returns/history",
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
      title: "Help & Support",
      link: "/app/help",
      icon: SupportAgentIcon,
    },
  ],
  [UserType.ADMIN]: [
    {
      title: "Tax Consultant",
      link: "/app/consultant",
      icon: BusinessCenterOutlinedIcon,
    }
  ]
};
