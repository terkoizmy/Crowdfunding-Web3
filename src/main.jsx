import React from 'react'
import ReactDom from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { ChainId, ThirdwebProvider} from '@thirdweb-dev/react'

import { StateContextProvider } from './context'
import App from './App'
import './index.css'

const root = ReactDom.createRoot(document.getElementById('root'));

root.render(
    <ThirdwebProvider desiredChainId={ChainId.Goerli} activeChain="goerli" clientId="8c6eb737f234f36bda73be3e320ec6c1" >
        <Router>
            <StateContextProvider>
                <App />
            </StateContextProvider>
        </Router>
    </ThirdwebProvider>
)