import React from 'react';
import '../styles/rgpd.css';
import Footer from '../components/Footer';
import NavBarHome from '../components/NavBarHome';
import rgpd from '../assets/rgpd.png'

function RGPD(){
    return(
        <div id={"rgpdpage"}>
            <NavBarHome nav={""} btnContent={"Go to Home page"}/>
            <div id={"rgpdcontainer"}>
                <img id={"rgpdimg"} src={rgpd} alt={"rgpd"}/>
                <p> ERØDƎ makes it a priority to respect and ensure the protection of our users' personal data.
                    That is why we will not use your data for any purpose whatsoever.</p>
                <p> However, we will carry out archiving work in case of legal and criminal necessity in order to help the justice.
                    Your data will be saved in a secure archive which we will only keep for 2 years.</p>
                <p> Whenever you'll decide to delete your account, every piece of information will be deleted from our database.</p>
                <p> For any information or additional request, please contact us at the following address ERØDƎ@gmail.com </p>
            </div>

            <Footer/>
        </div>
    )
}

export default RGPD;