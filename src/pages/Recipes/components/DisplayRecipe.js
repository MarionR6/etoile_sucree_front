import { useContext, useEffect, useState } from 'react';
import styles from './DisplayRecipe.module.scss';
import { AuthContext } from '../../../context';
import { toggleLikeRecipe } from '../../../api/recipes';
import { Link, useNavigate } from 'react-router-dom';

export default function DisplayRecipe({ chosenRecipe, brownBackground }) {

    const [isLiked, setIsLiked] = useState();

    const { user } = useContext(AuthContext);

    const idUser = user?.idUser;

    const navigate = useNavigate();

    const handleLike = async (id, idUser) => { // FUNCTION TO TOGGLE THE LIKE IN FRONT AND BACK
        setIsLiked(!isLiked);
        await toggleLikeRecipe(id, idUser);
    };

    useEffect(() => {
        async function getFavoriteRecipes() {
            try {
                if (!idUser) {
                    setIsLiked(false);
                }
                const response = await fetch(`https://etoile-sucree-back.vercel.app/api/recipes/getFaves/${idUser}`);
                if (response.ok) {
                    const favesFromBack = await response.json(); // STORES THE FETCHED DATA
                    const isRecipeLiked = favesFromBack.some((fave) => fave.idRecipe === chosenRecipe[0]?.idRecipe);//Searching through the array "chosenRecipe", testing each element of the array to find whether the chosenRecipe is part of the array, if it is, it sets the liked state to true, if it is not, it is set to false. I am using this in order to render the heart in the recipe display component conditionally
                    setIsLiked(isRecipeLiked);
                }
            } catch (error) {
                console.error(error);
            }
        } getFavoriteRecipes(idUser);
    }, [idUser, chosenRecipe]);

    return (
        <div className={styles.displayRecipeContainer}>{chosenRecipe ? (
            <div className={brownBackground ? (`cardPink ${styles.txtContainer}`) : (`cardBrown ${styles.txtContainer}`)} id={brownBackground && styles.brownBackgroundTxtContainer}>
                <div className={brownBackground ? `${styles.heartContainer} ${styles.darkHeart}` : styles.heartContainer}>
                    {user ? (
                        <button
                            type="button"
                            onClick={() => handleLike(chosenRecipe[0].idRecipe, idUser)}>
                            {brownBackground ?
                                !isLiked ? (
                                    <i
                                        className="fa-regular fa-heart"
                                        style={{ color: "var(--text-color-dark)" }}></i>
                                ) : (
                                    <i
                                        className="fa-solid fa-heart"
                                        style={{ color: "var(--text-color-dark)" }}></i>
                                ) : (
                                    !isLiked ? (
                                        <i className="fa-regular fa-heart"></i>
                                    ) : (
                                        <i className="fa-solid fa-heart"></i>
                                    )
                                )}
                        </button>
                    ) : (
                        <button
                            type="button"
                            onClick={() => navigate("/utilisateur")}>
                            {brownBackground ? (
                                <i
                                    className="fa-regular fa-heart"
                                    style={{ color: "var(--text-color-dark)" }}></i>
                            ) : (
                                <i className="fa-regular fa-heart"></i>
                            )}
                        </button>)}
                </div>
                <h3>
                    {chosenRecipe[0]?.recipeName}
                </h3>
                <div className={styles.imgContainer} id={brownBackground && styles.brownBackgroundImgContainer}>
                    {chosenRecipe[0]?.img && <img src={`https://etoile-sucree-back.vercel.app/${chosenRecipe[0]?.img}`} className={styles.currentRecipeImage} id={brownBackground ? styles.allRecipesImg : undefined} alt="" />} </div>
                <div className={brownBackground ? `line-light ${styles.line}` : `line-dark ${styles.line}`}></div>
                <div className={styles.currentRecipeInfo}>
                    <div className={styles.timeRecipe}>
                        <i className="fa-regular fa-clock"></i>
                        <div>
                            <p>Préparation : {chosenRecipe[0]?.preparingTime}</p>
                            <p>Cuisson : {chosenRecipe[0]?.cookingTime}</p>
                        </div>
                    </div>
                    <div className={styles.currentRecipeDifficulty}>
                        {chosenRecipe[0]?.difficulty === "facile" && <i className="fa-solid fa-circle-dot"></i>}
                        {chosenRecipe[0]?.difficulty === "intermédiaire" && <><i className="fa-solid fa-circle-dot"></i> <i className="fa-solid fa-circle-dot"></i></>}
                        {chosenRecipe[0]?.difficulty === "difficile" && <><i className="fa-solid fa-circle-dot"></i> <i className="fa-solid fa-circle-dot"></i>
                            <i className="fa-solid fa-circle-dot"></i></>}
                        <p>{chosenRecipe[0]?.difficulty}</p>
                    </div>
                    <div className={styles.currentRecipePeople}>
                        <i className="fa-solid fa-users"></i>
                        <p>
                            {chosenRecipe[0]?.nbrOfPeople} {chosenRecipe[0]?.nbrofPeople === 1 ? ("personne") : ("personnes")}
                        </p>

                    </div>
                </div>
                <div className={styles.buttonContainer}>
                    <Link to={`/recette/${chosenRecipe[0]?.idRecipe}`}>
                        <button type="button" className={brownBackground ? `btn btn-secondary` : "btn"}>
                            Voir la recette
                        </button></Link>
                </div>

            </div>) : ("")}
        </div>
    );
}
