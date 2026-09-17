// export default function TermsAgreement({
//   register,
//   errors,
// }) {
//   return (
//     <div className="terms-section stagger-item" style={{ "--animation-delay": '.15s' }}>
//       <p>I agree to</p>

//       <div className="terms-options">

//         <label>
//           <input
//             type="checkbox"
//             {...register("terms")}
//           />

//           <span>Terms of Service</span>
//         </label>

//         {errors.terms && (
//           <span className="field-error stagger-item" style={{ "--animation-delay": '.15s' }}>
//             {errors.terms.message}
//           </span>
//         )}

//         <label>
//           <input
//             type="checkbox"
//             {...register("privacy")}
//           />

//           <span>Privacy Policy</span>
//         </label>

//         {errors.privacy && (
//           <span className="field-error stagger-item" style={{ "--animation-delay": '.15s' }}>
//             {errors.privacy.message}
//           </span>
//         )}

//       </div>
//     </div>
//   );
// }
export default function TermsAgreement({
    register,
    errors,
}) {
    return (
        <div className="terms-section stagger-item" style={{ "--animation-delay": '.15s' }}>
            <p>I agree to</p>

            <div className="terms-options">

                <label>
                    <div className="" style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'inline-flex', justifyContent: 'start', alignItems: 'center', gap: '10px' }}>
                            <input
                                type="checkbox"
                                {...register("terms")}
                            />

                            <span>Terms of Service</span>
                        </div>
                        {errors.terms && (
                            <span className="field-error " >
                                {errors.terms.message}
                            </span>
                        )}
                    </div>
                </label>


                <label>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'inline-flex', justifyContent: 'start', alignItems: 'center', gap: '10px' }}>

                        <input
                            type="checkbox"
                            {...register("privacy")}
                        />

                        <span>Privacy Policy</span>
                        </div>
                        {errors.privacy && (
                            <span className="field-error" >
                                {errors.privacy.message}
                            </span>
                        )}
                    </div>
                </label>


            </div>
        </div>
    );
}