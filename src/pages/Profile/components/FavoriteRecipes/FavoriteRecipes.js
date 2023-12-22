import { useContext, useEffect, useState } from 'react';
import styles from "./FavoriteRecipes.module.scss";
import { AuthContext } from '../../../../context';
import SmallCards from './components/SmallCards/SmallCards';
import { Link } from 'react-router-dom';

export default function FavoriteRecipes() {

    const { user } = useContext(AuthContext);

    const userId = user.idUser;

    const [usersFaves, setUsersFaves] = useState([]);

    useEffect(() => {
        async function getFavoriteRecipes() {
            try {
                const response = await fetch(`https://etoile-sucree-back.vercel.app/api/recipes/getFaves/${userId}`);

                if (response.ok) {
                    const favesFromBack = await response.json();
                    setUsersFaves(favesFromBack);
                }

            } catch (error) {
                console.error(error);
            }
        } getFavoriteRecipes(userId);
    }, [userId]);

    const handleDeleteFront = (id) => {
        setUsersFaves(usersFaves.filter((oneRecipe) => oneRecipe.idRecipe !== id));
    };

    return (
        <div className={styles.chosenCategory}>
            <h1 className={styles.chosenCategoryTitle}>Mes recettes préférées</h1>
            <div className={styles.recipesContainer}>
                {usersFaves.length === 0 && <p>Aucune recette en favoris</p>}
                {usersFaves.map((r, index) => (
                    <SmallCards key={index} image={`https://etoile-sucree-back.vercel.app/${r.img}`} recipeName={r.recipeName} idRecipe={r.idRecipe} handleDeleteFront={handleDeleteFront} />
                ))}
            </div>
            <Link to="/recettes" className={`btn ${styles.btn}`}>Voir toutes les recettes</Link>
        </div>
    );
}
