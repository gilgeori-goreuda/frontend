import {createBrowserRouter} from "react-router-dom";
import Review from "./components/Review";
import ReviewInsert from "./components/ReviewInsert";
import Community from "./components/Community";
import Login from "./Login";
import KakaoCallBack from "./KakaoCallBack";
import Comment from "./components/Comment";
import MyPage from "./components/myPage/MyPage";
import MyPagePreferences from "./components/myPage/MyPagePreferences";
import MyPageReviews from "./components/myPage/MyPageReviews";
import StoreDetail from "./components/myPage/StoreDetail";

const router = createBrowserRouter([

    {
      path : '/review',
      element : <Review />,
    },
    {
      path : '/reviewInsert',
      element : <ReviewInsert />,
    },
    {
      path : '/community',
      element : <Community />,
    },
    {
      path : '/login',
      element : <Login />,
    },
    {
      path : '/oauth/kakao/callback',
      element : <KakaoCallBack />,
    },
    {
      path : '/Comment',
      element : <Comment />,
    },
    // {
    //   path : '/commentDetail',
    //   element : <CommentDetail />,
    //   path : '/main',
    //   element : <Main />,
    // },
    // {
    //   path : '/myClass',
    //   element : <MyClass />,
    // },
     {
       path : '/myPage',
       element : <MyPage />,
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

]);

export default router;