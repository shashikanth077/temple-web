import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { useForm } from 'react-hook-form';
import AddGod from '../addGod';

const mockStore = configureStore([]);

describe('AddGod', () => {
    let store;

    beforeEach(() => {
        store = mockStore({
            // mock your redux store state here if needed
        });
    });

    test('renders AddGod component', () => {
        render(
            <Provider store={store}>
                <AddGod />
            </Provider>,
        );

        // Add your assertions here
        expect(screen.getByText('Add')).toBeInTheDocument();
        expect(screen.getByLabelText('Name')).toBeInTheDocument();
        expect(screen.getByLabelText('Worship Day')).toBeInTheDocument();
        expect(screen.getByLabelText('Description')).toBeInTheDocument();
        expect(screen.getByLabelText('Image')).toBeInTheDocument();
    });

    test('submits the form', () => {
        const { result } = useForm();

        render(
            <Provider store={store}>
                <AddGod />
            </Provider>,
        );

        // Fill in the form fields
        fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Test God' } });
        fireEvent.change(screen.getByLabelText('Worship Day'), { target: { value: 'Monday' } });
        fireEvent.change(screen.getByLabelText('Description'), { target: { value: 'Test description' } });
        fireEvent.change(screen.getByLabelText('Image'), { target: { files: [new File([''], 'test.jpg', { type: 'image/jpeg' })] } });

        // Submit the form
        fireEvent.submit(screen.getByTestId('God-form'));

        // Add your assertions here
        expect(result.current.values.name).toBe('Test God');
        expect(result.current.values.worshipDay).toBe('Monday');
        expect(result.current.values.description).toBe('Test description');
        expect(result.current.values.image).toBeInstanceOf(File);
    });
});
