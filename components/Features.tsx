"use client";

import { motion, useAnimation } from "framer-motion";
import { useState, useEffect } from "react";
import { FaLanguage, FaFileAlt, FaSearch, FaRobot } from "react-icons/fa";
import Image from "next/image";
import Lottie from "react-lottie";
import animationData2 from "@/public/Animation - header.json";
import animationData1 from "@/public/Animation - data digit.json";

interface Service {
  icon: JSX.Element;
  title: string;
  description: string;
}

const documentProcessingServices: Service[] = [
  {
    icon: <FaLanguage className="text-7xl text-gray-900" />,
    title: "MultiLingual Document Support",
    description: "Supports most languages around the world. ",
  },
  {
    icon: <FaRobot className="text-7xl text-gray-900" />,
    title: "Vast Document Support",
    description:
      "All documents support ranging from Banking, Finance, Lending, Legal, Insurance, etc.",
  },
  {
    icon: <FaFileAlt className="text-7xl text-gray-900" />,
    title: "Document Classification & Information Retrieval",
    description: "Classify documents and retrieve information efficiently.",
  },
  {
    icon: <FaSearch className="text-7xl text-gray-900" />,
    title: "Document Agents",
    description: "Automated agents to handle document processing tasks.",
  },
];

function useTypewriter(text: string, duration = 2000): string {
  const [currentText, setCurrentText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (isTyping) {
      if (currentText.length < text.length) {
        const timeout = setTimeout(() => {
          setCurrentText(text.slice(0, currentText.length + 1));
        }, 100);
        return () => clearTimeout(timeout);
      } else {
        setIsTyping(false);
      }
    }
  }, [currentText, isTyping, text]);

  return currentText;
}

function TypewriterHeading({ text }: { text: string }) {
  const currentText = useTypewriter(text, 2000);

  return (
    <h2 className="text-5xl font-bold mb-16 text-center">
      <span className="text-blue-500">{currentText || "\u00A0"}</span>
    </h2>
  );
}

interface ServiceCardProps {
  service: Service;
  index: number;
}

function ServiceCard({ service, index }: ServiceCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="flex flex-col items-center text-center px-8 relative h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="mb-8">{service.icon}</div>
      <h3 className="text-3xl font-bold mb-6 text-black">{service.title}</h3>
      <p className="text-gray-600 mb-8 text-lg">{service.description}</p>
      <div className="mt-auto relative">
        <div className="flex items-center justify-center text-primary font-semibold text-xl">
          <motion.span
            initial={{ opacity: 0, width: 0 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              width: isHovered ? "auto" : 0,
            }}
            transition={{ duration: 0.3 }}
            className="mr-2 overflow-hidden whitespace-nowrap"
          >
            Learn More
          </motion.span>
          <motion.span
            animate={{ x: isHovered ? 10 : 0 }}
            transition={{ duration: 0.3 }}
          >
            →
          </motion.span>
        </div>
      </div>
      {index < documentProcessingServices.length - 1 && (
        <div className="absolute right-0 top-1/4 bottom-1/4 w-px bg-gray-200" />
      )}
    </motion.div>
  );
}

export default function Services() {
  const defaultOptions2 = {
    loop: true,
    autoplay: true,
    animationData: animationData2,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const defaultOptions1 = {
    loop: true,
    autoplay: true,
    animationData: animationData1,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <section className="min-h-screen flex flex-col items-center bg-white py-20 w-full">
      <div className="container mx-auto px-4">
        <TypewriterHeading text="Intelligent Document Processing" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {documentProcessingServices.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </div>
      <div className="container mx-auto px-4 mt-20">
        <h2 className="text-5xl font-bold mb-16 text-center text-blue-500">
          Intelligent Data Digitization from documents
        </h2>
        <div className="flex flex-col md:flex-row items-center gap-8">
          <Lottie
            options={defaultOptions1}
            style={{ width: "40%", height: "40%" }}
          />
          <div className="md:w-1/2">
            <p className="text-gray-600 text-lg">
              Innosync AI is your data transformation partner. We leverage
              AI-powered OCR and NLP to quickly and accurately extract valuable
              insights from unstructured documents, streamlining workflows,
              improving decision-making, and ensuring compliance. Our scalable
              platform handles large volumes of data effortlessly, helping you
              accelerate your digital journey. Let&apos;s unlock the hidden
              value in your documents together.
            </p>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-20">
        <h2 className="text-5xl font-bold mb-16 text-center text-blue-500">
          Data Analytics & ML Solutions
        </h2>
        <div className="flex flex-col md:flex-row-reverse items-center gap-8">
          <Lottie
            options={defaultOptions2}
            style={{ width: "40%", height: "40%" }}
          />
          <div className="md:w-1/2">
            <p className="text-gray-600 text-lg">
              Innosync AI, dedicated to empowering businesses with
              the power of data. Our team of experienced data scientists and
              engineers leverages the latest analytical tools and techniques to
              turn raw data into actionable insights. Whether you&apos;re
              seeking to improve operational efficiency, enhance customer
              experience, or identify new revenue opportunities, our data
              analytics and machine learning services provide the foresight you
              need to make informed decisions. By combining cutting-edge
              technology with deep domain expertise, we help our clients
              transform data into a competitive advantage.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
