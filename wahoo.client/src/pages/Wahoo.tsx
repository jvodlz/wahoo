import { useEffect } from 'react';

import Navbar from '../components/Navbar';
import { triggerConfetti } from '../utils/confetti';

function Wahoo() {

    /** Default fullscreen view on page load */
    // const displayInFullscreen = () => {

    //     console.log("Requested fullscreen");

    //     const videoPlayer = document.getElementById("video-player");
    //     if (!document.fullscreenElement) {
    //         videoPlayer?.requestFullscreen()
    //             .catch((error) => {
    //                 console.log(error);
    //                 console.error(error);
    //             })
    //     }
    // }

    useEffect(() => {
        triggerConfetti();

        /** Default fullscreen view on page load */ 
        // displayInFullscreen();
        //     return () => {
        //         document.exitFullscreen();
        //     };
        
    }, []);

    return (
        <div className="min-h-full">
            <Navbar />
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
                </div>
            </header>
            <main>
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <iframe
                        id="video-player"
                        data-testid="wahoo-video"
                        className="pedro-video-content"
                        width="100%"
                        src="https://www.youtube.com/embed/F2YpXC1itEE?playlist=F2YpXC1itEE&loop=1&autoplay=1&playsinline=0&rel=0&start=21"
                        title="Pedro the Raccoon video player"
                        allow="accelerometer; fullscreen; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                    >
                    </iframe>
                </div>
            </main>
        </div>
    );
}

export default Wahoo;
