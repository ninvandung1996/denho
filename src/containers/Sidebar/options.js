import { Children } from "react";

const options = [
  {
    key: "project",
    label: "Dự án",
    leftIcon: "ion-folder"
  },
  {
    key: "service",
    label: "Dịch vụ",
    leftIcon: "ion-ios-keypad"
  },
  {
    key: "apartment",
    label: "Căn hộ",
    leftIcon: "ion-android-home"
  },
  {
    key: "user",
    label: "Người dùng",
    leftIcon: "ion-android-person-add"
  },
  {
    key: "contract",
    label: "Hợp đồng",
    leftIcon: "ion-ios-paper"
  },
  {
    key: "booking",
    label: "Booking",
    leftIcon: "ion-android-clipboard"
  },
  {
    key: "promotion",
    label: "Quảng cáo",
    leftIcon: "ion-ios-color-wand"
  },
  {
    label: "Nhà cung cấp",
    leftIcon: "ion-android-contact",
    children: [
      {
        key: "supplier",
        label: "Nhà cung cấp"
      },
      {
        key: "reviewsupplier",
        label: "Đánh giá"
      }
    ]
  },
  {
    key: "feedback",
    label: "FeedBack",
    leftIcon: "ion-email-unread"
  },
  {
    key: "faq",
    label: "FAQ",
    leftIcon: "ion-help-circled"
  },
  {
    key: "ticket",
    label: "Ticket",
    leftIcon: "ion-closed-captioning"
  },
  {
    key: "news",
    label: "Tin tức",
    leftIcon: "ion-ios-list"
  },
  {
    label: "Cấu hình",
    leftIcon: "ion-android-settings",
    children: [
      {
        key: "project",
        label: "Dự án",
        leftIcon: "ion-folder"
      },
      {
        key: "service",
        label: "Dịch vụ"
      },
      {
        key: "config",
        label: "Liên hệ",
      }
    ]
  },
];
export default options;
