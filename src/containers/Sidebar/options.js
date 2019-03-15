
const options = [
  {
    key: "notification",
    label: "sidebar.notification",
    leftIcon: "ion-android-mail"
  },
  {
    key: "apartment",
    label: "sidebar.apartment",
    leftIcon: "ion-android-home"
  },
  {
    key: "user",
    label: "sidebar.user",
    leftIcon: "ion-android-person-add"
  },
  {
    key: "contract",
    label: "sidebar.contract",
    leftIcon: "ion-ios-paper"
  },
  {
    key: "booking",
    label: "sidebar.booking",
    leftIcon: "ion-android-clipboard"
  },
  {
    key: "ticket",
    label: "sidebar.ticket",
    leftIcon: "ion-closed-captioning"
  },
  {
    key: "promotion",
    label: "sidebar.promotion",
    leftIcon: "ion-ios-color-wand"
  },
  {
    key: "feedback",
    label: "sidebar.feedback",
    leftIcon: "ion-email-unread"
  },
  {
    key: "faq",
    label: "sidebar.faq",
    leftIcon: "ion-help-circled"
  },
  {
    key: "news",
    label: "sidebar.news",
    leftIcon: "ion-ios-list"
  },
  {
    label: "sidebar.supplier",
    leftIcon: "ion-android-contact",
    children: [
      {
        key: "supplier",
        label: "sidebar.supplier.supplier"
      },
      {
        key: "reviewsupplier",
        label: "sidebar.supplier.review"
      }
    ]
  },
  {
    label: "sidebar.config",
    leftIcon: "ion-android-settings",
    children: [
      {
        key: "project",
        label: "sidebar.config.project",
        leftIcon: "ion-folder"
      },
      {
        key: "service",
        label: "sidebar.config.service"
      },
      {
        key: "config",
        label: "sidebar.config.config",
      },
      {
        key: "aboutus",
        label: "sidebar.config.aboutus",
      },
      {
        key: "term",
        label: "sidebar.config.term",
      }
    ]
  },
];
export default options;
