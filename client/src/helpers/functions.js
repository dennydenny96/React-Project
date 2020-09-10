import React from 'react'

export function filterFunction(cell) {
    return (
        <input
            type="text"
            onKeyUp={event => {
                cell.onChange(event.target.value);
            }}
            style={{ width: '100%' }}
        />
    )
}