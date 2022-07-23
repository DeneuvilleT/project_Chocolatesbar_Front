import { Fragment, useRef } from 'react';

const AddForm = ({ visibility, title, onsubmit, inputs }) => {
   
   const fields = useRef([]);

   const logInputs = inputElem => {
      if (inputElem && !fields.current.includes(inputElem)) {
         fields.current.push(inputElem);
      };
   };

   return (
      <section>

         <h3>{title}</h3>
         <form className={visibility} ref={logInputs} onSubmit={onsubmit} >

            {inputs.map((input, index) => <Fragment key={index}>
               <label>{input.text}</label>
               <input
                  type={input.type}
                  maxLength={input.maxLength}
                  max={input.max}
                  min={input.min}
                  onChange={input.onchange}
                  placeholder={input.placeholder}
                  value={input.value} />

            </Fragment>)}

         </form>

      </section>
   );
};

export default AddForm;