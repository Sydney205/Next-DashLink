import Image from "next/image";

/* Components */
import Navbar from "@/components/Navbar"

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="w-full h-max flex flex-col">
        <section className="w-full flex flex-col justify-center md:flex-row md:justify-between items-center p-4">
          <div className="w-[80%] md:w-[40%] h-[50vh]">
            <Image
              src="/assets/woman.png" 
              alt=""
              fill={true}
              priority
            />
          </div>
          

          <div className="w-[60%] flex flex-col justify-center items-end">
            <h5 className="mb-0">A Fast and Reliable URL Shortener</h5>
            <p>Shorten, Share, and Simplify your links:</p>
          
            <span>
              <h5 className="flex flex-col gap-2">
                Are your URLs too long and hard to remember?
              </h5> 
              
              <p className="w-[50%]">
                With DashLink, you can quickly and easily transform those lengthy web addresses into short, sleek, and easy-to-share links.Say goodbye to clunky URLs and hello to simplicity.
              </p>
            </span>
          </div>
        </section>

        <section>
          <div className="px-4 pt-5 my-5 text-center" id="about">
            <h4 className="text-green-600">Why Choose DashLink?</h4>
            <div className="col-lg-6 mx-auto">
              <strong><span className='green'>1. </span> Lightening-Fast Shortening:</strong>
              <p className="lead mb-4">Our cutting-edge technology ensures your URLs are shortened in the blink of an eye and saves time</p>

              <strong><span className="green">2. </span> Custom Short Links:</strong>
              <p className="lead mb-4">Personalize your short links to make them memorable and align with your brand. Stand out from the crowd with a unique touch</p>

              <strong><span className="green">3. </span> Secure and Reliable:</strong>
              <p className="lead mb-4">Rest assured that your links are safe with a reliable measures and infrastructures.</p>
            </div>
            <div className="overflow-hidden">
              <div className="container px-5">
                <Image
                  src="/assets/boy.png" 
                  alt=""
                  width={300}
                  height={300}
                  priority
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
