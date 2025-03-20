"use client";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ButtonGroup from "./ButtonGroup";

const Plan = ({ title }) => {
  return (
    <div className="flex items-center gap-2">
      <CheckCircleIcon className="text-rose-600 text-xl" />
      <span>{title}</span>
    </div>
  );
};

const PricingCard = ({ name, title, price, btnText, trail, features }) => {
  return (
    <div className="mx-2 md:mx-3 cursor-pointer p-10 transition-all hover:shadow-lg flex flex-col gap-12 rounded-3xl border-neutral-200 border">
      <div className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold capitalize">{name}</h2>
        <span className="text-neutral-500">{title}</span>
      </div>
      <div className="flex flex-col gap-5">
        {features?.map((feature, index) => (
          <Plan key={index} title={feature} />
        ))}
      </div>
      <div className="mx-auto">
        <h2 class="text-4xl text-center leading-none flex items-center pb-4 mb-4">
          <span>${price}</span>
          <span class="text-lg ml-1 font-normal text-neutral-500">
            /Monthly
          </span>
        </h2>
        <button className="w-fit capitalize text-base hover:bg-rose-600 hover:shadow-md hover:shadow-rose-600 hover:border-2 border-2 border-transparent py-3 px-6 text-white bg-rose-600 hover:border-rose-600 hover:text-white rounded-full">
          {btnText}
        </button>
        <span className="block text-rose-600 mt-5 font-semibold animate-bounce cursor-pointer">
          {trail}
        </span>
      </div>
    </div>
  );
};

const Pricing = () => {
  const [plan, setPlan] = useState("Monthly Plan");
  const [pricingData, setPricingData] = useState({
    monthly: [],
    annual: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPricingData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/pricing"); // Replace with your API endpoint
        const data = await response.json();
        console.log(data);
        setPricingData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching pricing data:", error);
        setLoading(false);
      }
    };

    fetchPricingData();
  }, []);

  if (loading) {
    return <div className="text-center py-10">Loading pricing plans...</div>;
  }

  return (
    <section
      className="relative container mx-auto px-5 md:px-16 flex flex-col gap-5"
      id="pricing"
    >
      <div>
        <span className="service-name text-center ">PRICING PLAN</span>
        <h2 className="title text-center ">Choose your pricing policy</h2>
      </div>

      <div className="relative transition-all flex gap-1 mx-auto w-fit bg-slate-100 p-2 rounded-full">
        <div
          className={`${
            plan === "Monthly Plan" ? "left-2" : "left-[150px] w-[128px]"
          } transition-all duration-500 absolute top-[.37rem] h-[55px] w-[138px] rounded-full bg-rose-600`}
        ></div>
        <button
          onClick={() => setPlan("Monthly Plan")}
          className={`
          ${plan === "Monthly Plan" ? "text-white" : "text-rose-600"}
          z-[1] capitalize text-base hover:border-2 border-2 border-transparent py-3 px-5 hover:border-rose-600 rounded-full`}
        >
          Monthly Plan
        </button>
        <button
          onClick={() => setPlan("Annual Plan")}
          className={`
          ${plan === "Annual Plan" ? "text-white" : "text-rose-600"}
          z-[1] capitalize text-base hover:border-2 border-2 border-transparent py-3 px-5 hover:border-rose-600 rounded-full`}
        >
          Annual Plan
        </button>
      </div>

      {plan === "Monthly Plan" ? (
        <Carousel {...carouselParams}>
          {pricingData.monthly.map((plan, index) => (
            <div key={index} className={plan.suggested ? "relative" : ""}>
              {plan.suggested && (
                <span className="absolute -top-1 left-10 bg-rose-600 text-white px-2 py-1 rounded-md">
                  Suggested
                </span>
              )}
              <PricingCard
                name={plan.name}
                title={plan.title}
                price={plan.price}
                btnText={plan.btnText}
                trail={plan.trail}
                features={plan.features}
              />
            </div>
          ))}
        </Carousel>
      ) : (
        <Carousel {...carouselParams}>
          {pricingData.annual.map((plan, index) => (
            <div key={index} className={plan.suggested ? "relative" : ""}>
              {plan.suggested && (
                <span className="absolute -top-1 left-10 bg-rose-600 text-white px-2 py-1 rounded-md">
                  Suggested
                </span>
              )}
              <PricingCard
                name={plan.name}
                title={plan.title}
                price={plan.price}
                btnText={plan.btnText}
                trail={plan.trail}
                features={plan.features}
              />
            </div>
          ))}
        </Carousel>
      )}
    </section>
  );
};

export default Pricing;

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 4,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const carouselParams = {
  additionalTransfrom: 0,
  arrows: false,
  autoPLaySpeed: 3000,
  centerMode: false,
  className: "",
  containerClass: "carousel-container",
  customButtonGroup: <ButtonGroup />,
  dotListClass: "",
  draggable: true,
  focusOnSelect: false,
  infinite: true,
  itemClass: "",
  keyBoardControl: true,
  minimumTouchDrag: 80,
  renderButtonGroupOutside: true,
  renderDotsOutside: false,
  responsive: responsive,
  showDots: false,
  sliderClass: "",
  slidesToSlide: 1,
};
