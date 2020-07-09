import React from 'react';
import { useForm } from 'react-hook-form';

const ContactSettings = ({ user }) => {

    const {register, handleSubmit, errors, watch} = useForm();

    const onSubmit = (data) => {
        console.log(data)
        //edit user in the database
    }


    return(
        <div className="contact-settings">
            <h2 className="contact-settings-title" >Contact Settings</h2>
            <form className="contact-settings-form" onSubmit={handleSubmit(onSubmit)}>
                <div className="country-company">
                    <div className="label-input">
                        <label htmlFor="country">Country</label>
                        <input
                          name="country"
                          id="country"
                        defaultValue={user.country}
                          type="text"
                          ref={register} />
                    </div>
                    <div className="label-input">
                        <label htmlFor="company">Company</label>
                        <input
                          name="company"
                          id="company"
                            defaultValue={user.company}
                          type="text"
                          ref={register} />
                    </div>
                </div>
                <div className="position-role">
                    <div className="label-input">
                        <label htmlFor="position">Position</label>
                        <input
                          name="position"
                          id="position"
                          defaultValue={user.position}
                          type="text"
                          ref={register} />
                    </div>
                    <div className="label-input">
                        <label htmlFor="user-type">User Type</label>
                        <select name="role" id="user-type" ref={register}>
                            <option value="attendee">attendee</option>
                            <option value="speaker">speaker</option>
                        </select>
                    </div>
                    
                </div>
                <button type="submit">Save Settings</button>
            </form>
        </div>
    );
}

export default ContactSettings;