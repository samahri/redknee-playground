import React from "react";
import { LoaderFunction, Params } from 'react-router'
import { Router } from "@remix-run/router";
import { createBrowserRouter } from 'react-router-dom';

import PlaygroundPage from '../pages/PlaygroundPage';
import WelcomePage from '../pages/WelcomePage';
import Welcome from "../components/Welcome";

const uuidRegex = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

export interface LoaderInterface {
    gameId: string,
}

const validatePath: LoaderFunction = ({ params }: { params: Params }): LoaderInterface => {
    const gameId = params.id as string

    const matchedExp = gameId.match(uuidRegex);

    if (matchedExp === null || matchedExp.length !== 1) {
        throw new Response("", {
            status: 404,
            statusText: `invalid id ${gameId},`
        });
    }

    return { gameId };
}

const router: Router = createBrowserRouter([
    {
        path: '/',
        element: <Welcome />,
        children: [
            {
                index: true,
                element: <WelcomePage />,                
            },
            {
                path: `/game/:id`,
                element: <PlaygroundPage />,
                loader: validatePath,
            }

        ]   
    }
]);

export default router;