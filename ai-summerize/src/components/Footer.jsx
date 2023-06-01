
import { SocialIcon } from 'react-social-icons';
function Footer() {
    return (
        <div>
            <footer className="text-gray-600 body-font">
                <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
                    <h3 className="text-2xl font-serif">Trello <span className="text-indigo-400">2.0</span></h3>
                    <p className="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">© 2023 Akhilesh —
                        <a href="https://twitter.com/knyttneve" className="text-gray-600 ml-1" rel="noopener noreferrer" target="_blank">@akhileshpujar</a>
                    </p>
                    <div className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">



                        <SocialIcon url="https://www.linkedin.com/in/akhilesh-pujar-70aa26212/"
                            bgColor='transparent'
                            fgColor='gray'
                        />


                        <SocialIcon url="https://github.com/Akhilesh-pujar"
                            bgColor='transparent'
                            fgColor='gray'
                        />

                        <SocialIcon url="https://akhileshpujar.vercel.app/"
                            bgColor='transparent'
                            fgColor='gray'

                        />



                    </div>
                </div>
            </footer>

        </div>
    )
}

export default Footer
