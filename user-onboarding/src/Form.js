import React from "react";

export default function UserForm(props) {
    const { values, submit, change, disabled, errors } = props;

    const onSubmit = (evt) => {
        evt.preventDefault();
        submit();
    }

    const onChange = (evt) => {
        const { name, value, type, checked } = evt.target
        const valueToUse = type === 'checkbox' ? checked : value
        change(name, valueToUse);
    };

return (
    <form className="form container" onSubmit={onSubmit}>
        <div className="form-group submit">
            <h2>NEW USER!</h2>

            <button disable={disabled}>SUBMIT</button>
            
            <div className="errors">
                <div>{errors.name}</div>
                <div>{errors.email}</div>
                <div>{errors.password}</div>
            </div>
        </div>


        <div className="form-group inputs">
            <h3>General Information</h3>

            <label>
                name
                <input
                value={values.name}
                onChange={onChange}
                name="name"
                type="text" 
                />
            </label>

            <label>
                email
                <input
                value={values.email}
                onChange={onChange}
                name="email"
                type="text" 
                />
            </label>

            <label>
                password
                <input
                value={values.password}
                onChange={onChange}
                name="password"
                type="text" 
                />
            </label>

            <label>
                Terms Of Service
            </label>
            <input 
            type='checkbox'
            name='tos'
            checked={values.tos}
            onChange={onChange} 
            />


        </div>
    </form>
)
}