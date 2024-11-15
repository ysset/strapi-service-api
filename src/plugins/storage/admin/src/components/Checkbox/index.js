import React, { memo, useState, useEffect } from 'react';
import {
  Checkbox,
} from '@strapi/design-system';

const CustomCheckbox = ({children, handleChange}) => {
  const [checked, setChecked] = useState(true);

  const localHandleChange = () => {
    setChecked(!checked)
    handleChange(!checked)
  }

  return (
    <Checkbox value={checked} onChange={localHandleChange}>
        {children}
    </Checkbox>
  )
}

export default CustomCheckbox;