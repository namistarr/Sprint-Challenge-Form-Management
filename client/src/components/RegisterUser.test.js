import React from 'react';
import RegisterUserFormik from './RegisterUser';
import { render, fireEvent } from '@testing-library/react';

describe('Register button clicked', () => {
    it('should submit when clicked', () => {
        const {getByTestId} = render(<RegisterUserFormik />);
        const button = getByTestId('submit');
        fireEvent.click(button);
    });
});
