import ButtonSecondary from '../../../../components/Button/ButtonSecondary';
import styles from './SquareCards.module.scss';
import { Link } from "react-router-dom";

export default function SquareCards({ image, recipeName, id }) {
    return (
        <div className={styles.oneRecipe}>
            <img src={image} alt="" />
            <div className={styles.showTxt}>
                <p>{recipeName}</p>
                <Link to={`/recette/${id}`} className={`${styles.btnRecipe} btn`}>
                    La recette
                </Link>
                <Link to={`/recette/${id}`} className={`${styles.btnRecipeTablet} btn`}>
                    {recipeName}
                </Link>
            </div>
        </div>
    );
}
