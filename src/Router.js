import {createBrowserRouter} from "react-router-dom";
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


const router = createBrowserRouter([

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
    path: '/login',
    element: <Login />,
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
       path : '/MyPagePreferences',
        element : <MyPagePreferences />,
    },

    {
        path : '/MyPageReviews',
        element : <MyPageReviews />,
    },

    {
        path : '/StoreDetail',
        element : <StoreDetail />,
    },

    {
      path : '/StoreCreate',
      element : <StoreCreate />,
    },

    // {
    //   path : '/classDetail',
    //   element : <ClassDetail />,
    // },
    // {
    //   path : '/auth',
    //   element : <TeacherMiddleWare />,
    // },
    // {
    //   path : '/authSignup',
    //   element : <TeacherSignup />,
    // },
    // {
    //   path : '/createCommunity',
    //   element : <CreateCommunity />,
    // },
    // {
    //   path : '/createSchedule',
    //   element : <CreateSchedule />,
    // },
    // {
    //   path : '/createBoard',
    //   element : <CreateBoard />,
    // },
    // {
    //   path : '/createAlbum',
    //   element : <CreateAlbum />,
    // },
    // {
    //   path : '/modifyInfo',
    //   element : <ModifyInfo />,
    // },
  {
    path: '/StoreDetail',
    element: <StoreDetail />,
  },
  {
    path: '/main',
    element: <Main />,
  },

]);

export default router;