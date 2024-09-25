"use client";

import React from "react";
import Lottie from "react-lottie";
import animationData from "@/public/Animation - analytics.json";

const AboutUs = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <section className="w-full min-h-screen py-16 bg-[#f7f7f7]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
            <Lottie
              options={defaultOptions}
              style={{ width: "80%", height: "80%" }}
            />
          </div>
          <div className="w-full lg:w-1/2">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">About Us</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Welcome to Innosync AI, where Innovation meets precision in the
              world of document Intelligence. We are a cutting edge tech company
              at the forefront of Generative AI solutions. Our mission is to
              revolutionize how businesses interact with, analyze, and derive
              value from their document ecosystem and unstructured data
              repositories.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed mt-4">
              {" "}
              Join us on our journey to unlock the full potential of your
              document intelligence and drive innovation in your organization.
              At Innosync AI, we&apos;re not just processing documents.
              We&apos;re unlocking the future of business intelligence.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
