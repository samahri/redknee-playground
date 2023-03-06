import * as React from 'react';
import { createHashRouter, RouterProvider } from 'react-router-dom';

import PlaygroundPage from './pages/PlaygroundPage';
import WelcomePage from './pages/WelcomePage';

const uuidRegex = '^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$';

const router = createHashRouter([
    {
        path: '/',
        element: <WelcomePage />
        
    },
    {
        path: `/game/:id`,
        element: <PlaygroundPage />
    }
]);

const App = () => {
    return (
        <div>
            {/* TODO: put RouterProvider in separate file */}
            <RouterProvider router={router} />
        </div>
    );
};

export default App;