'use client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { useForm, SubmitHandler } from 'react-hook-form';
import styles from './contactForm.module.css';

type Inputs = {
    name: string;
    email: string;
    message: string;
};

// const sendEmail = async (name: string, email: string, message: string) => {
//     try {
//         return sgMail.send({
//             to: 'goddard.reece@gmail.com',
//             from: 'goddard.reece@gmail.com',
//             templateId: 'd-b4ebece6acbd4f909ae437279151fdd0',
//             dynamicTemplateData: {
//                 name,
//                 email,
//                 message,
//             },
//         });
//     } catch (error) {
//         console.error('Erorr sending mail:', error);
//     }
// };

export const ContactForm = () => {
    const {
        handleSubmit,
        register,
        reset,
        formState: { errors, isSubmitSuccessful },
    } = useForm<Inputs>();

    const onSend: SubmitHandler<Inputs> = async data => {
        // await sendEmail(data.name, data.email, data.message);
        reset();
    };

    return (
        <form className={styles.contactForm} onSubmit={handleSubmit(onSend)}>
            <input {...register('name', { required: true })} type="text" placeholder="Name..." />
            {errors.name?.type === 'required' ? <div className={styles.formError}>Name is required.</div> : null}
            <input {...register('email', { required: true })} type="text" placeholder="Email..." />
            {errors.email?.type === 'required' ? <div className={styles.formError}>Email is required.</div> : null}
            <textarea {...register('message', { required: true })} placeholder="Message..."></textarea>
            {errors.message?.type === 'required' ? <div className={styles.formError}>Message is required.</div> : null}
            <button disabled={isSubmitSuccessful} type="submit">
                {isSubmitSuccessful ? 'Sending...' : 'Send'}
            </button>
        </form>
    );
};

// onClick={()=> window.open(`mailto:goddard.reece@gmail.com?subject="Message from reecegoddard.com"&body=${body}`)}
