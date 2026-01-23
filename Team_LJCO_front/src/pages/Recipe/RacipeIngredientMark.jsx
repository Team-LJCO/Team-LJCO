export default function RecipeIngredientMark({ingredients}) {
    const whatColor = ingredients.matchedColor;

    const ingColor = {
        G : { background: "#B9F6CA", color: "#000" },
        R : { background: "#FFCDD2", color: "#000" },
        N : { background: "#F0F0F0", color: "#999" },
    };

    const style = ingColor[whatColor] ?? ingColor.N;
    
return(
    <span style = {{
        ...style,
        padding: "4px 10px",
        borderRadius: "8px",
        fontSize: "11px",
        display: "inline-block",

    }}>
        {ingredients.ingName}
</span>
);
}