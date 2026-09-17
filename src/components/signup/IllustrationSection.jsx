// import image from '../../../public/images/signup/Mauli_pic'

import Image from "next/image";

export default function IllustrationSection() {
    return (
        <section className="illustration-section">
                <img
                    src="/images/signup/antologist_sideImg.jpg"
                    alt="Signup illustration"
                    width={400}
                    height={600}
                />
            {/* <div className="illustration-placeholder">
            </div> */}
        </section>
    );
}