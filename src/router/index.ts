import Vue from "vue";
import VueRouter from "vue-router";
import Login from "@/views/Login.vue";
import Admin from "@/views/Admin.vue";
import Error from "@/views/Error.vue";
import StudentSignUp from "@/views/adminViews/StudentSignUp.vue";
import Home from "@/views/Home.vue";
import Test from "@/views/Test.vue"
import CoachSignUp from "@/views/adminViews/CoachSignUp.vue"

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        component: () => import("@/components/signUpComponents/SexChart.vue")
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
            }
        ]
    },
    {
        path: "/login",
        name: "login",
        component: Login
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
