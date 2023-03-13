import * as React from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './routs';

const App = () => {
    return (
        <div>
            <RouterProvider router={router} />
        </div>
    );
};

export default App;