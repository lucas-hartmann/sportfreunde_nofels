import { ArrowRightIcon, LucideIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export type NavCard = {
  title: string;
  href: string;
  description: string;
  image: string;
  icon: LucideIcon;
  cta: string;
};

type Props = {
  items: NavCard[];
};

export default function NavCardGrid({ items }: Props) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
      {items.map((item) => (
        <Link
          key={item.title}
          href={item.href}
          className="flex flex-col rounded-lg shadow-md bg-white border border-gray-200 hover:shadow-xl transition-shadow duration-200"
        >
          <div className="aspect-video w-full relative">
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover rounded-t-lg aspe"
            />
          </div>

          <div className="p-6 flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <item.icon
                  className="text-primary"
                  size={26}
                  strokeWidth={2.2}
                />
                <h3 className="text-xl font-bold text-black">{item.title}</h3>
              </div>
              <p className="text-gray-600 mb-3">{item.description}</p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-primary">{item.cta}</span>
              <ArrowRightIcon className="text-primary w-5 h-5" />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
