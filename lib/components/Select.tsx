import React, { SelectHTMLAttributes, useEffect, useRef } from 'react';

import useField from '../useField';

interface Option {
  id: string;
  title: string;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  label?: string;
  options: Option[];
  placeholder: string;
}

function Select({ name, label, options, placeholder, ...rest }: SelectProps) {
  const ref = useRef<HTMLSelectElement>(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);

  useEffect(() => {
    if (ref.current) {
      registerField({ name: fieldName, ref: ref.current, path: 'value' });
    }
  }, [ref.current, fieldName]);

  return (
    <>
      {label && <label htmlFor={fieldName}>{label}</label>}

      <select
        {...rest}
        multiple={false}
        id={fieldName}
        name={fieldName}
        defaultValue={defaultValue}
        aria-label={fieldName}
        ref={ref}
      >
        <option data-testid="select-placeholder" value="">
          {placeholder}
        </option>
        {options.map(({ id, title }: Option) => (
          <option key={id} value={id}>
            {title}
          </option>
        ))}
      </select>

      {error && <span>{error}</span>}
    </>
  );
}

Select.defaultProps = {
  placeholder: 'Select...',
};

export default Select;
