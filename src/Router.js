import {createBrowserRouter} from "react-router-dom";
import Review from "./components/Review";
import ReviewInsert from "./components/ReviewInsert";
import Community from "./components/Community";

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
    }
    // {
    //   path : '/myClass',
    //   element : <MyClass />,
    // },
    // {
    //   path : '/myPage',
    //   element : <MyPage />,
    // },
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