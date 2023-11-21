import {createBrowserRouter} from "react-router-dom";
import Review from "./components/Review";
import ReviewInsert from "./components/ReviewInsert";
import Community from "./components/Community";
import Login from "./Login";
import KakaoCallBack from "./KakaoCallBack";


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
      path : 'oauth2/callback/kakao',
      element : <KakaoCallBack />,
    },
    // {
    //   path : '/Comment',
    //   element : <Comment />,
    // },
    // {
    //   path : '/commentDetail',
    //   element : <CommentDetail />,
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