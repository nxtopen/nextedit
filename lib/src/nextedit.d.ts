declare module 'nextedit' {
    import React from 'react';

    export interface NextEditProps {
        onChange: (html: string) => void;
        content: string; // Update content prop type to string
        id: string; // Add id prop
    }

    const NextEdit: React.FC<NextEditProps>;

    export default NextEdit;
}