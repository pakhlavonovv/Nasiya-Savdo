import loadable from "@loadable/component"
import Loading  from "../components/loading";


const SignIn = loadable(()=> import ("./auth/pages/sign-in"),{
    fallback: <Loading/>
})

const SignUp = loadable(()=> import ("./auth/pages/sign-up"),{
    fallback: <Loading/>
})


export { SignIn, SignUp }