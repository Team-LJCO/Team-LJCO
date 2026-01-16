import { Route, Routes } from "react-router-dom";
import RecipeList from "../pages/recipes/RecipeList";

function AppRoutes() {
    return (
        <Routes>
             {/* http://localhost:5173/recipes 
             이 url치면 레시피 목록 나옴 !!
              */}
            <Route path = "/recipes" element= {<RecipeList />} />
        </Routes>
    );
}

export default AppRoutes;