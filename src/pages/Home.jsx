import { useSelector } from "react-redux";
import { Container, Button } from "../components/index.js";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { faShieldAlt } from '@fortawesome/free-solid-svg-icons';

function Home() {
    const authStatus = useSelector((state) => state.auth.status)
    const navigate = useNavigate()

    const navigateAccordingToStatus = () => {
        if (authStatus) {
            navigate('/add-post')
        } else {
            navigate('/login')
        }
    }

    return (
        <Container>
            <div className="my-[20px] sm:my-[30px]">
                <section className="flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-16 gap-8 bg-[#89BDF9]  rounded-[5px] sm:rounded-4xl">
                    {/* <!-- Left Text --> */}
                    <div className="md:w-1/2 text-center md:text-left">
                        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-white">Share Your Thoughts With The World</h1>
                        <p className="text-lg text-white mb-6">Create, Read And Explore Blogs According To Your Interest</p>
                        <Button className="rounded-lg text-white hover:bg-blue-700 px-6 py-3 transition duration-300" onClick={navigateAccordingToStatus}>
                            Start Blogging
                        </Button>
                    </div>

                    {/* <!-- Right Image --> */}
                    <div className="md:w-1/2">
                        <img src="/images/hero_section.jpg" alt="Blog Image"
                            className="w-full object-cover aspect-[16/9]" />
                    </div>
                </section>

                <section className="px-6 md:px-20 py-16 bg-white">
                    {/* Heading */}
                    <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
                        Why Our Platform is Best
                    </h2>

                    {/* Cards Container */}
                    <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto">
                        {/* Card 1 */}
                        <div className="flex-1 bg-blue-100 p-6 rounded-lg shadow-md text-center">
                            <div className="flex items-center justify-center mb-2 text-blue-700 text-3xl">
                                <FontAwesomeIcon icon={faIndianRupeeSign} />
                            </div>
                            <h3 className="text-xl font-semibold mb-2 text-blue-700">100% Free</h3>
                            <p className="text-gray-700">
                                Create and publish your blog posts easily without any charges or hidden fees. Enjoy unlimited posts, no subscription required, and full control over your content.
                            </p>
                        </div>

                        {/* Card 2 */}
                        <div className="flex-1 bg-green-100 p-6 rounded-lg shadow-md text-center">
                            <div className="flex items-center justify-center mb-2 text-green-700 text-3xl">
                                <FontAwesomeIcon icon={faCheckCircle} />
                            </div>
                            <h3 className="text-xl font-semibold mb-2 text-green-700">Simple & Easy</h3>
                            <p className="text-gray-700">
                                Create your blog in just a few simple steps with an easy-to-use interface designed for everyone.
                            </p>
                        </div>

                        {/* Card 3 */}
                        <div className="flex-1 bg-purple-100 p-6 rounded-lg shadow-md text-center">
                            <div className="flex items-center justify-center mb-2 text-purple-700 text-3xl">
                                <FontAwesomeIcon icon={faShieldAlt} />
                            </div>
                            <h3 className="text-xl font-semibold mb-2 text-purple-700">Privacy Guaranteed</h3>
                            <p className="text-gray-700">
                                Your data and content are safe with us. We respect your privacy and never share your information without permission.
                            </p>
                        </div>
                    </div>
                </section>

                <section
                    className="relative w-full px-6 md:px-20 py-24 bg-cover bg-center bg-no-repeat rounded-[5px] sm:rounded-4xl text-white bg-[url('/images/blog.jpg')]"
                >
                    {/* Overlay (for readability) */}
                    <div className="absolute inset-0 bg-black/60 bg-opacity-60 rounded-[5px] sm:rounded-4xl"></div>

                    {/* Text Content */}
                    <div className="relative z-10 max-w-3xl mx-auto text-center">
                        <h1 className="text-3xl md:text-5xl font-bold mb-6">Have Something To Share?</h1>
                        <p className="text-lg md:text-xl mb-6">Join our platform and start writing today!</p>
                        <Button className="bg-white text-purple-700 hover:bg-purple-600 hover:text-white rounded-lg px-6 py-3 transition duration-300" onClick={navigateAccordingToStatus}>
                            Start Blogging
                        </Button>
                    </div>
                </section>

            </div>
        </Container>
    )
}

export default Home;