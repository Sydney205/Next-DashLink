import Image from "next/image";

/* Components */
import Navbar from "@/components/Navbar"

export default function Home() {
  return (
    <>
      <Navbar />
      
      <main className="w-full h-max flex flex-col justify-start items-center">
        <section className="w-full h-full flex flex-col justify-start md:flex-row-reverse md:justify-center items-center px-12 pt-12">
          <div className="relative w-[80%] md:w-[50%] h-[70vh]">
            <Image
              src="/assets/woman.png" 
              alt=""
              fill
              className="object-fit"
            />
          </div>
          

          <div className="flex flex-col justify-start">
            <h2 className="font-extrabold">Welcome to <span className="text-green-400">DashLink</span></h2>
            <p className="mb-2">A Fast and Reliable URL Shortener</p>
            
            <p className="text-xl">Shorten, Share, and Simplify your links:</p>
          
            <span className="mt-4">
              <h5 className="text-green-400">
                Are your URLs too long and hard to remember?
              </h5> 
              
              <p className="w-[60%] mb-2">
                With DashLink, you can quickly and easily transform those lengthy web addresses into short, sleek, and easy-to-share links.
              </p>
              <p>Say goodbye to clunky URLs and hello to simplicity.</p>
            </span>

            <button className="mt-2 w-max primary-green-btn">Get started</button>
          </div>
        </section>

        <section className="w-full md:w-[70%] h-max flex flex-col justify-start items-center">
          <div className="px-4 pt-5 my-5 text-center" id="about">
            <h4 className="text-green-400">Why Choose DashLink?</h4>
            <div className="col-lg-6 mx-auto">
              <strong><span className='green'>1. </span> Lightening-Fast Shortening:</strong>
              <p className="lead mb-4">Our cutting-edge technology ensures your URLs are shortened in the blink of an eye and saves time</p>

              <strong><span className="green">2. </span> Custom Short Links:</strong>
              <p className="lead mb-4">Personalize your short links to make them memorable and align with your brand. Stand out from the crowd with a unique touch</p>

              <strong><span className="green">3. </span> Secure and Reliable:</strong>
              <p className="lead mb-4">Rest assured that your links are safe with a reliable measures and infrastructures.</p>
            </div>
            
            <div className="relative flex justify-center items-center w-[80%] md:w-[45%] h-[60vh]">
              <Image
                src="/assets/boy.png" 
                alt=""
                fill
                className="object-fit"
              />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
