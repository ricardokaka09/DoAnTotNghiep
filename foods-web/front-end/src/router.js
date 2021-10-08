import { Redirect, Switch, Route } from "react-router-dom"
import { modules } from "./utils/routes"
import LayoutAuth from "./components/auth/Layout"
import LayoutMaster from "./components/master/Layout"
import LayoutDefault from "./components/default/Layout"

export const AuthRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={matchProps => (
            <LayoutAuth {...rest}>
                <Component {...matchProps} />
            </LayoutAuth>
        )} />
    )
}

export const MasterRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={matchProps => (
            <LayoutMaster {...rest}>
                <Component {...matchProps} />
            </LayoutMaster>
        )} />
    )
}
export const DefaultRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={matchProps => (
            <LayoutDefault {...rest}>
                <Component {...matchProps} />
            </LayoutDefault>
        )} />
    )
}

const CustomRouter = () => (
    <Switch>
        <Route exact path="/">
            <Redirect to="login" />
        </Route>
        {modules.map(item => {
            const token = localStorage.getItem("token");
            const user_type = localStorage.getItem("user_type");
            debugger;
            var moduleComponent = require(`./views/${item.component}`).default;
            if (item.auth) {
                if (token) {
                    if (user_type == item.user_type) {
                        if (item.layout == "master") {
                            return (
                                <MasterRoute key={item.path} path={`/${item.path}`} component={moduleComponent} />
                            );
                        } else {
                            return (
                                <div>abc</div>
                            );
                        }
                    } else {
                        localStorage.clear();
                        return <Redirect to="login" />
                    }
                } else {
                    localStorage.clear();
                    return <Redirect to="login" />
                }
            } else {
                return (
                    <AuthRoute key={item.path} path={`/${item.path}`} component={moduleComponent} />
                )
            }
        })}
    </Switch>
);
export default CustomRouter;