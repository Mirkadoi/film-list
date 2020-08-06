import React from 'react';
import {Form} from 'react-bootstrap';

interface IProps {
    select: object,
    callback: (arg: string) => void
    libel: string,
}

const Select= (props: IProps) => {
    const {select, callback, libel} = props;
    const options = Object.entries(select);

    return (
        <Form.Group>
            <Form.Label>{libel}</Form.Label>
            <Form.Control as="select" size="sm" onChange={(e) => callback(e.target.value)}>
                {options.map(([val, title]: [string, string ]) => (
                    <option key={val} value={val}>{title}</option>
                    )
                )}
            </Form.Control>
        </Form.Group>
    );
};

export default Select;
