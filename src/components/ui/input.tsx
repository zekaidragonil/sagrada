import React, { useState } from 'react';
import ImageComponent from './ImageComponent';
import Tooltip from './Tooltip';


interface CustomInputEventTarget extends HTMLInputElement {
  price: number;
  typeForm: string;
}


interface InputProps {
  label: string;
  date?: string | number | null;
  name: string;
  typeForm: string;
  price: number;
  placeholder?: string;
  type: string;
  id?: string;
  tooltip?: string;
  innerId?: string;
  value? : number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: () => void;
}


const Input: React.FC<InputProps> = ({ label, date, name, typeForm, price, placeholder, type,  tooltip, ...props }) => {
  const [value, setValue] = useState(date || (props.value && typeof props.value === 'number' ? props.value : 0)); 
  const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value as string;
    
    if (props.onChange) {
      props.onChange({
        ...event,
        target: {
          ...event.target,
          name,
          value: newValue,
          price,
          typeForm,
          type,
        }as CustomInputEventTarget,
      });
    }
  };

  const increment = (event: React.MouseEvent) => {
    event.preventDefault();
    let newValue = Number(value) + 1;
    if (newValue < 0) newValue = 0;
    setValue(newValue);

    if (props.onChange) {
      const customEvent: React.ChangeEvent<CustomInputEventTarget> = {
        ...event,
        target: {
          ...event.target,
          name,
          value: newValue.toString(),
          price,
          typeForm,
          type
        } as CustomInputEventTarget,
        currentTarget: event.currentTarget as CustomInputEventTarget, // Ensure currentTarget is correctly typed
      };

      props.onChange(customEvent);
    }
  };

  const decrement = (event: React.MouseEvent) => {
    event.preventDefault();
    let newValue = Number(value) - 1;
    if (newValue < 0) newValue = 0;
    setValue(newValue);

    if (props.onChange) {
      const customEvent: React.ChangeEvent<CustomInputEventTarget> = {
        ...event,
        target: {
          ...event.target,
          name,
          value: newValue.toString(),
          price,
          typeForm,
          type
        } as CustomInputEventTarget,
        currentTarget: event.currentTarget as CustomInputEventTarget, // Ensure currentTarget is correctly typed
      };

      props.onChange(customEvent);
    }
  };
  return (
    <div className="hero__form__blk">
      <div className="d-flex gap-2 mb-2">{`${label} `}
        {tooltip && <Tooltip text={tooltip}>
          <ImageComponent src='/images/icons/info_icon.svg' alt="icon" width={19} height={19} />
        </Tooltip>}
      </div>
      {type !== "date" ? (
        <div className="Ticket_quantity" data-input="qty__a">
          <button onClick={decrement} type="button" className="counter__decrement">-</button>
          <input className="counter__input"
            id={props?.innerId}
            itemID='input'
            type="number"
            value={value}
            onChange={handleChange}
            name={name}
          />
          <button type="button" onClick={increment} className="counter__increment">+ </button>
        </div>
      ) : (type === "date" && (
        <div className="Ticket_quantity" {...props}>
          <div className='datepicker'> {date !== null ? date : placeholder}
          </div>
        </div>

      ))}

    </div>
  );
};

export default Input;