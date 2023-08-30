import React from "react";

const Footer = () => {
    return (
        <div className="absolute bottom-0 w-screen bg-[#000000] text-[#bbbbbb] text-left">
            <div className="w-[80%] mx-auto flex">
                <div className="w-[80%] pr-[5rem]">
                    <p className="pt-[1rem]">More about USC Biomechanics Research Lab</p>
                    <div className="flex justify-between pb-[1rem]">
                        <a href="https://dornsife.usc.edu/labs/biomech/" target="_blank" rel="noreferrer" className="text-[#D4D4FC] no-underline">Our Lab</a>
                        <a href="https://dornsife.usc.edu/labs/biomech/research/" target="_blank" rel="noreferrer" className="text-[#D4D4FC] no-underline">Research</a>
                        <a href="https://dornsife.usc.edu/labs/biomech/education/" target="_blank" rel="noreferrer" className="text-[#D4D4FC] no-underline">Education</a>
                        <a href="https://dornsife.usc.edu/labs/biomech/facilities/" target="_blank" rel="noreferrer" className="text-[#D4D4FC] no-underline">Facilities</a>
                        <a href="https://dornsife.usc.edu/labs/biomech/people/" target="_blank" rel="noreferrer" className="text-[#D4D4FC] no-underline">People</a>
                    </div>
                </div>
                <div className="w-[20%] text-right pt-[0.5rem]">
                    <a href="https://dornsife.usc.edu/" target="_blank" rel="noreferrer"><img src="./assets/Donsife.jpg" alt="Dornsife_logo" className='h-[4.8rem]' /></a>
                </div>
            </div>
        </div>
    )
}

export default Footer;