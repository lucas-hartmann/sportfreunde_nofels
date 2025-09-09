export type TimelineElement = {
  id: number;
  title: string;
  location: string;
  description: string;
  date: string;
  icon: "flag" | "trophy" | "users" | "building";
  buttonText?: string;
};

const timelineElements: TimelineElement[] = [
  {
    id: 1,
    title: "Vereins Gründung",
    location: "Feldkich, Nofels",
    description:
      "Der Klub wurde 1988 von Fussball-begeisterten Hobbykickern ins leben gerufen.",
    date: "1988",
    icon: "flag",
  },
  {
    id: 2,
    title: "First Championship",
    location: "Vorarlberg League",
    description:
      "We won our very first regional championship — a proud moment for our small team!",
    buttonText: "See Photos",
    date: "2003",
    icon: "trophy",
  },
  {
    id: 3,
    title: "Youth Academy Established",
    location: "Club Training Grounds",
    description:
      "Launched our youth academy to train and inspire the next generation of players.",
    date: "2010",
    icon: "users",
  },
  {
    id: 4,
    title: "New Clubhouse",
    location: "Nofels",
    description:
      "Built a modern clubhouse for training, events, and social gatherings.",
    date: "2015",
    icon: "building",
  },
];

export default timelineElements;
