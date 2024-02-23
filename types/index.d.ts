// @types/nextedit/index.d.ts

import React from 'react';

export interface NEXTEditorProps {}

export interface NEXTEditorState {
  htmlContent: string;
}

declare const NEXTEditor: React.FC<NEXTEditorProps>;

export default NEXTEditor;