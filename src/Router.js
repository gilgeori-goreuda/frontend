import { createBrowserRouter } from "react-router-dom";
import MainMap from "./components/map/MainMap";
import AddressSearch from "./components/Search/AddressSearch";
import AddressSearchMap from "./components/map/AddressSearchMap";


const router = createBrowserRouter([

    // {
    //     path: '/',
    //     element: <App />,
    // },
    {
        path: '/api/v1/search/address',
        element: <AddressSearchMap />,
    },
    {
        path: '/addressSearch',
        element: <AddressSearch />,
    },

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