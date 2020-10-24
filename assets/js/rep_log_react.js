import React from 'react';
import { render } from 'react-dom';
import RepLogApp from './RepLog/RepLogApp'

// const shouldShowHeart = true;

render(
    <RepLogApp
        // as a best practice, I don't want any of my React components to use variables on the window object.
        {...window.REP_LOG_APP_PROPS}
        /*
        {...window.REP_LOG_APP_PROPS}
            ^^^
              \\=== equivaut à ===\\
                                   vvv
        itemOptions={window.REP_LOG_APP_PROPS.itemOptions}
        withHeart={shouldShowHeart}*/
    />,
    document.getElementById('lift-stuff-app')
);
