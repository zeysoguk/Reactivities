import React from 'react';
import { Message } from "semantic-ui-react";

interface Props {
    errors: string[] | null;
}

export default function ValidationError({errors}: Props) {
    return (
        <Message error>
            {errors && Array.isArray(errors) && (
                <Message.List>
                    {errors.map((err, i) => (
                        <Message.Item key={i}>{err}</Message.Item>
                    ))}
                </Message.List>
            )}
        </Message>
    )
}
