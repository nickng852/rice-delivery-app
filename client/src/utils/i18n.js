import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    fallbackLng: "en",
    resources: {
      en: {
        translation: {
          openLid: "Open Lid",
          closeLid: "Close Lid",
          status: "Status",
          online: "Online",
          offline: "Offline",
          charge: "Charge",
          charging: "Charging",
          notCharging: "Not Charging",
          batteryLevel: "Battery Level",
          currentLocation: "Current Location",
          lidStatus: "Lid Status",
          lidOpen: "Opened",
          lidClose: "Closed",
          deliveryStatus: "Delivery Status",
          standBy: "Stand By",
          readyToFill: "Ready to fill",
          readyForDelivery: "Ready for delivery",
          arrived: "Arrived",
          chooseDestination: "Choose a Destination",
          go: "Go",
          lidOpening: "Lid is now opening...",
          lidClosing: "Lid is now closing...",
          robotOffline: "Robot is currently offline.",
          robotCharging: "Robot is currently charging.",
          robotBatteryLow: "Battery Level is low.",
          robotNotClose: "Please close the lid before delivery.",
          noDestination: "Please select destination before delivery.",
          destinationConflict:
            "Target destination cannot be the same with current location.",
          transitionText: "Please wait... Robot is now going to ",
          transitionHomeText: "Please wait... Robot is now going to Home.",
          confirm: "Confirm",
        },
      },
      tc: {
        translation: {
          openLid: "開蓋",
          closeLid: "關蓋",
          status: "狀態",
          online: "在線",
          offline: "離線",
          charge: "充電",
          charging: "充電中",
          notCharging: "非充電狀態",
          batteryLevel: "電量",
          currentLocation: "目前位置",
          lidStatus: "機蓋",
          lidOpen: "已打開",
          lidClose: "已關閉",
          deliveryStatus: "運送狀態",
          standBy: "待命",
          readyToFill: "待置物",
          readyForDelivery: "可運送",
          arrived: "已到達目的地",
          chooseDestination: "選擇目的地",
          go: "出發",
          lidOpening: "機蓋正在打開中...",
          lidClosing: "機蓋正在關閉中...",
          robotOffline: "機械人現在處於離線狀態。",
          robotCharging: "機械人正在充電中。",
          robotBatteryLow: "機械人電量過低，請先充電。",
          robotNotClose: "請先關閉機蓋再操作。",
          noDestination: "請先選擇目的地。",
          destinationConflict: "目的地與當前位置相同，請重新選擇。",
          transitionText: "請稍候，機械人正在前往",
          transitionHomeText: "請稍候，機械人正在返回起始點",
          confirm: "確認",
        },
      },
    },
  });
