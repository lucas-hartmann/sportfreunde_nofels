"use client";

import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

import {
  Flag,
  Trophy,
  Users,
  Building,
  LucideIcon,
} from "lucide-react";

import timelineElements from "@/data/timeline";

const iconMap: Record<string, LucideIcon> = {
  flag: Flag,
  trophy: Trophy,
  users: Users,
  building: Building,
};

export default function ClubTimeline() {
  return (
    <section className="bg-white py-16 px-6">

      <VerticalTimeline>
        {timelineElements.map((element) => {
          const IconComponent = iconMap[element.icon];
          return (
            <VerticalTimelineElement
              key={element.id}
              date={element.date}
              iconStyle={{
                background: "#7b1e12", 
                color: "#fff",
              }}
              icon={<IconComponent className="text-white" />}
              contentStyle={{
                background: "#f9fafb", // gray-50
                color: "#1f2937", // gray-800
                borderRadius: "0.75rem",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
              contentArrowStyle={{ borderRight: "7px solid #f9fafb" }}
            >
              <h3 className="text-xl font-semibold">{element.title}</h3>
              <h5 className="text-sm text-gray-500">{element.location}</h5>
              <p className="mt-2 text-gray-700">{element.description}</p>

              {element.buttonText && (
                <a
                  href="/"
                  className="inline-block mt-4 px-4 py-2 rounded-xl bg-primary text-white hover:bg-gray-700 transition"
                >
                  {element.buttonText}
                </a>
              )}
            </VerticalTimelineElement>
          );
        })}
      </VerticalTimeline>
    </section>
  );
}