import React from "react";
import { Provider } from "react-redux";
import { store, history, persistor } from "./redux/store";
import PublicRoutes from "./router";
import { ThemeProvider } from "styled-components";
import { LocaleProvider } from "antd";
import { IntlProvider } from "react-intl";
import themes from "./settings/themes";
import AppLocale from "./languageProvider";
import config, {
  getCurrentLanguage
} from "./containers/LanguageSwitcher/config";
import { themeConfig } from "./settings";
import DashAppHolder from "./dashAppStyle";
import { PersistGate } from "redux-persist/integration/react";
import vi_VN from "antd/lib/locale-provider/vi_VN";
import "moment/locale/vi";

const currentAppLocale =
  AppLocale[getCurrentLanguage(config.defaultLanguage || "english").locale];

const DashApp = () => (
  <LocaleProvider locale={vi_VN}>
    <IntlProvider
      locale={currentAppLocale.locale}
      messages={currentAppLocale.messages}
    >
      <ThemeProvider theme={themes[themeConfig.theme]}>
        <DashAppHolder>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <PublicRoutes history={history} />
            </PersistGate>
          </Provider>
        </DashAppHolder>
      </ThemeProvider>
    </IntlProvider>
  </LocaleProvider>
);

export default DashApp;
export { AppLocale };
