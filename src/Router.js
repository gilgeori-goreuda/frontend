import { createBrowserRouter } from "react-router-dom";
import Review from "./components/Review";
import ReviewInsert from "./components/ReviewInsert";
import Community from "./components/Community";
import Login from "./Login";
import KakaoCallBack from "./KakaoCallBack";
import MyPage from "./components/myPage/MyPage";
import MyPagePreferences from "./components/myPage/MyPagePreferences";
import MyPageReviews from "./components/myPage/MyPageReviews";
import StoreDetail from "./components/myPage/StoreDetail";
import StoreCreate from "./components/myPage/StoreCreate";
import Main from "./components/main/Main";
import AddressSearchMap from './components/map/AddressSearchMap';
import AddressSearch from "./components/Search/AddressSearch";
import Template from "./components/Sticky/Template";
import CenterMap from "./components/map/CenterMap";
import Visit from "./components/visit/Visit";
import Report from "./components/report/Report";

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: "/",
    element: <Template />,
    children: [
      {
        path: '',
        element: <Login />, // 기본 경로에 해당하는 리디렉션
      },
      {
        path: '/review',
        element: <Review />,
      },
      {
        path: '/reviewInsert/:storeId',
        element: <ReviewInsert />,
      },
      {
        path: '/community',
        element: <Community />,
      },
      {
        path: 'oauth2/callback/kakao',
        element: <KakaoCallBack />,
      },
      {
        path: '/api/v1/search/address',
        element: <AddressSearchMap />,
      },
      {
        path: '/addressSearch',
        element: <AddressSearch />,
      },

      {
        path: '/myPage',
        element: <MyPage />,
      },

      {
        path: '/myPagePreferences',
        element: <MyPagePreferences />,
      },

      {
        path: '/myPageReviews',
        element: <MyPageReviews />,
      },

      {
        path: '/storeDetail',
        element: <StoreDetail />,
      },

      {
        path: '/storeCreate',
        element: <StoreCreate />,
      },

      {
        path: '/main',
        element: <Main />,
      },
      {
        path: '/StoreDetail/:storeId',
        element: <StoreDetail />,
      },
      {
        path: '/centerMap',
        element: <CenterMap />,
      },
      {
        path: '/visit',
        element: <Visit />,
      },
      {
        path: '/report',
        element: <Report />,
      },
    ]
  }

]);

export default router;