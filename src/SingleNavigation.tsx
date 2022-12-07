import { IonRouterOutlet } from "@ionic/react"
import { IonReactRouter } from "@ionic/react-router"
import { Route } from "react-router"

// pages
import MainPage from "./pages/MainPage"
import TreeOverviewPage from "./pages/TreeOverviewPage"

const SingleNavigation: React.FC = () => {
    return (
        <IonReactRouter>
            <IonRouterOutlet>
                
                <Route exact path="/">
                    <MainPage />
                </Route>

                <Route path="/list/:id" component={TreeOverviewPage} /> 

            </IonRouterOutlet>
        </IonReactRouter>
    )
}

export default SingleNavigation