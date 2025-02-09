import { IProfileMenuBar, UserType } from "@/types";

export const ProfileLinks: Record<string, IProfileMenuBar[]> = {
  [UserType.INDIVIDUAL]: [
    {
      title: "My Profile",
      link: "/app/home",
    },
    // {
    //   title: "Family Relations",
    //   link: "/app/profile/relations",
    // },
    // {
    //   title: "Support Staff",
    //   link: "/app/profile/staff",
    // },
    // {
    //   title: "Linked Corporation",
    //   link: "/app/profile/corporation",
    // },
    {
      title: "Security",
      subs: [
        {
          title: "Change Password",
          link: "/app/home/password",
        },
        // {
        //   title: "Edit Payer ID/TIN",
        //   link: "/app/profile/tin",
        // },
        // {
        //   title: "Face/Fingerprint Access",
        //   link: "/app/profile/access",
        // },
        // {
        //   title: "Delete Account",
        //   link: "/app/profile/delete",
        // },
      ],
    },
  ],
  [UserType.COMPANY]: [
    {
      title: "Business Profile",
      link: "/app/home",
    },
    // {
    //   title: "Directors",
    //   link: "/app/profile/directors",
    // },
    {
      title: "Addresses",
      link: "/app/home/address",
    },
    // {
    //   title: "Payroll",
    //   link: "/app/profile/payroll",
    // },
    // {
    //   title: "Payments",
    //   link: "/app/profile/payments",
    // },
    {
      title: "Security",
      subs: [
        {
          title: "Change Password",
          link: "/app/home/password",
        },
        // {
        //   title: "Edit Payer ID/TIN",
        //   link: "/app/profile/tin",
        // },
        // {
        //   title: "Face/Fingerprint Access",
        //   link: "/app/profile/access",
        // },
        // {
        //   title: "Delete Account",
        //   link: "/app/profile/delete",
        // },
      ],
    },
  ],
};
