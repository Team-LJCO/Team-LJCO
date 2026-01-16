import { useState, useEffect } from "react";
import { api } from "../../configs/axiosConfig";

function RecipeList() {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        //백엔드에서 들고 오는 url !!
        api.get("/recipes/all") 
            .then(res => setRecipes(res.data))
            .catch(console.error)
    },[]);

    return(
        <div>
            <h1>레시피 목록</h1>
            <ul>
                {recipes.map(r => (
                    <li key={r.rcpId}>
                        {r.rcpName}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default RecipeList;