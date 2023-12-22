import styles from './ForgottenPassword.module.scss';
import { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { AuthContext } from '../../../context';
import { useNavigate } from 'react-router-dom';
import Banner from '../../../components/Banner/Banner';
import BrownStrip from '../../../components/BrownStrip/BrownStrip';

export default function ForgottenPassword() {

    const [feedbackGood, setFeedbackGood] = useState("");
    const [feedback, setFeedback] = useState("");
    const { setResetPasswordCode, setChangingPassword } = useContext(AuthContext);

    const navigate = useNavigate();

    const yupSchema = yup.object({
        email: yup
            .string()
            .required("Le champ est obligatoire")
            .matches(
                /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                "Votre email n'est pas valide"
            ),
    });

    const defaultValues = {
        email: ""
    };

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues,
        mode: "onChange",
        resolver: yupResolver(yupSchema),
    });

    async function submit(values) {
        setFeedback("");

        try {
            const response = await fetch(`http://localhost:8000/api/users/resetForgottenPassword/${values.email}`);
            if (response.ok) {
                const resetCodeFromBack = await response.json();
                setResetPasswordCode(resetCodeFromBack); // SETS THE RESET CODE TO THE RANDOMLY GENERATED CODE SENT BY EMAIL TO THE USER
                setFeedbackGood("Un email vous a été envoyé. Vous allez être redirigé(e).");
                setChangingPassword(true); // USED TO ENABLE THE ACCESS TO THE PROTECTED ROUTE
                setTimeout(() => {
                    navigate(`/resetPassword?email=${values.email}`);
                }, 3000);

            } else {
                const responseFromBack = await response.json();
                setFeedback(responseFromBack);
            }
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <>
            <Banner />
            <section className={styles.sectionContainer}>
                <div className={styles.forgottenPasswordContainer}>
                    <h1>Mot de passe oublié ?</h1>
                    <form onSubmit={handleSubmit(submit)} className={styles.form}>
                        <div className={styles.formPart}>
                            <label htmlFor="email">
                                Email :
                            </label>
                            <input type="email" id="email" {...register("email")} />
                        </div>
                        <div className={styles.inputError}>
                            {errors?.email && (
                                <p className={`${styles.feedback}`}>{errors.email.message}</p>
                            )}
                            {feedback && <p>{feedback}</p>}
                            {feedbackGood && <p>{feedbackGood}</p>}
                        </div>

                        <button className="btn" disabled={isSubmitting}>
                            Valider
                        </button>
                    </form>
                </div>
            </section>
            <BrownStrip />
        </>
    );
}
