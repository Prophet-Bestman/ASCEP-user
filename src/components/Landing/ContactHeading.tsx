import { FaRegEnvelope } from "react-icons/fa";
import ContactCard from "./ContactCard";
import { IoChatbubbleOutline, IoCallOutline } from "react-icons/io5";
import { CiLocationOn } from "react-icons/ci";

export default function ContactHeading() {
  return (
    <div className="section-padding">
      <div className="py-10 text-center lg:text-start ">
        <p className="text-lg uppercase text-primary">Contact us</p>
        <h3 className="mb-6 text-white">We’d love to hear from you</h3>

        <p className="text-2xl text-subtle_text">
          Our friendly team is always here to chat.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
        {contactCard.map((card) => (
          <ContactCard key={card.title} card={card} />
        ))}
      </div>
    </div>
  );
}

const contactCard = [
  {
    icon: <FaRegEnvelope />,
    title: "Chat to sales",
    subtitle: "Speak to our friendly team.",
    contact: "sales@paybox360.com",
  },
  {
    icon: <IoChatbubbleOutline />,
    title: "Chat to support",
    subtitle: "Chat to support",
    contact: "support@paybox360.com",
  },
  {
    icon: <CiLocationOn />,
    title: "Visit us",
    subtitle: "Chat to support",
    contact: "Alara, Yaba, Lagos",
  },
  {
    icon: <IoCallOutline />,
    title: "Call us",
    subtitle: "Mon-Fri from 8am to 5pm.",
    contact: "+234 (0) 900-000-0000",
  },
];
