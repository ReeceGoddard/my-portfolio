import { AppProvider } from '@providers/app';
import { RouterProvider } from 'react-router-dom';
import { router } from '@routes';
import { AudioProvider } from './providers/AudioProvider';
import { LessonProvider } from './providers/LessonContext';
import './styles/reset.css';
import './styles/global.css';

function App() {
    return (
        <AppProvider>
            <AudioProvider>
                <LessonProvider>
                    <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />
                </LessonProvider>
            </AudioProvider>
        </AppProvider>
    );
}

export default App;
