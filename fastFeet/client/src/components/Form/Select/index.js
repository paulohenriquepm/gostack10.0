import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import { lighten } from 'polished';

import { Container } from './styles';

export default function SelectComponent({
  name,
  options,
  onChange,
  defaultValue,
  label,
  placeholder,
}) {
  return (
    <Container>
      <label>{label}</label>
      <Select
        name={name}
        options={options}
        onChange={onChange}
        defaultValue={defaultValue}
        placeholder={placeholder}
        theme={theme => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary: '#7d40e7',
            primary25: lighten(0.3, '#7d40e7'),
          },
        })}
      />
    </Container>
  );
}

SelectComponent.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  onChange: PropTypes.func.isRequired,
  defaultValue: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
    .isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
};
