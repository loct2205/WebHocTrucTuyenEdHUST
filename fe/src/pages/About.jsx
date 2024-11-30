import React from "react"

import FoundingStory from "../assets/Images/FoundingStory.jpg"
import BannerImage1 from "../assets/Images/aboutus1.jpg"
import BannerImage2 from "../assets/Images/aboutus2.jpg"
import BannerImage3 from "../assets/Images/aboutus3.jpg"

import Footer from "../components/common/Footer"
import LearningGrid from "../components/core/AboutPage/LearningGrid"
import Quote from "../components/core/AboutPage/Quote"
import StatsComponenet from "../components/core/AboutPage/Stats"
import HighlightText from "../components/core/HomePage/HighlightText"
import Img from "../components/common/Img"
import ReviewSlider from './../components/common/ReviewSlider';

import { motion } from 'framer-motion';
import { fadeIn } from "../components/common/motionFrameVarients"





const About = () => {
    return (
        <div>
            <section className="bg-richblack-700">
                <div className="relative mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-center text-white">
                    <motion.header
                        className="mx-auto py-20 text-4xl font-semibold lg:w-[70%]"
                    >
                        <motion.p
                            variants={fadeIn('down', 0.1)}
                            initial='hidden'
                            whileInView={'show'}
                            viewport={{ once: false, amount: 0.1 }}
                        > Thúc đẩy đổi mới trong giáo dục trực tuyến <br/>
                            <HighlightText text={"vì một tương lai tươi sáng"} />
                        </motion.p>

                        <motion.p
                            variants={fadeIn('up', 0.1)}
                            initial='hidden'
                            whileInView={'show'}
                            viewport={{ once: false, amount: 0.1 }}
                            className="mx-auto mt-3 text-center text-base font-medium text-richblack-300 lg:w-[95%]">
                            EdHUST tiên phong trong việc đổi mới giáo dục trực tuyến, với sứ mệnh tạo dựng một tương lai tươi sáng.
                            Chúng tôi mang đến các khóa học đột phá, ứng dụng công nghệ hiện đại và xây dựng một cộng đồng học tập sôi động.
                        </motion.p>
                    </motion.header>

                    <div className="sm:h-[70px] lg:h-[150px]"></div>

                    <div className=" absolute bottom-0 left-[50%] grid w-[100%] translate-x-[-50%] translate-y-[30%] grid-cols-3 gap-3 lg:gap-5">
                        <Img src={BannerImage1} alt="" />
                        <Img src={BannerImage2} alt="" />
                        <Img src={BannerImage3} alt="" />
                    </div>
                </div>
            </section>

            <section className="border-b border-richblack-700">
                <div className="mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-richblack-500">
                    <div className="h-[100px] "></div>
                    <Quote />
                </div>
            </section>

            <section>
                <div className="mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-richblack-500">
                    <div className="flex flex-col items-center gap-10 lg:flex-row justify-between">
                        <motion.div
                            variants={fadeIn('right', 0.1)}
                            initial='hidden'
                            whileInView={'show'}
                            viewport={{ once: false, amount: 0.1 }}
                            className="my-24 flex lg:w-[50%] flex-col gap-10">
                            <h1 className="bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] bg-clip-text text-4xl font-semibold text-transparent lg:w-[80%] ">
                                Câu Chuyện Khởi Nguồn
                            </h1>
                            <p className="text-base font-medium text-richblack-300 lg:w-[95%] text-align: justify">
                                Nền tảng e-learning của chúng tôi ra đời từ một tầm nhìn chung và niềm đam mê trong việc đổi mới giáo dục.
                                Tất cả bắt đầu với một nhóm nhà giáo dục, chuyên gia công nghệ, và những người yêu thích học tập suốt đời,
                                những người có nhu cầu về cơ hội học tập linh hoạt,
                                chất lượng cao và dễ tiếp cận trong một thế giới số hóa đang thay đổi nhanh chóng.
                            </p>
                            <p className="text-base font-medium text-richblack-300 lg:w-[95%] text-justify">
                                Là những nhà giáo dục giàu kinh nghiệm, chúng tôi đã trực tiếp chứng kiến những hạn chế
                                và thách thức của hệ thống giáo dục truyền thống. Chúng tôi tin rằng giáo dục không nên
                                bị giới hạn trong bốn bức tường lớp học hay bởi ranh giới địa lý. Chúng tôi hình dung một
                                nền tảng có thể xóa bỏ những rào cản đó, trao quyền cho mọi người ở mọi tầng lớp xã hội khai phá tối đa tiềm năng của mình.
                            </p>
                        </motion.div>

                        <motion.div
                            variants={fadeIn('left', 0.1)}
                            initial='hidden'
                            whileInView={'show'}
                            viewport={{ once: false, amount: 0.1 }}
                        >
                            <Img
                                src={FoundingStory}
                                alt="FoundingStory"
                                className="shadow-[0_0_20px_0] shadow-[#FC6767]"
                            />
                        </motion.div>
                    </div>

                    <div className="flex flex-col items-center lg:gap-10 lg:flex-row justify-between">
                        <div className="my-24 flex lg:w-[40%] flex-col gap-10">
                            <h1 className="bg-gradient-to-b from-[#FF512F] to-[#F09819] bg-clip-text text-4xl font-semibold text-transparent lg:w-[70%] ">
                                Tầm nhìn
                            </h1>
                            <p className="text-base font-medium text-richblack-300 lg:w-[95%] text-justify">
                            Với tầm nhìn đó, chúng tôi bắt đầu hành trình tạo ra một nền tảng e-learning cách mạng hóa cách con người học tập. 
                            Đội ngũ chuyên gia tận tâm của chúng tôi đã làm việc không ngừng để phát triển một nền tảng mạnh mẽ, dễ sử dụng, 
                            kết hợp công nghệ tiên tiến với nội dung hấp dẫn, mang lại trải nghiệm học tập sôi động và tương tác.
                            </p>
                        </div>

                        <div className="my-24 flex lg:w-[40%] flex-col gap-10">
                            <h1 className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text text-4xl font-semibold lg:w-[70%] ">
                                Sứ mệnh
                            </h1>
                            <p className="text-base font-medium text-richblack-300 lg:w-[95%] text-justify">
                            Sứ mệnh của chúng tôi không chỉ đơn giản là cung cấp các khóa học trực tuyến. 
                            Chúng tôi mong muốn tạo ra một cộng đồng học tập sôi động, nơi mọi người có thể kết nối, 
                            hợp tác và học hỏi lẫn nhau. Chúng tôi tin rằng tri thức phát triển trong môi trường chia sẻ và đối thoại, 
                            đông thời chúng tôi khuyến khích tinh thần hợp tác này thông qua các diễn đàn, 
                            buổi học trực tiếp và cơ hội giao lưu kết nối.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <StatsComponenet />

            <section className="mx-auto mt-20 flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-white">
                <LearningGrid />
            </section>

            {/* Reviws from Other Learner */}
            <div className="mt-14 w-11/12 mx-auto max-w-maxContent flex-col items-center justify-between gap-8 first-letter bg-richblack-900 text-white">
                <h1 className="text-center text-4xl font-semibold mt-8">
                    Phản hồi từ học viên
                </h1>
                <ReviewSlider />
            </div>

            {/* footer */}
            <Footer />
        </div>
    )
}

export default About