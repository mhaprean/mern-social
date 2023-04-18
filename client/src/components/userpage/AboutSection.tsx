import { BriefcaseIcon, HomeIcon, ClockIcon, MapPinIcon, BoltIcon } from '@heroicons/react/24/solid';

const AboutSection = () => {
  return (
    <div className="bg-white flex-grow rounded-md p-4 text-gray-700 font-semibold flex-shrink-0">
      <h2 className="text-md font-bold ">About</h2>
      <div className="flex flex-col py-2 gap-2">
        <div className="flex items-center">
          <BriefcaseIcon className="w-5 h-5 mr-2" />
          <p>Works at McDonalds</p>
        </div>
        <div className="flex items-center">
          <BriefcaseIcon className="w-5 h-5 mr-2" />
          <p>Works at Decathlon</p>
        </div>

        <div className="flex items-center">
          <HomeIcon className="w-5 h-5 mr-2" />
          <p>Lives in Sibiu</p>
        </div>

        <div className="flex items-center">
          <MapPinIcon className="w-5 h-5 mr-2" />
          <p>From Tg. Mures</p>
        </div>

        <div className="flex items-center">
          <BoltIcon className="w-5 h-5 mr-2" />
          <p>Joined: September 2019</p>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
