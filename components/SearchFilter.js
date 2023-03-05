import styles from '../styles/SearchFilter.module.css';

import React, { useState } from 'react';
import Select from 'react-select';

/**
 * @param props
 * props.options = [
 *   { value: 1, label: 'Chocolate' },
 *   { value: 2, label: 'Strawberry' },
 *   { value: 2, label: 'Vanilla' },
 * ]
 */
export default function SearchFilter(props) {

    let select="";
    if (props.selectedOptions) {select = JSON.stringify(props.selectedOptions)}

    return (
        <div className="SearchFilter">
            <Select
                className={props.className}
                isMulti={props.isMulti}
                isSearchable={props.isSearchable}
                isClearable={props.isClearable}
                defaultValue={props.selectedOptions}
                onChange={props.setSelectedOptions}
                options={props.options}
                placeholder={props.placeholder}
                isOptionDisabled={props.isOptionDisabled}
            />
        </div>
    );
}