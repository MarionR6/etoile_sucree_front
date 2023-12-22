import { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import Carousel from './components/Carousel/Carousel';
import styles from "./Homepage.module.scss";
import { Link } from "react-router-dom";
import ServiceCard from './components/ServiceCard/ServiceCard';
import SquareCards from './components/SquareCards/SquareCards';

// Image imports
import HomepageHeader from "../../assets/img/HomepageImg/header.jpg";
import StoryImg from "../../assets/img/HomepageImg/histoire.jpg";
import imgSurPlace from "../../assets/img/HomepageImg/Services/sur-place.jpg";
import imgSalon from "../../assets/img/HomepageImg/Services/salon-the.jpg";
import imgLivraison from "../../assets/img/HomepageImg/Services/livraison-traiteur.jpg";


export default function Homepage() {

    const [homeRecipes, setHomeRecipes] = useState([]);

    useEffect(() => {
        async function getRecipesForHomepage() { // FETCH DATA FROM RECIPES TABLE IN DATABASE
            try {
                const response = await fetch(`http://localhost:8000/api/recipes/getRecipesHomepage`);
                if (response.ok) {
                    const recipesFromBack = await response.json();
                    setHomeRecipes(recipesFromBack);
                }
            } catch (error) {
                console.error(error);
            }
        } getRecipesForHomepage();
    }, []);

    return (
        <main>
            <Header srcImg={HomepageHeader} />
            <section>
                <Carousel />
            </section>
            <section className={`${styles.sectionBrown}`}>
                <article className={`${styles.storyContainer}`}>
                    <h1>Notre histoire</h1>
                    <div className={`${styles.txtImgContainer}`}>
                        <div className={`${styles.imgStory}`}>
                            <img src={StoryImg} alt="Photo d'une personne sortant une plaque de gâteaux d'un four" />
                        </div>
                        <div className={`line-dark ${styles.lineStory}`}></div>
                        <div className={`cardPink ${styles.txtStory}`}>
                            <p>Notre aventure sucrée a commencé modestement dans une cuisine familiale, avec une passion pour la pâtisserie et une pincée d'amour. Chaque cupcake que nous créons raconte une histoire, celle de notre parcours passionné et des moments doux partagés en famille. Chaque tourbillon de glaçage, chaque garniture délicieuse est le fruit d'un héritage sucré transmis de génération en génération.</p>
                        </div>
                    </div>
                </article>
            </section>

            <section>
                <article className={`${styles.servicesContainer}`}>
                    <h1>Nos services</h1>
                    <div className={styles.allServices}>
                        <ServiceCard
                            servImg={imgSurPlace}
                            altImg={"Photo de cupcakes"}
                            title={"Sur place ou à emporter"}
                            servTxt={"Laissez-vous séduire par nos créations, à déguster au sein de notre boutique, ou à emporter afin d’en profiter où que vous alliez !"}
                            isButton={true}
                            txtButton={"Voir la carte"}
                            titleButton={"Cliquez pour accéder à la carte"}
                            linkContent={"/carte"} />
                        <ServiceCard
                            servImg={imgSalon}
                            altImg={"Photo de tasses de thé et de cupcakes"}
                            title={"Notre salon de thé"}
                            servTxt={"Découvrez notre espace salon de thé ! Passez un agréable moment dans une atmosphère unique et chaleureuse. Réservation du salon disponible avec une capacité de 30 personnes maximum !"}
                            isButton={false}
                            isReversed={true} />
                        <ServiceCard
                            servImg={imgLivraison}
                            altImg={"Photo de cupcakes sur des plateaux"}
                            title={"Livraisons et traiteur"}
                            servTxt={"Apportez une touche sucrée à vos événements spéciaux. Nous pouvons également vous livrer à domicile pour toute commande de plus de 100 euros."}
                            isButton={true}
                            txtButton={"Découvrir"}
                            titleButton={"Cliquez pour accéder aux services"}
                            linkContent={"/services"} />
                    </div>
                </article>
            </section>

            <section className={styles.sectionBrown}>
                <article className={styles.forYouContainer}>
                    <h1>Juste pour vous</h1>
                    <div className={`cardPink ${styles.txtRecipes}`}>
                        <p>Plongez chaque mois dans de nouvelles recettes sélectionnées soigneusement par notre équipe, juste pour vous ! Régalez-vous avec de douces créations et mettez en avant votre esprit créatif, votre imagination est votre seule limite !</p>
                    </div>
                    <h2 className={styles.titleOnTheBill}>Nos recettes à l'affiche</h2>
                    <div className={`line-dark ${styles.underline}`}></div>
                    <div
                        className={styles.recipesContainer}>
                        {homeRecipes.map((r, index) => (
                            <SquareCards
                                key={index}
                                image={`http://localhost:8000/${r.img}`}
                                recipeName={r.recipeName}
                                id={r.idRecipe} />
                        ))}
                    </div>

                    <Link to="/recettes" className={`btn ${styles.linkHomepage}`}>Venez les découvrir !</Link>
                </article>
            </section>
        </main>
    );
}
