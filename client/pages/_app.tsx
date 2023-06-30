import "@/styles/globals.css";
import { EmptyLayout } from "../components/layout";
import { AppPropsWithLayout } from "../models/index";
import { store } from "@/stores/store";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const Layout = Component.Layout ?? EmptyLayout;

  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
