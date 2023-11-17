import {createBrowserRouter} from "react-router-dom";
import MyPage from "./components/myPage/MyPage";
import MyPagePreferences from "./components/myPage/MyPagePreferences";
import MyPageReviews from "./components/myPage/MyPageReviews";
import StoreDetail from "./components/myPage/StoreDetail";

const router = createBrowserRouter([

    // {
    //   path : '/',
    //   element : <App />,
    // },
    // {
    //   path : '/signUp',
    //   element : <Signup />,
    // },
    // {
    //   path : '/category',
    //   element : <UserCategoryType />,
    // },
    // {
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