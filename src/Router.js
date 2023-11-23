import AddressSearch from "./components/Search/AddressSearch";
import AddressSearchMap from "./components/map/AddressSearchMap";
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
import Main from "./components/main/Main";
import Template from "./components/Sticky/Template";


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
        path: '/review',
        element: <Review />,
      },
      {
        path: '/reviewInsert',
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
        path: '/MyPagePreferences',
        element: <MyPagePreferences />,
      },

      {
        path: '/MyPageReviews',
        element: <MyPageReviews />,
      },

      {
        path: '/StoreDetail/:storeId',
        element: <StoreDetail />,
      },
      {
        path: '/main',
        element: <Main />,
      },

    ]
  }


]);

export default router;