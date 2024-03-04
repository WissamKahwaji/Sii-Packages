import { useGetCategoriesQuery } from "../../apis/packages/queries";
import { SampleInfo } from "../../apis/packages/type";
import ReactImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

const OurProjects = () => {
  const { data: categories, isLoading, isError } = useGetCategoriesQuery();
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  // Group samples by category
  const groupedSamples: { [key: string]: SampleInfo[] } = {};
  categories?.forEach(category => {
    category.samples.forEach(sample => {
      if (!groupedSamples[category.name_en]) {
        groupedSamples[category.name_en] = [];
      }
      groupedSamples[category.name_en].push(...sample.samples);
    });
  });

  return (
    <div className="w-full bg-gray-100 py-8">
      <div className="text-center mb-8">
        <div className="sm:text-3xl text-2xl font-bold mb-5 text-secondary">
          Our{" "}
          <span className="text-primary font-header capitalize">projects</span>
        </div>
        <p className="text-lg text-secondary font-body leading-7 max-w-[700px] mx-auto">
          Is to become a fully integrated, highly efficient company that adopts
          the latest digital solutions by providing innovative digital
          technologies and creative ideas that guarantee the success of your
          business activities and help you achieve your goals quickly and
          professionally, tailored to the nature of your project. We aim to give
          our clients an advantage over their competitors in the market.
        </p>
      </div>
      <div className="flex flex-col gap-8 py-6 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {Object.entries(groupedSamples).map(
          ([categoryName, samples], index) => (
            <div key={index}>
              <p className="font-header text-base md:text-2xl text-secondary font-semibold uppercase">
                {categoryName}
              </p>
              <div className="flex flex-col">
                {categoryName === "Websites & Online shops" ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 md:mt-8">
                    {samples.map((item: SampleInfo, idx: number) => (
                      <div
                        key={idx}
                        className="relative overflow-hidden rounded-md border border-primary hover:shadow-lg cursor-pointer"
                        onClick={() => {
                          if (item.link) {
                            window.open(item.link, "_blank");
                          }
                        }}
                      >
                        <img
                          src={item.img}
                          alt={categoryName}
                          className="w-full h-full object-cover transition-transform transform hover:scale-105"
                        />
                        {item.link && (
                          <div className="absolute inset-0 bg-black opacity-0 hover:opacity-60 transition-opacity duration-300 flex items-center justify-center">
                            <span className="text-white text-lg font-semibold">
                              Visit Website
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <>
                    <div className="">
                      {samples && (
                        <ReactImageGallery
                          items={samples.map((item: SampleInfo) => ({
                            original: item.img,
                            thumbnail: item.img,
                            description: categoryName,
                          }))}
                        />
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default OurProjects;
