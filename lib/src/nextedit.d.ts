declare module 'nextedit' {
    import React from 'react';

    export interface NextEditProps {
        onChange: (html: string) => void;
    }

    const NextEdit: React.FC<NextEditProps>;

    export default NextEdit;
}