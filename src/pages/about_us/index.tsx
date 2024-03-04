import { useGetAboutQuery } from "../../apis/about/queries";
import AboutItem from "../../components/about-us/AboutItem";
import ContactSection from "../../components/home/ContactSection";

const AboutUs = () => {
  const { data: aboutData, isLoading, isError } = useGetAboutQuery();

  if (isLoading) return <div></div>;
  if (isError) return <div></div>;

  return (
    <div className="w-full bg-gray-100 pt-8">
      <div className="text-center mb-8">
        <div className="sm:text-3xl text-2xl font-bold mb-5 text-secondary">
          About <span className="text-primary font-header capitalize">us</span>
        </div>
        <p className="text-sm md:text-lg text-secondary font-body leading-6 md:leading-7 max-w-[700px] mx-1 md:mx-auto text-start">
          Sii Media is a digital services company based in Dubai, United Arab
          Emirates, with a mission to provide top-notch digital services and
          creative solutions that align with the global trend towards digital
          transformation in the UAE and around the world. Given the critical
          role of digital services in today's world, where it is a key factor
          for success in various types of projects, from small home-based
          businesses to large global corporations like Google and Microsoft, we
          at Sii Media strive to empower and support individuals and businesses
          aspiring for success in the business world. We are committed to
          helping our clients and partners stay up-to-date with future
          aspirations and challenges.
        </p>
      </div>
      <div className="mb-4">
        <AboutItem
          ourVision={aboutData?.ourVision ?? ""}
          ourMission={aboutData?.ourMission ?? ""}
          ourValues={aboutData?.ourValues ?? ""}
          ourMission_ar={aboutData?.ourMission_ar ?? ""}
          ourValues_ar={aboutData?.ourValues_ar ?? ""}
          ourVision_ar={aboutData?.ourVision_ar ?? ""}
        />
      </div>
      <ContactSection />
    </div>
  );
};

export default AboutUs;
