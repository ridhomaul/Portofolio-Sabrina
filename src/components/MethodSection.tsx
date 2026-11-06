import React from "react";
import Image from "next/image";
import { methodSteps } from "@/data/portfolio";

export default function MethodSection() {
  return (
    <section className="method" id="method" data-8b-section="method">
      <div className="method__stage">
        <div className="method__head">
          <h2 className="m-text-2" data-8b-motion="trail">
            From reconnaissance to recommendation
          </h2>
          <p className="m-text-7">
            Four systematic stages. Grounded in ecological principles, verified by spatial analysis and local community engagement.
          </p>
        </div>
        <ol className="method__track" data-8b-items=":scope > li">
          {methodSteps.map((step) => (
            <li key={step.number} className="method__frame">
              <figure className="method__photo">
                <Image
                  src={step.image}
                  width={1600}
                  height={1068}
                  sizes="(max-width: 700px) 85vw, 45vw"
                  alt={step.alt}
                />
              </figure>
              <div className="method__text">
                <p className="method__step m-text-4">{step.number}</p>
                <h3 className="m-text-5">{step.title}</h3>
                <p className="m-text-7">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
