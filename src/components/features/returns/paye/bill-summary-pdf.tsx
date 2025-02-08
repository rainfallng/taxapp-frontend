import { Bill, CompanyProfile, IUser } from "@/types";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  Svg,
  G,
  Path,
  Defs,
  Rect,
  ClipPath,
} from "@react-pdf/renderer";
import { Style } from "@react-pdf/types";
import dayjs from "dayjs";
import { ReactNode } from "react";

Font.register({
  family: "Poppins",
  fonts: [
    { src: "/assets/fonts/Poppins/Poppins-Black.ttf", fontWeight: 900 },
    { src: "/assets/fonts/Poppins/Poppins-BlackItalic.ttf", fontWeight: 900 },
    { src: "/assets/fonts/Poppins/Poppins-Bold.ttf", fontWeight: "bold" },
    { src: "/assets/fonts/Poppins/Poppins-BoldItalic.ttf", fontWeight: "bold" },
    {
      src: "/assets/fonts/Poppins/Poppins-ExtraBoldItalic.ttf",
      fontWeight: "bold",
    },
    { src: "/assets/fonts/Poppins/Poppins-ExtraBold.ttf", fontWeight: "bold" },
    { src: "/assets/fonts/Poppins/Poppins-ExtraLight.ttf", fontWeight: 200 },
    {
      src: "/assets/fonts/Poppins/Poppins-ExtraLightItalic.ttf",
      fontWeight: 200,
    },
    { src: "/assets/fonts/Poppins/Poppins-Italic.ttf", fontWeight: "normal" },
    { src: "/assets/fonts/Poppins/Poppins-Light.ttf", fontWeight: 300 },
    { src: "/assets/fonts/Poppins/Poppins-LightItalic.ttf", fontWeight: 300 },
    { src: "/assets/fonts/Poppins/Poppins-Medium.ttf", fontWeight: 500 },
    { src: "/assets/fonts/Poppins/Poppins-MediumItalic.ttf", fontWeight: 500 },
    { src: "/assets/fonts/Poppins/Poppins-Regular.ttf", fontWeight: "normal" },
    { src: "/assets/fonts/Poppins/Poppins-SemiBold.ttf", fontWeight: 600 },
    {
      src: "/assets/fonts/Poppins/Poppins-SemiBoldItalic.ttf",
      fontWeight: 600,
    },
    { src: "/assets/fonts/Poppins/Poppins-Thin.ttf", fontWeight: 100 },
    { src: "/assets/fonts/Poppins/Poppins-ThinItalic.ttf", fontWeight: 100 },
  ],
});

const styles = StyleSheet.create({
  page: { padding: 25, fontFamily: "Poppins" },
  pageTitle: {
    fontSize: 15,
    fontWeight: "semibold",
  },
  billTitleWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 26.875,
    marginTop: 43.75,
  },
  billTitle: {
    color: "#2A2A2A",
    fontSize: 13.75,
    fontWeight: "medium",
  },
});

const Grid = ({ item, children }: { item?: boolean; children: ReactNode }) => {
  if (item) return <View style={{ width: "28%" }}>{children}</View>;
  return (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        columnGap: 30,
        rowGap: 30,
      }}
    >
      {children}
    </View>
  );
};

const Logo = () => {
  return (
    <Svg style={{ width: 118, height: 27 }} viewBox="0 0 189 44">
      <G clip-path="url(#clip0_332_2913)">
        <Path
          d="M39.2833 14.5774C39.3023 11.6794 38.0557 9.60222 35.4992 8.23848C33.5882 7.21567 33.6009 7.1841 33.6009 9.33705C33.6009 12.1529 33.6009 14.9625 33.6009 17.7784C33.6009 20.8468 33.6009 23.9216 33.6009 26.99C33.6009 28.8525 32.7909 30.2478 31.1963 31.1696C27.3996 33.3731 23.5839 35.5513 19.7809 37.7421C18.066 38.7271 16.3512 39.7246 14.6174 40.6906C14.0479 41.0126 14.0352 41.2083 14.6237 41.5177C15.4147 41.9281 16.136 42.4774 16.946 42.8309C18.876 43.658 20.8313 43.6517 22.679 42.6036C27.0769 40.1161 31.4494 37.5843 35.822 35.0651C38.0683 33.7708 39.2643 31.8326 39.2643 29.2187C39.2643 24.3383 39.2453 19.4578 39.277 14.5774H39.2833Z"
          fill="#52D0B2"
        />
        <Path
          d="M30.1899 26.3288C30.3101 25.6217 30.3228 24.9019 30.3165 24.1822C30.3101 21.6251 30.3165 19.0744 30.3165 16.5174H30.3228C30.3228 13.8467 30.3101 11.1761 30.3228 8.51171C30.3355 6.27036 29.4116 4.60356 27.4373 3.50499C25.906 2.65265 24.4126 1.73086 22.8749 0.891141C20.7488 -0.27057 18.5847 -0.321079 16.4585 0.884827C11.9974 3.42291 7.52358 5.95468 3.10675 8.58116C1.13246 9.74918 0.0314144 11.5865 0.0187587 13.9225C-0.0128805 19.0366 -0.000224821 24.1443 0.0124309 29.2583C0.0124309 31.809 1.20839 33.6905 3.38517 34.9596C5.02408 35.9129 6.66299 36.8663 8.32722 37.7565C9.90285 38.6025 11.5354 38.6152 13.0984 37.7186C18.2556 34.7638 23.3875 31.7775 28.5383 28.8101C29.5128 28.2482 30.0001 27.3958 30.1899 26.3288ZM23.3685 25.3376C19.6984 27.4021 16.0092 29.4477 12.4087 31.6386C11.0798 32.4467 10.08 32.4594 8.75751 31.607C8.41581 31.3924 8.13105 31.2219 7.82732 31.0198C6.44785 30.0981 5.63156 28.848 5.63156 27.1622C5.6189 23.6076 5.63156 20.0467 5.6189 16.4922C5.6189 14.6296 6.43519 13.2406 8.02348 12.3125C11.1431 10.4942 14.2691 8.68218 17.4267 6.91436C18.8821 6.0999 20.3944 6.13778 21.8688 6.94592C22.4953 7.29317 23.0901 7.70988 23.7355 8.00662C24.3683 8.30336 24.5898 8.71374 24.5771 9.41456C24.5328 11.7064 24.5581 14.0046 24.5581 16.2964H24.5961C24.5961 18.5883 24.5771 20.8864 24.6024 23.1783C24.6151 24.1695 24.2417 24.8388 23.3622 25.3376H23.3685Z"
          fill="#52D0B2"
        />
        <Path
          d="M21.211 9.47349C21.2236 8.79793 21.0528 8.6464 20.4263 9.01891C17.2308 10.8877 14.0162 12.7313 10.808 14.5875C9.61205 15.2757 8.99825 16.3049 8.99825 17.6939C8.99825 21.4252 9.00458 25.1566 8.9856 28.8879C8.9856 29.5888 9.18176 29.6014 9.7133 29.2794C11.1434 28.427 12.5798 27.5873 14.0415 26.7855C14.4845 26.5393 14.6364 26.2362 14.6237 25.7564C14.5984 24.8093 14.6174 23.8623 14.6174 22.9152C14.6174 22.0818 14.6617 21.2484 14.6047 20.4213C14.5288 19.3291 15.035 18.6409 15.9399 18.1295C17.4649 17.2708 18.9646 16.3617 20.4959 15.522C21.0212 15.2378 21.23 14.9032 21.2173 14.3034C21.1793 12.6998 21.192 11.0898 21.2173 9.4798L21.211 9.47349Z"
          fill="#52D0B2"
        />
        <Path
          d="M61.4243 2.47656H56.6468V9.21953H52.8185V12.9572H56.6468V24.0755C56.6468 26.2222 56.9822 27.9269 57.6593 29.1833C58.33 30.446 59.3298 31.3299 60.6523 31.8476C61.9685 32.3653 63.5948 32.6179 65.5121 32.6179H68.9988V28.2362H65.1261C63.9492 28.2362 63.0379 27.9142 62.3925 27.2702C61.7471 26.6262 61.4243 25.7045 61.4243 24.4985V12.9572H68.9988V9.21953H61.4243V2.47656Z"
          fill="#252657"
        />
        <Path
          d="M86.8939 9.81691C85.3436 9.21712 83.3946 8.91406 81.0407 8.91406C80.294 8.91406 79.5157 8.92669 78.693 8.95826C77.8767 8.98983 77.0858 9.02139 76.3264 9.06559C75.5671 9.10979 74.871 9.16029 74.2382 9.21712V13.5546C74.9533 13.4978 75.7822 13.4473 76.7124 13.4031C77.6426 13.3589 78.5981 13.3273 79.5726 13.2957C80.5471 13.2705 81.4393 13.2515 82.243 13.2515C83.7047 13.2515 84.8121 13.624 85.5588 14.369C86.3054 15.1141 86.6788 16.2 86.6788 17.6332V18.0625H81.3887C79.3511 18.0625 77.6047 18.334 76.1366 18.877C74.6749 19.42 73.5485 20.2344 72.7575 21.3267C71.9665 22.4126 71.5742 23.789 71.5742 25.4495C71.5742 27.11 71.9159 28.379 72.6057 29.5092C73.2954 30.6393 74.2699 31.498 75.5291 32.0851C76.7884 32.6723 78.2691 32.9627 79.9586 32.9627C81.6481 32.9627 82.977 32.666 84.1097 32.0851C85.2424 31.498 86.1346 30.6519 86.78 29.5534C87.0711 29.0609 87.2989 28.5053 87.4887 27.8992V32.3629H91.4879V17.8857C91.4879 15.7139 91.1083 13.9713 90.3489 12.6707C89.5896 11.3701 88.4316 10.4167 86.8876 9.81691H86.8939ZM83.7933 28.6884C82.9896 29.0167 82.1417 29.1809 81.2558 29.1809C79.7371 29.1809 78.5728 28.8336 77.7692 28.1265C76.9655 27.4257 76.5669 26.4912 76.5669 25.3169C76.5669 24.1426 76.9655 23.1892 77.7692 22.4631C78.5728 21.7308 79.7308 21.3709 81.2558 21.3709H86.6788V23.7764C86.6218 25.178 86.3244 26.264 85.7992 27.0405C85.2677 27.8108 84.6032 28.3664 83.7996 28.6947L83.7933 28.6884Z"
          fill="#252657"
        />
        <Path
          d="M114.819 9.21875H109.655L104.84 17.6348H104.194L99.0687 9.21875H93.5635L100.765 20.7033L93.2218 32.3583H98.3853L104.106 23.2982H104.707L110.731 32.3583H116.242L108.124 20.3244L114.819 9.21875Z"
          fill="#252657"
        />
        <Path
          d="M131.17 9.81691C129.619 9.21712 127.671 8.91406 125.317 8.91406C124.57 8.91406 123.792 8.92669 122.969 8.95826C122.153 8.98983 121.362 9.02139 120.602 9.06559C119.843 9.10979 119.147 9.16029 118.514 9.21712V13.5546C119.229 13.4978 120.058 13.4473 120.988 13.4031C121.918 13.3589 122.874 13.3273 123.848 13.2957C124.823 13.2705 125.715 13.2515 126.519 13.2515C127.981 13.2515 129.088 13.624 129.835 14.369C130.581 15.1141 130.955 16.2 130.955 17.6332V18.0625H125.665C123.627 18.0625 121.881 18.334 120.412 18.877C118.951 19.42 117.824 20.2344 117.033 21.3267C116.242 22.4126 115.85 23.789 115.85 25.4495C115.85 27.11 116.192 28.379 116.882 29.5092C117.571 30.6393 118.546 31.498 119.805 32.0851C121.064 32.6723 122.545 32.9627 124.234 32.9627C125.924 32.9627 127.253 32.666 128.386 32.0851C129.518 31.498 130.41 30.6519 131.056 29.5534C131.347 29.0609 131.575 28.5053 131.765 27.8992V32.3629H135.764V17.8857C135.764 15.7139 135.384 13.9713 134.625 12.6707C133.865 11.3701 132.707 10.4167 131.163 9.81691H131.17ZM128.069 28.6884C127.266 29.0167 126.418 29.1809 125.532 29.1809C124.013 29.1809 122.849 28.8336 122.045 28.1265C121.241 27.4257 120.843 26.4912 120.843 25.3169C120.843 24.1426 121.241 23.1892 122.045 22.4631C122.849 21.7308 124.007 21.3709 125.532 21.3709H130.955V23.7764C130.898 25.178 130.6 26.264 130.075 27.0405C129.544 27.8108 128.879 28.3664 128.075 28.6947L128.069 28.6884Z"
          fill="#252657"
        />
        <Path
          d="M159.614 11.9632C158.639 10.8772 157.475 10.0249 156.127 9.40617C154.779 8.79374 153.273 8.48438 151.609 8.48438C149.856 8.48438 148.255 8.86951 146.787 9.64609C145.325 10.4163 144.148 11.5907 143.256 13.1691C142.952 13.7058 142.699 14.2929 142.484 14.9306V9.21676H138.485V40.9428H143.522V29.0858C144.42 30.418 145.521 31.4092 146.838 32.0532C148.299 32.7666 149.875 33.1265 151.571 33.1265C153.267 33.1265 154.741 32.8108 156.089 32.1795C157.437 31.5481 158.601 30.6895 159.576 29.6035C160.55 28.5176 161.297 27.2485 161.816 25.8027C162.334 24.3569 162.588 22.8163 162.588 21.1874V20.373C162.588 18.7125 162.334 17.1656 161.835 15.7388C161.335 14.3056 160.594 13.0491 159.62 11.9632H159.614ZM156.665 24.9504C156.076 26.1689 155.254 27.1096 154.191 27.7852C153.127 28.4607 151.894 28.7954 150.489 28.7954C149.255 28.7954 148.091 28.5239 147.002 27.9809C145.914 27.4379 145.028 26.6424 144.357 25.6007C143.68 24.5589 143.345 23.3025 143.345 21.844V20.0005C143.345 18.4852 143.674 17.1909 144.332 16.1176C144.99 15.0443 145.863 14.2235 146.958 13.6489C148.046 13.0744 149.223 12.7903 150.489 12.7903C151.925 12.7903 153.165 13.1249 154.21 13.8005C155.254 14.476 156.076 15.4104 156.665 16.61C157.253 17.8096 157.544 19.1986 157.544 20.777C157.544 22.3554 157.253 23.7444 156.665 24.963V24.9504Z"
          fill="#252657"
        />
        <Path
          d="M188.247 15.7388C187.747 14.3056 187.007 13.0491 186.032 11.9632C185.058 10.8772 183.893 10.0249 182.546 9.40617C181.198 8.79374 179.692 8.48438 178.028 8.48438C176.275 8.48438 174.674 8.86951 173.206 9.64609C171.744 10.4163 170.567 11.5907 169.675 13.1691C169.371 13.7058 169.118 14.2929 168.903 14.9306V9.21676H164.904V40.9428H169.941V29.0921C170.839 30.4243 171.94 31.4155 173.256 32.0595C174.718 32.773 176.294 33.1328 177.99 33.1328C179.685 33.1328 181.16 32.8172 182.508 32.1858C183.855 31.5544 185.02 30.6958 185.994 29.6098C186.969 28.5239 187.715 27.2548 188.234 25.809C188.747 24.3632 189.006 22.8227 189.006 21.1937V20.3793C189.006 18.7188 188.753 17.1719 188.253 15.7451L188.247 15.7388ZM183.083 24.9504C182.495 26.1689 181.672 27.1096 180.609 27.7852C179.546 28.4607 178.312 28.7954 176.907 28.7954C175.674 28.7954 174.509 28.5239 173.421 27.9809C172.332 27.4379 171.447 26.6424 170.776 25.6007C170.099 24.5589 169.763 23.3025 169.763 21.844V20.0005C169.763 18.4852 170.092 17.1909 170.75 16.1176C171.409 15.0443 172.288 14.2235 173.377 13.6489C174.465 13.0744 175.642 12.7903 176.907 12.7903C178.344 12.7903 179.584 13.1249 180.628 13.8005C181.672 14.476 182.495 15.4104 183.083 16.61C183.672 17.8096 183.963 19.1986 183.963 20.777C183.963 22.3554 183.672 23.7444 183.083 24.963V24.9504Z"
          fill="#252657"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_332_2913">
          <Rect width="189" height="43.4189" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

const Naira = ({ style }: { style?: Style }) => {
  return (
    <Svg viewBox="0 0 72 122.88" style={{ width: 14, height: 10, ...style }}>
      <Path
        fill="#000000"
        d="M13.42,0H32.1a1.25,1.25,0,0,1,1,.6L58,42.26H83.17v-41A1.23,1.23,0,0,1,84.39,0h17.28a1.23,1.23,0,0,1,1.23,1.23v41h11a1.23,1.23,0,0,1,1.23,1.23V54.55a1.23,1.23,0,0,1-1.23,1.23h-11v9.41h11a1.23,1.23,0,0,1,1.23,1.22V77.48a1.23,1.23,0,0,1-1.23,1.22h-11v43a1.23,1.23,0,0,1-1.23,1.23H84.39a1.25,1.25,0,0,1-1-.6L58,78.7H33.26v43A1.23,1.23,0,0,1,32,122.88H13.42a1.23,1.23,0,0,1-1.23-1.23V78.7h-11A1.23,1.23,0,0,1,0,77.48V66.41a1.23,1.23,0,0,1,1.23-1.22h11V55.78h-11A1.23,1.23,0,0,1,0,54.55V43.49a1.23,1.23,0,0,1,1.23-1.23h11v-41A1.23,1.23,0,0,1,13.42,0ZM33.26,55.78v9.41h17l-4.4-9.41ZM70,65.19H83.17V55.78H65.68L70,65.19ZM83.17,78.7H77.88l5.29,11v-11ZM33.26,32.76v9.5h4.57l-4.57-9.5Z"
      />
    </Svg>
  );
};

const BillSummaryPDF = ({
  data,
  tinProfile,
  user,
  amountDue,
  month,
}: {
  data: Bill;
  tinProfile: CompanyProfile;
  user: IUser;
  amountDue: number;
  month: string;
}) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={styles.pageTitle}>Tax Implication Bill</Text>
          <Logo />
        </View>
        <View style={styles.billTitleWrapper}>
          <Text style={styles.billTitle}>Bill: {data?.name}</Text>
          <View
            style={[
              styles.billTitle,
              { flexDirection: "row", alignItems: "center" },
            ]}
          >
            <Text>Tax Implication Total:</Text>
            <Naira style={{ width: 16 }} />
            <Text>{Number(data?.amount ?? "0").toLocaleString()}</Text>
          </View>
        </View>
        <Grid>
          <Grid item>
            <Text
              style={{
                color: "#717171",
                fontSize: 8.75,
                fontWeight: 500,
                marginBottom: 5,
              }}
            >
              Reference Number:
            </Text>
            <Text
              style={{
                fontSize: 12.5,
                color: "#2A2A2A",
              }}
            >
              {data?.reference}
            </Text>
          </Grid>
          <Grid item>
            <Text
              style={{
                color: "#717171",
                fontSize: 8.75,
                fontWeight: 500,
                marginBottom: 5,
              }}
            >
              Issue Date:
            </Text>
            <Text
              style={{
                fontSize: 12.5,
                color: "#2A2A2A",
              }}
            >
              {dayjs(data?.created).format("DD/MM/YYYY")}
            </Text>
          </Grid>
          <Grid item>
            <Text
              style={{
                color: "#717171",
                fontSize: 8.75,
                fontWeight: 500,
                marginBottom: 5,
              }}
            >
              Tax Payer ID/Tax Identification Number (TIN)
            </Text>
            <Text
              style={{
                fontSize: 12.5,
                color: "#2A2A2A",
              }}
            >
              {tinProfile?.tax_payer_id ?? "--"}
            </Text>
          </Grid>
          <Grid item>
            <Text
              style={{
                color: "#717171",
                fontSize: 8.75,
                fontWeight: 500,
                marginBottom: 5,
              }}
            >
              Biller:
            </Text>
            <Text
              style={{
                fontSize: 12.5,
                color: "#2A2A2A",
              }}
            >
              {data?.tax_collector_name ?? "--"}
            </Text>
          </Grid>
          <Grid item>
            <Text
              style={{
                color: "#717171",
                fontSize: 8.75,
                fontWeight: 500,
                marginBottom: 5,
              }}
            >
              Tax Month in View
            </Text>
            <Text
              style={{
                fontSize: 12.5,
                color: "#2A2A2A",
              }}
            >
              {month}
            </Text>
          </Grid>
          <Grid item>
            <Text
              style={{
                color: "#717171",
                fontSize: 8.75,
                fontWeight: 500,
                marginBottom: 5,
              }}
            >
              Customer Name:
            </Text>
            <Text
              style={{
                fontSize: 12.5,
                color: "#2A2A2A",
              }}
            >
              {tinProfile?.name ?? "--"}
            </Text>
          </Grid>
          <Grid item>
            <Text
              style={{
                color: "#717171",
                fontSize: 8.75,
                fontWeight: 500,
                marginBottom: 5,
              }}
            >
              Surcharge:
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Naira />
              <Text
                style={{
                  fontSize: 12.5,
                  color: "#2A2A2A",
                }}
              >
                {Number(data?.charge ?? "0").toLocaleString()}
              </Text>
            </View>
          </Grid>
          <Grid item>
            <Text
              style={{
                color: "#717171",
                fontSize: 8.75,
                fontWeight: 500,
                marginBottom: 5,
              }}
            >
              Phone Number:
            </Text>
            <Text
              style={{
                fontSize: 12.5,
                color: "#2A2A2A",
              }}
            >
              {tinProfile?.phone_number || user.phone || "--"}
            </Text>
          </Grid>
          <Grid item>
            <Text
              style={{
                color: "#717171",
                fontSize: 8.75,
                fontWeight: 500,
                marginBottom: 5,
              }}
            >
              Customer Email Address:
            </Text>
            <Text
              style={{
                fontSize: 12.5,
                color: "#2A2A2A",
              }}
            >
              {tinProfile?.email || user.email}
            </Text>
          </Grid>
        </Grid>
        <View
          style={{
            fontSize: 16.25,
            color: "#2A2A2A",
            fontWeight: 500,
            marginTop: 31.25,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text>Amount Due:</Text>
          <Naira style={{ width: 16 }} />
          <Text>{amountDue.toLocaleString()}</Text>
        </View>
      </Page>
    </Document>
  );
};

export default BillSummaryPDF;
