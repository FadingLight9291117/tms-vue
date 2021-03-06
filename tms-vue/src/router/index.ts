import Vue from "vue";
import VueRouter, {Route} from "vue-router";
import AdminLogin from "@/views/admin/AdminLogin.vue";
import Admin from "@/views/admin/Admin.vue";
import Error from "@/views/Error.vue";
import StudentSignUp from "@/views/admin/adminViews/StudentSignUp.vue";
import index from "@/views/custom/index.vue";
import CoachSignUp from "@/views/admin/adminViews/CoachSignUp.vue";
import Classes from "@/views/admin/adminViews/Classes.vue";
import Course from "@/views/admin/adminViews/Course.vue";
import StudentInfo from "@/views/admin/adminViews/StudentInfo.vue";
import CoachInfo from "@/views/admin/adminViews/CoachInfo.vue";
import {Message} from "element-ui";
import News from "@/views/admin/adminViews/News.vue";
import Editor from "@/components/admin/newsComponents/Editor.vue";
import OnlineWork from "@/views/admin/adminViews/OnlineWork.vue";
import AddVideo from "@/components/admin/onlineWorkComponents/AddVideo.vue";
import AllVideo from "@/components/admin/onlineWorkComponents/AllVideo.vue";
import SignUp from "@/views/custom/SignUp.vue"
import Login from "@/views/custom/Login.vue";
import Home from "@/views/custom/Home.vue";
import Index from "@/views/custom/Index.vue";


Vue.use(VueRouter);

// 验证是否登录
const userAuthenticated = (next: Function) => {
    const data = {
        type: Vue.$cookies.get("type"),
        phone: Vue.$cookies.get("account"),
        password: Vue.$cookies.get("password")
    };
    if (data.type != null && data.phone != null && data.password != null)
        Vue.$axios
            .post("/login/auth", data)
            .then(resp => resp.data ? next() : next("/adminLogin"))
            .catch(() => {
                Message.error("网络连接错误")
                next("/adminLogin")
            });
    else
        next("/adminLogin")
};

const routes = [
    {
        path: "/",
        component: Index
    },
    {
        path: "/index",
        name: "index",
        component: Index
    },
    {
        path: "/signUp",
        name: "signUp",
        component: SignUp
    },
    {
        path: "/login",
        name: "login",
        component: Login
    },
    {
        path: "/home",
        name: "home",
        component: Home
    },
    {
        path: "/admin",
        name: "admin",
        component: Admin,
        beforeEnter(to: Route, from: Route, next: any) {
            userAuthenticated(next);
        },
        children: [
            {
                path: "studentSignUp",
                name: "studentSignUp",
                component: StudentSignUp
            },
            {
                path: "coachSignUp",
                name: "coachSignUp",
                component: CoachSignUp
            },
            {
                path: "classes",
                name: "classes",
                component: Classes
            },
            {
                path: "course",
                name: "course",
                component: Course
            },
            {
                path: "studentInfo",
                name: "studentInfo",
                component: StudentInfo
            },
            {
                path: "coachInfo",
                name: "coachInfo",
                component: CoachInfo
            },
            {
                path: "news",
                name: "news",
                component: News
            },
            {
                path: "editor",
                name: "editor",
                component: Editor
            },
            {
                path: "onlineWork",
                name: "onlineWork",
                component: OnlineWork
            },
            {
                path: "addVideo",
                name: "addVideo",
                component: AddVideo
            },
            {
                path: "allVideo",
                name: "allVideo",
                component: AllVideo
            }
        ]
    },
    {
        path: "/adminLogin",
        name: "adminLogin",
        component: AdminLogin
    },
    {
        path: "*",
        name: "error",
        component: Error
    }
];

const router = new VueRouter({
    routes
});

export default router;
